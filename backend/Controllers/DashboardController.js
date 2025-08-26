// controllers/dashboardController.js
const db = require("../Models/db"); 
const { QueryTypes } = require("sequelize");
// ✅ API 1: Totals
exports.getTotals = async (req, res) => {
  try {
    const [[User]] = await db.sequelize.query("SELECT COUNT(*) as total FROM Users");
    const [[Employee]] = await db.sequelize.query("SELECT COUNT(*) as total FROM Employees");
    const [[Clients]] = await db.sequelize.query("SELECT COUNT(*) as total FROM Clients");

    res.json({
      admins: User.total,
      employees: Employee.total,
      clients: Clients.total,
    });
  } catch (err) {
    console.error("Error in getTotals:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ API 2: Finance (Income, Salary, Expense with date filter)
exports.getFinance = async (req, res) => {
  try {
    let { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "From and To dates are required" });
    }

    const [[Income]] = await db.sequelize.query(
      "SELECT COALESCE(SUM(ammount),0) as total FROM Incomes WHERE Creditdebit = 'Credit' and  createdAt BETWEEN ? AND ?",
      { replacements: [from, to] }
    );

    const [[Salery]] = await db.sequelize.query(
      "SELECT COALESCE(SUM(ammount),0) as total FROM Saleries WHERE createdAt BETWEEN ? AND ?",
      { replacements: [from, to] }
    );

    const [[Expance]] = await db.sequelize.query(
      "SELECT COALESCE(SUM(ammount),0) as total FROM Expances WHERE createdAt BETWEEN ? AND ?",
      { replacements: [from, to] }
    );

    res.json({
      income: Income.total,
      salary: Salery.total,  // ✅ fixed variable name
      expense: Expance.total,
    });
  } catch (err) {
    console.error("Error in getFinance:", err);
    res.status(500).json({ error: "Server Error" });
  }
};


exports.getClientsVsSales = async (req, res) => {
  try {
    const rows = await db.sequelize.query(
      `
      SELECT 
        c.name AS clientname,
        SUM(CASE WHEN i.Creditdebit = 'Debit' THEN i.ammount ELSE 0 END) AS totalDebit,
        SUM(CASE WHEN i.Creditdebit = 'Credit' THEN i.ammount ELSE 0 END) AS totalCredit,
        (SUM(CASE WHEN i.Creditdebit = 'Debit' THEN i.ammount ELSE 0 END) -
         SUM(CASE WHEN i.Creditdebit = 'Credit' THEN i.ammount ELSE 0 END)) AS netTotal
      FROM Incomes i
      JOIN Clients c ON i.clientId = c.id
      GROUP BY c.id, c.name
      `,
      { type: QueryTypes.SELECT }
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 2. Income Report (date filter optional)

exports.getIncomeReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = `
      SELECT DATE(createdAt) as date, SUM(ammount) as totalIncome
      FROM Incomes
      WHERE Creditdebit = 'Credit'
    `;
    let replacements = {};

    if (startDate && endDate) {
      query += ` AND createdAt BETWEEN :startDate AND :endDate`;
      replacements = { startDate, endDate };
    }

    query += ` GROUP BY DATE(createdAt) ORDER BY date ASC`;

    const rows = await db.sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeesVsSalary = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    }

    const rows = await db.sequelize.query(
      `SELECT e.name AS employeeName, SUM(s.ammount) AS totalSalary
       FROM Saleries s
       JOIN Employees e ON s.employeeId = e.id
       WHERE s.Creditdebit = 'Credit'
         AND s.createdAt BETWEEN :startDate AND :endDate
       GROUP BY e.id, e.name`,
      {
        type: QueryTypes.SELECT,
        replacements: { startDate, endDate },
      }
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseVsType = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    }

    const rows = await db.sequelize.query(
      `SELECT et.expancetype AS expenseType, SUM(e.ammount) AS totalExpense
       FROM Expances e
       JOIN Expancetypes et ON e.expanceid = et.id
       WHERE e.Creditdebit = 'Credit'
         AND e.createdAt BETWEEN :startDate AND :endDate
       GROUP BY et.id`,
      {
        type: QueryTypes.SELECT,
        replacements: { startDate, endDate },
      }
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getClientLedger = async (req, res) => {
  try {
    const { clientId, startDate, endDate } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    let whereClause = `c.id = :clientId`;
    let replacements = { clientId };

    if (startDate && endDate) {
      whereClause += ` AND i.createdAt BETWEEN :startDate AND :endDate`;
      replacements.startDate = startDate;
      replacements.endDate = endDate;
    }

    const rows = await db.sequelize.query(
      `SELECT i.id, c.name AS clientName, i.ammount, i.Creditdebit, i.description, i.createdAt
       FROM Incomes i
       JOIN Clients c ON i.clientId = c.id
       WHERE ${whereClause}
       ORDER BY i.createdAt ASC`,
      { type: QueryTypes.SELECT, replacements }
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getEmployeeLedger = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;

    if (!employeeId) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    let whereClause = `emp.id = :employeeId`;
    let replacements = { employeeId };

    if (startDate && endDate) {
      whereClause += ` AND s.createdAt BETWEEN :startDate AND :endDate`;
      replacements.startDate = startDate;
      replacements.endDate = endDate;
    }

    const rows = await db.sequelize.query(
      `SELECT s.id, emp.name AS employeeName, s.ammount, s.Creditdebit, s.description, s.createdAt
       FROM Saleries s
       JOIN Employees emp ON s.employeeId = emp.id
       WHERE ${whereClause}
       ORDER BY s.createdAt ASC`,
      { type: QueryTypes.SELECT, replacements }
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseLedger = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      // default current month
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    }

    const rows = await db.sequelize.query(
      `SELECT e.id, et.expancetype AS expenseType, e.ammount, e.Creditdebit, e.description, e.createdAt
       FROM Expances e
       JOIN Expancetypes et ON e.expanceid = et.id
       WHERE e.createdAt BETWEEN :startDate AND :endDate
       ORDER BY e.createdAt ASC`,
      { type: QueryTypes.SELECT, replacements: { startDate, endDate } }
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getYearlyReport = async (req, res) => {
  try {
    const { year } = req.query;
    const selectedYear = year || new Date().getFullYear();

    // Income
    const income = await db.sequelize.query(
      `SELECT MONTH(createdAt) as month, SUM(ammount) as totalIncome
       FROM Incomes
       WHERE Creditdebit='Credit' AND YEAR(createdAt)=:year
       GROUP BY MONTH(createdAt)`,
      { replacements: { year: selectedYear }, type: db.Sequelize.QueryTypes.SELECT }
    );

    // Salaries
    const salary = await db.sequelize.query(
      `SELECT MONTH(createdAt) as month, SUM(ammount) as totalSalary
       FROM Saleries
       WHERE Creditdebit='Credit' AND YEAR(createdAt)=:year
       GROUP BY MONTH(createdAt)`,
      { replacements: { year: selectedYear }, type: db.Sequelize.QueryTypes.SELECT }
    );

    // Expenses
    const expense = await db.sequelize.query(
      `SELECT MONTH(createdAt) as month, SUM(ammount) as totalExpense
       FROM Expances
       WHERE Creditdebit='Credit' AND YEAR(createdAt)=:year
       GROUP BY MONTH(createdAt)`,
      { replacements: { year: selectedYear }, type: db.Sequelize.QueryTypes.SELECT }
    );

    // Merge Data
    const report = [];
    for (let m = 1; m <= 12; m++) {
      const inc = income.find(i => i.month === m)?.totalIncome || 0;
      const sal = salary.find(s => s.month === m)?.totalSalary || 0;
      const exp = expense.find(e => e.month === m)?.totalExpense || 0;
      const pending = inc - (sal + exp);

      report.push({
        month: m,
        income: inc,
        salary: sal,
        expense: exp,
        pending: pending
      });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

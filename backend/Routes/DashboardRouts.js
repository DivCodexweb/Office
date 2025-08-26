const express = require('express');
const router = express.Router();
const { getTotals,getFinance,getClientsVsSales,getIncomeReport,getEmployeesVsSalary,getExpenseVsType,getClientLedger,getEmployeeLedger
    ,getExpenseLedger,getYearlyReport
} = require("../Controllers/DashboardController");


router.get('/totals', getTotals);
router.get('/finance', getFinance);
router.get('/getClientsVsSales', getClientsVsSales);
router.get('/getIncomeReport', getIncomeReport);
router.get('/getEmployeesVsSalary', getEmployeesVsSalary);
router.get('/getExpenseVsType', getExpenseVsType);

router.get('/getClientLedger', getClientLedger);
router.get('/getEmployeeLedger', getEmployeeLedger);
router.get('/getExpenseLedger', getExpenseLedger);
router.get("/yearly", getYearlyReport);


module.exports = router;

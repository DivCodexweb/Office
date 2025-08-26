import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  // Auto close sidebar when navigating
  React.useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column">
      {/* Top bar for mobile */}
      <div className="d-md-none bg-dark text-white p-2 d-flex align-items-center">
        <button
          className="btn btn-dark me-2"
          type="button"
          onClick={() => setShowSidebar(true)}
        >
          ☰
        </button>
        <h5 className="mb-0">Divcodex</h5>
      </div>

      <div className="d-flex">
        {/* Sidebar for desktop */}
        <div className="bg-dark text-white p-3 vh-100 d-none d-md-block" style={{ width: "200px" }}>
          <SidebarContent handleLogout={handleLogout} />
        </div>

        {/* Offcanvas sidebar for mobile */}
        <div className={`offcanvas offcanvas-start ${showSidebar ? "show" : ""}`} 
             tabIndex="-1" 
             style={{ visibility: showSidebar ? "visible" : "hidden" }}>
              
          <div className="offcanvas-header bg-dark text-white">
            <h5 className="offcanvas-title text-center">Divcodex</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => setShowSidebar(false)}
            ></button>
          </div>
          <div className="offcanvas-body bg-dark text-white p-0">
            <SidebarContent handleLogout={() => { handleLogout(); setShowSidebar(false); }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow-1 p-4 bg-light">{children}</div>
      </div>
    </div>
  );
};

const SidebarContent = ({ handleLogout }) => (
   
           
  <ul className="nav flex-column">
     <h5 className="text-center">Divcodex</h5>
    <li className="nav-item">
      <Link to="/" className="nav-link text-white">Dashboard</Link>
    </li>
    <li className="nav-item">
      <Link to="/Users" className="nav-link text-white">Users</Link>
    </li>
    <li className="nav-item">
      <Link to="/Employees" className="nav-link text-white">Employees</Link>
    </li>
    <li className="nav-item">
      <Link to="/Clients" className="nav-link text-white">Clients</Link>
    </li>
    <li className="nav-item">
      <Link to="/Income" className="nav-link text-white">Income</Link>
    </li>
    <li className="nav-item">
      <Link to="/Expances" className="nav-link text-white">Expances</Link>
    </li>
    <li className="nav-item">
      <Link to="/Salary" className="nav-link text-white">Salary</Link>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle text-white" href="#" id="reportsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Reports
      </a>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="reportsDropdown">
        <li><Link to="/IncomeReport" className="dropdown-item">IncomeReport</Link></li>
        <li><Link to="/FinanceReport" className="dropdown-item">FinanceReport</Link></li>
        <li><Link to="/ExpenseVsTypeReport" className="dropdown-item">ExpenseVsTypeReport</Link></li>
        <li><Link to="/EmployeesVsSalaryReport" className="dropdown-item">EmployeesVsSalaryReport</Link></li>
        <li><Link to="/ClientsVsSales" className="dropdown-item">ClientsVsSales</Link></li>
        <li><Link to="/ClientLedgerPage" className="dropdown-item">ClientLedgerPage</Link></li>
        <li><Link to="/EmployeeLedgerPage" className="dropdown-item">EmployeeLedgerPage</Link></li>
        <li><Link to="/ExpenseLedgerPage" className="dropdown-item">ExpenseLedgerPage</Link></li>
        <li><Link to="/YearlyReportPage" className="dropdown-item">YearlyReportPage</Link></li>
      </ul>
    </li>
    <li className="nav-item">
      <Link to="/settings" className="nav-link text-white">Settings</Link>
    </li>
    <li className="nav-item mt-3">
      <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
    </li>
  </ul>
);

export default Layout;

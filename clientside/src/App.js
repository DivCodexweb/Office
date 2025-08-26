import React, { useState,useEffect } from 'react';
import Refreshandler from "./Refreshandler.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Navigate,BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Adduser from "./pages/Adduser.jsx";
import CreateEmploye from "./pages/CreateEmploye.jsx";
import Expance from "./pages/Expance.jsx";
import Income from "./pages/Income.jsx";
import Clients from "./pages/CreateClients.jsx";
import Salary from "./pages/Salary.jsx";
import ClientsVsSales from "./pages/Reports/ClientsVsSalesReport.jsx";
import EmployeesVsSalaryReport from "./pages/Reports/EmployeesVsSalaryReport.jsx";
import ExpenseVsTypeReport from "./pages/Reports/ExpenseVsTypeReport.jsx";
import FinanceReport from "./pages/Reports/FinanceReport.jsx";
import IncomeReport from "./pages/Reports/IncomeReport.jsx";
import TotalsReport from "./pages/Reports/TotalsReport.jsx";

import ClientLedgerPage from "./pages/Reports/ClientLedgerPage.jsx";
import EmployeeLedgerPage from "./pages/Reports/EmployeeLedgerPage.jsx";
import ExpenseLedgerPage from "./pages/Reports/ExpenseLedgerPage.jsx";
import YearlyReportPage from "./pages/Reports/YearlyReportPage.jsx";

import Layout from "./pages/components/Layout";

import AOS from 'aos';
import 'aos/dist/aos.css';
const App = () => {
useEffect(() => {
  AOS.init();
}, []);
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  // Private route
  const PrivateRoute = ({ element }) => {
    return IsAuthenticated ? element : <Navigate to="/" />;
  };

  const token = sessionStorage.getItem("token");
return (
  <BrowserRouter>
    <Refreshandler
      setIsAuthenticated={setIsAuthenticated}
      setIsLoading={setIsLoading}
    />

    {isLoading ? (
      <div className="loading-screen text-center p-5">
        <h4>Loading...</h4>
      </div>
    ) : (
      <>
{!token ? (
   <Routes>
          <Route path="/" element={<Login />} />
           <Route path="*" element={<Login />} />
             </Routes>
      ) : (
        <Layout>
          <Routes>
           <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
           <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
            <Route path="/Users" element={<PrivateRoute element={<Adduser />} />} />
            <Route path="/Employees" element={<PrivateRoute element={<CreateEmploye />} />} />
            <Route path="/Income" element={<PrivateRoute element={<Income />} />} />
            <Route path="/Expances" element={<PrivateRoute element={<Expance />} />} />
              <Route path="/Clients" element={<PrivateRoute element={<Clients />} />} />
                    <Route path="/Salary" element={<PrivateRoute element={<Salary />} />} />
                     <Route path="/ClientsVsSales" element={<PrivateRoute element={<ClientsVsSales />} />} />
                      <Route path="/EmployeesVsSalaryReport" element={<PrivateRoute element={<EmployeesVsSalaryReport />} />} />
                       <Route path="/ExpenseVsTypeReport" element={<PrivateRoute element={<ExpenseVsTypeReport />} />} />
                        <Route path="/FinanceReport" element={<PrivateRoute element={<FinanceReport />} />} />
                         <Route path="/IncomeReport" element={<PrivateRoute element={<IncomeReport />} />} />
                          <Route path="/TotalsReport" element={<PrivateRoute element={<TotalsReport />} />} />

                            <Route path="/ClientLedgerPage" element={<PrivateRoute element={<ClientLedgerPage />} />} />
                         <Route path="/EmployeeLedgerPage" element={<PrivateRoute element={<EmployeeLedgerPage />} />} />
                          <Route path="/ExpenseLedgerPage" element={<PrivateRoute element={<ExpenseLedgerPage />} />} />
                            <Route path="/YearlyReportPage" element={<PrivateRoute element={<YearlyReportPage />} />} />
          <Route path="*" element={<Login />} />
          </Routes>
        </Layout>
      )}


      </>
    )}
  </BrowserRouter>
);

};

export default App;

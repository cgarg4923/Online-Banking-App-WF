import './App.css';
import OpenNewAccount from './components/OpenNewAccount';
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import CreateNewUser from './components/CreateNewUser';
import HomePage from './components/HomePage';
import Login from './components/Login';
import AccountStatement from './components/AccountStatement';
import Dashboard from './components/Dashboard';
import Withdraw from './components/Withdraw';
import FundTransferComponent from './components/FundTransfer';
import UserProfile from './components/UserProfile';
import NetBankingRegistration from './components/NetBanking';
import ChangeLoginPassword from './components/ChangeLoginPassword';
import ChangeTxnPassword from './components/ChnageTxnPassword';
import AccountSummary from './components/AccountSummary';
import AddBeneficiary from './components/AddBeneficiary';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from "./components/AdminDashboard";
import SearchCustomer from './components/SearchCustomer';
import SearchAccount from './components/searchAccount';
import AddUser from './components/AddUser';
import ChangeAdminPassword from './components/ChangeAdminPassword';
import Protected from './components/Protected';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <Protected Component={Login} />
    },
    {
      path: "/OpenNewAccount",
      element: <Protected Component={OpenNewAccount} />
    },
    {
      path:"/SignUp",
      element:<Protected Component={CreateNewUser}/>
    },
    {
      path:"/Dashboard",
      element:<Protected Component={Dashboard}/>
    },
    {
      path:"/Withdraw",
      element:<Protected Component={Withdraw}/>
    },
    {
      path:"/FundTransfer",
      element:<Protected Component={FundTransferComponent}/>
    },
    {
      path:"AccountStatement",
      element:<Protected Component={AccountStatement}/>
    },
    {
      path:"/profile",
      element:<Protected Component={UserProfile}/>
    },
    {
      path:"/NetBanking",
      element:<Protected Component={NetBankingRegistration}/>
    },
    {
      path:"/ChangeLoginPassword",
      element:<Protected Component={ChangeLoginPassword}/>
    },
    {
      path:"/ChangeTransactionPassword",
      element:<Protected Component={ChangeTxnPassword}/>
    },
    {
      path:"/AccountSummary",
      element:<Protected Component={AccountSummary}/>
    },
    {
      path:"/AddBeneficiary",
      element:<Protected Component={AddBeneficiary}/>
    },
    {
      path:"/AdminLogin",
      element:<Protected Component={AdminLogin}/>
    },
    {
      path:"/AdminDashboard",
      element:<Protected Component={AdminDashboard}/>
    },
    {
      path:"/SearchCustomer",
      element:<Protected Component={SearchCustomer}/>
    },
    {
      path:"/SearchAccount",
      element:<Protected Component={SearchAccount}/>
    },
    {
      path:"/AddUser",
      element:<Protected Component={AddUser}/>
    },
    {
      path:"/ChangeAdminPassword",
      element:<Protected Component={ChangeAdminPassword}/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

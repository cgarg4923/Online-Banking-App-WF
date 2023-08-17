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
import AccountStatementTest from './components/testfile';
import UserProfile from './components/UserProfile';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/OpenNewAccount",
      element: <OpenNewAccount />
    },
    {
      path:"/SignUp",
      element:<CreateNewUser/>
    },
    {
      path:"/Dashboard",
      element:<Dashboard/>
    },
    {
      path:"/Withdraw",
      element:<Withdraw/>
    },
    {
      path:"/FundTransfer",
      element:<FundTransferComponent/>
    },
    {
      path:"AccountStatement",
      element:<AccountStatement/>
    },
    {
      path:"/Acctest",
      element:<AccountStatementTest/>
    },
    {
      path:"/profile",
      element:<UserProfile/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

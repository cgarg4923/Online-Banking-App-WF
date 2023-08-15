import logo from './logo.svg';
import './App.css';
import OpenNewAccount from './components/OpenNewAccount';
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import CreateNewUser from './components/CreateNewUser';
import HomePage from './components/HomePage';
import Login from './components/Login';

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
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

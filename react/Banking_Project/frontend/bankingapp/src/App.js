import logo from './logo.svg';
import './App.css';
import OpenNewAccount from './components/OpenNewAccount';
import LoginForm from './components/loginForm';
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import CreateNewUser from './components/CreateNewUser';

function App() {
  const router = createBrowserRouter([
    {
      path: "/OpenNewAccount",
      element: <OpenNewAccount />
    },
    {
      path: "/",
      element: <CreateNewUser />
    },
    {
      path: "/login",
      element: <LoginForm />
    }
    
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

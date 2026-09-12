import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import Login from "./auth/Login"
import MainLayout from "./MainLayout"
import Signup from "./auth/Signup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App

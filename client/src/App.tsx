import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import './App.css'
import Login from "./auth/Login"
import MainLayout from "./MainLayout"
import Signup from "./auth/Signup"

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

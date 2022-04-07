import React from "react"
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom"
import Overview from "./views/Overview"

const routes = [
  {
    path: "/overview",
    element: <Overview />,
  },
]

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/overview" />} />
        {routes.map(({ path, element }) => (
          <Route path={path} element={element} key={path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router

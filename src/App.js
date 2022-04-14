import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Overview from "./views/overview/Overview"
import "./App.scss"
import IndexLayout from "./layouts"
import ItemMaster from "./views/itemMaster"

const routes = [
  {
    path: "/overview",
    element: <Overview />,
  },
  {
    path: "/items",
    element: <ItemMaster />,
  },
]

const Router = () => {
  return (
    <BrowserRouter>
      <IndexLayout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/overview" />} />
          {routes.map(({ path, element }) => (
            <Route path={path} element={element} key={path} />
          ))}
        </Routes>
      </IndexLayout>
    </BrowserRouter>
  )
}

export default Router

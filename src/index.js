import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import * as serviceWorker from "./serviceWorker"
import store from "./redux/store"
import "./index.scss"
import "antd/dist/antd.min.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

serviceWorker.unregister()

export { store }

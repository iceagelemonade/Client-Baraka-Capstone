import React from 'react'
import ReactDOM from 'react-dom'
// import * as ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)


// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )
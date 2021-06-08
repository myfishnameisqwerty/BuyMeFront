import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import FrontPage from './components/front page/FrontPage'
import './app.css'
import AddTask from './components/add event/AddTask'
import ShowTask from './components/show task/ShowTask'
export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={FrontPage}/>
      <Route path="/newTask" component={AddTask}/>
      <Route path="/task/:id" component={ShowTask}/>
    </BrowserRouter>
  )
}


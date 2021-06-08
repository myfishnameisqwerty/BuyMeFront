import React, {useState, useEffect} from 'react'
import './FrontPage.css'
import { NavLink, useHistory } from "react-router-dom";
import { deleteTask, fetchData, updateTask} from '../../services/service';
export default function FrontPage() {
    const history = useHistory();
    const [tasks, setTasks] = useState(null)
    const getColor = (order) => {
        return order%2?"oddColor":"evenColor"
    }
    const getTaskBackgroundColor = (done) => done?'taskDoneBackground':'taskUnDoneBackground'
    const getTaskTextColor = (done) => done?'taskDoneText':'taskUnDoneText'
    useEffect(() => {
        
        fetchData().then(data => setTasks(data))
        
      }, [])
    const getOpenTasksNumber = () => tasks.filter(task => !task.done).length
    const onDeleteTask = (i, id) => {
        let updatedTasks = [...tasks]
        updatedTasks.splice(i, 1)
        deleteTask(id).then(()=> setTasks(updatedTasks))
    }
    const onUpdateStatus = (i, id) => {
        updateTask(id, {'done':Math.abs(tasks[i].done - 1) })
        .then(() => {
            let updatedTasks = [...tasks]
            updatedTasks[i].done = Math.abs(tasks[i].done - 1)
            setTasks(updatedTasks)
        })
    }

    return ( 
        tasks && <>
        <div className='header shadow'>
            <div className="container">
            <span className="title">משימות</span>
            <button id="addButton" onClick={()=>{
                history.push("/newTask")
            }}>
                <div id="addButtonDiv">+</div>
            </button>
            </div>
        </div>
        <div className='tasksList'>
            
            {tasks &&
            
            tasks.map((task, i) => {
                return (
                  <div key={i} className={`box ${getColor(i)}`}>
                    <div className="container">
                      <div className="inRow">
                        <div className={`customCheckbox ${getTaskBackgroundColor(task.done)}`} onClick={()=> {
                            onUpdateStatus(i, task.id)
                            }}/>
                        <NavLink className={getTaskTextColor(task.done)} to={`/task/${task.id}`}>
                          {i + 1}. משימה {task.name}
                        </NavLink>
                      </div>
                      <button className="deleteTask" onClick={()=>{
                          onDeleteTask(i, task.id)
                          }}>x</button>
                    </div>
                  </div>
                );
            })}
        </div>
        <div className='footer'>
            <span>לסיום: {getOpenTasksNumber()}</span>
            <span>הושלמו: {tasks.length-getOpenTasksNumber()}</span>
            <span>סה"כ: {tasks.length}</span>
        </div>
        </>
        
    )
}

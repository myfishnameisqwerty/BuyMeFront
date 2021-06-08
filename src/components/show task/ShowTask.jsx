import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getTask, updateTask, deleteTask } from "../../services/service";

export default function ShowTask(props) {
  const history = useHistory();
  const { register, handleSubmit} = useForm();
  const [task, setTask] = useState(null);
  const onSubmit = (data) => {
    updateTask(props.match.params.id, data).then(() => history.push("/"));
  };
  useEffect(() => {
    getTask(props.match.params.id).then((data) => {
      setTask(data[0]);
    });
  }, []);
  const chengeLocalStatus = () => {
    let updatedTask = { ...task };
    updatedTask.done = Math.abs(updatedTask.done - 1);
    setTask(updatedTask);
  };
  const onDeleteTask = () => {
      deleteTask(task.id).then(()=>history.push("/"))
  }
  return (
    <>
      <div className="header shadow">
        <div className="container">
          <span className="title">פרטי משימה</span>
          <button
            id="addButton"
            onClick={() => {
              history.push("/");
            }}
          >
            חזרה
          </button>
        </div>
      </div>
      {task && (
        <div className="container50">
          {task && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register("name")}
                defaultValue={task.name}
                required
              />

              <textarea
                {...register("description")}
                cols="30"
                rows="10"
                defaultValue={task.description}
                required
              ></textarea>
              <div>
                <input
                  type="checkbox"
                  {...register("done")}
                  checked={task.done}
                  onClick={chengeLocalStatus}
                />
                <label htmlFor="done">בוצע</label>
              </div>
              <div>
                <input type="submit" value="שמור שינויים" />
                <input type="button" value="מחק משימה" onClick={onDeleteTask}/>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}

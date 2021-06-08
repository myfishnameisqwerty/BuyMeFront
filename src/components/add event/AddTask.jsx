import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./addTask.css";
import { saveTask } from "../../services/service";
export default function AddTask() {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    saveTask(data).then(()=> reset())
    
  };
  return (
    <>
      <div className="header shadow">
        <div className="container">
          <span className="title">הוסף משימה חדשה</span>
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
      <div className="container50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("name")} placeholder="שם המשימה" required/>
          <textarea
            {...register("description")}
            cols="30"
            rows="10"
            placeholder="תוכן המשימה"
            required
          ></textarea>
          
          <div>
                <input type="submit"  value="הוסף משימה חדשה" />
                <input type="reset" value="נקה כל השדות" />
              </div>
        </form>
      </div>
    </>
  );
}

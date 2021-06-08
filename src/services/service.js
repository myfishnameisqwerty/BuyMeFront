import axios from "axios";
export const saveTask = (data) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_API}/tasks/`, data)
    .then((response) => response.data);
};
export const deleteTask = (id) => {
  return axios
    .delete(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`)
    .then((response) => response.data);
};
export const updateTask = (id, data) => {
  return axios
    .put(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`, data)
    .then((response) => response.data);
};

export const fetchData = () => {
  return axios
    .get(`${process.env.REACT_APP_SERVER_API}/tasks`)
    .then((response) => response.data);
};
export const getTask = (id) => {
  return axios
    .get(`${process.env.REACT_APP_SERVER_API}/tasks/${id}`)
    .then((response) => response.data);
};
export const Status = Object.freeze({ notDone: 0, done: 1 });

import React, { useState, useEffect } from "react";
import Axios from "axios";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);

  const getTasks = () => {
    Axios.get("http://localhost:8000/tasks/")
      .then((res) => {
        console.log("Data getting from api", res.data);
        setTodos(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const postData = () => {
    Axios.post("http://localhost:8000/tasks/", {
      title,
      description: desc,
    })
      .then((res) => {
        getTasks();
        setTitle("");
        setDesc("");
        console.log("data posted successfully", res);
      })
      .catch((err) => console.log(err));
  };

  const updateData = () => {
    // e.preventDefault();
    Axios.put(`http://localhost:8000/tasks/${edit}`, {
      title,
      description: desc,
    })
      .then((res) => {
        getTasks();
        setTitle("");
        setDesc("");
        setEdit(null);
        console.log("data updated successfully", res);
      })
      .catch((err) => {
        console.log(err);
        setEdit(null);
      });
  };

  const deleteData = (Id) => {
    Axios.delete(`http://localhost:8000/tasks/${Id}`)
      .then((res) => {
        getTasks();
        console.log("data deleted successfully", res);
      })
      .catch((err) => console.log(err));
  };

  const Arr = () =>
    todos.map((i, index) => {
      return (
        <tr key={index}>
          <td>{i.Id}</td>
          <td>{i.title} </td>
          <td>{i.description} </td>
          <td>
            <button
              onClick={() => {
                setEdit(i.Id);
                setTitle(i.title);
                setDesc(i.description);
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button onClick={() => deleteData(i.Id)}>Delete</button>
          </td>
        </tr>
      );
    });
  return (
    <div align="center">
      <h3>Add Task</h3>
      <div>
        <input
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type={"text"}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          onClick={() => {
            edit ? updateData() : postData();
          }}
        >
          {edit ? "Update" : "Add"}
        </button>
      </div>
      <h3>Tasks</h3>

      <div align="center">
        <table>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
          <Arr />
        </table>
      </div>
    </div>
  );
};

export default Todo;

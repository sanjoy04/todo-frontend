import { React, useState, useEffect } from "react";
import styles from "./Todo.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const API_BASE = "https://todo-backend-woad.vercel.app/";
const Index = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(API_BASE + "/user/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        });
        const data = await response.json();
        if (data.status === "error") return navigate("/login");
        GetTodos();
      } catch (err) {
        // console.log(err);
        alert("Error logging in user");
      }
    };

    const findUser = async () => {
      const response = await fetch(API_BASE + "/user/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      setName(data?.name);
    };

    checkUser();
    findUser();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos", {
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === 400) {
          setTodos([]);
        }
        setTodos(data);
      })
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    try {
      const request = await fetch(API_BASE + "/todo/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
        credentials: "include",
      });
      const data = await request.json();
      if (data.status === 400) return alert(data.message);
      setTodos([...todos, data]);
      setPopupActive(false);
      setNewTodo("");
    } catch (err) {
      console.log(err);
    }
  };

  const userLogout = async () => {
    try {
      const response = await fetch(API_BASE + "/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      if (data.status === "error") return alert(data.message);
      navigate("/login");
    } catch (err) {
      // console.log(err);
      alert("Error logging out user");
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.flex_container}>
        <h1>Welcome , {name}</h1>
        <div className={styles.logout} onClick={userLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
        </div>
      </div>
      <h4>Your tasks</h4>
      <div className={styles.todos}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={`${styles.todo} ${
                todo.complete ? styles.is_complete : ""
              }`}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className={styles.checkbox}></div>

              <div className={styles.text}>{todo.text}</div>

              <div
                className={styles.delete_todo}
                onClick={() => deleteTodo(todo._id)}
              >
                X
              </div>
            </div>
          ))
        ) : (
          <div className={styles.todo}>No todos</div>
        )}
      </div>

      <div className={styles.addPopup} onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className={styles.popup}>
          <div
            className={styles.closePopup}
            onClick={() => setPopupActive(false)}
          >
            X
          </div>
          <div className={styles.content}>
            <h3>Add Task</h3>
            <input
              type="text"
              className={styles.add_todo_input}
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className={styles.button} onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Index;

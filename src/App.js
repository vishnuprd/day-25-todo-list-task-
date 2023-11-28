import { useState } from "react";
import "./App.css";

// This is the App Component
function App() {
  // All required details are intialized here
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const [filter, setFiler] = useState("all");
  const [id, setID] = useState(0);

  // Here, all the variables are defined when the todo name and description are edited.
  const [editID, setEditID] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // The todo name and Description is saved here with id and status
  const addTodo = () => {
    const newTodo = {
      number: id,
      name,
      description,
      status: "not-completed",
    };
    setTodo([...todo, newTodo]);
    setID(id + 1);
  };

  // It is used to filter the list of todo is completed or not completed
  let filteredTodo = todo;
  if (filter === "completed") {
    filteredTodo = todo.filter((todo) => todo.status === "completed");
  } else if (filter === "not-completed") {
    filteredTodo = todo.filter((todo) => todo.status === "not-completed");
  }

  // Here, The particular todo is deleted when the delete button is clicked
  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((todo) => todo.number !== id);
    setTodo(updatedTodo);
    console.log(updatedTodo);
  };

  // Here, The todo is updated is status whether is completed or not
  const updateTodoStatus = (id, newStatus) => {
    const updatedTodo = todo.map((todo) =>
      todo.number === id ? { ...todo, status: newStatus } : todo
    );
    setTodo(updatedTodo);
    console.log(updatedTodo);
  };

  // This is to set the edited name and description
  const editTodo = (id, name, description) => {
    setEditID(id);
    setEditName(name);
    setEditDescription(description);
  };

  // This is used to save the edited name and description of the todo
  const saveEditedTodo = () => {
    const updatedTodo = todo.map((todo) =>
      todo.number === editID
        ? { ...todo, name: editName, description: editDescription }
        : todo
    );
    setTodo(updatedTodo);
    setEditID(null);
    setEditName("");
    setEditDescription("");
  };

  return (
    <div className="App">
      <h1 className="text-center text-success mt-5 fs-1">My Todo</h1>
      {/* This portion is to get the todo name and description from the user and add it */}
      <div className="container input-container mt-5">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Task Name"
        />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Task Description"
        />
        <button
          className="btn btn-success add-todo-button"
          onClick={() => addTodo()}
        >
          Add Todo
        </button>
      </div>
      {/* This portion is to filter the todos added */}
      {/* By selecting all it shows all the todo */}
      {/* By selecting completed it only shows the completed todos */}
      {/* By selecting not completed it only shows the not completed todos */}
      <div className="filter-container mt-5">
        <h1 className="fs-1">My Todos</h1>
        <div className="status-filter">
          <label>Status Filter : &nbsp;</label>
          <select
            className="selection bg-danger text-white border-danger rounded p-1"
            value={filter}
            onChange={(e) => setFiler(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not-Completed</option>
          </select>
        </div>
      </div>
      {/* This portion is to display the added todos with filter */}
      <section className="py-5 w-100">
        <div className="container px-3 px-lg-3 mt-0">
          <div className="row gx-3 gx-lg-4 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-start">
            {filteredTodo.map((task) => {
              return (
                <div className="d-flex justify-content-center">
                  {/* This portion checks whether particular todo is clicked for edit */}
                  {editID === task.number ? (
                    // Whether edit is clicked the particular todo card is changed as to change name and description
                    <div className="d-flex flex-column gap-3 w-75 align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                      <button
                        className="btn btn-primary w-50"
                        onClick={saveEditedTodo}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    // Whether the edit button is not clicked this portion displays
                    <div className="col mb-5">
                      <div key={task.number} className="card p-3">
                        <p>
                          <span>Name : &nbsp;</span>
                          {task.name}
                        </p>
                        <p>
                          <span>Description : &nbsp;</span>
                          {task.description}
                        </p>
                        <div className="status-filter-dropdown d-flex flex-row align-items-center gap-1 card-status-filter">
                          <label>Status : &nbsp;</label>
                          <select
                            className="bg-danger text-white border-danger p-1 selection"
                            value={task.status}
                            onChange={(e) =>
                              updateTodoStatus(task.number, e.target.value)
                            }
                          >
                            <option value="not-completed">Not Completed</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <div className="card-footer pb-0 d-flex justify-content-end gap-4 bg-transparent border-top-0">
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              editTodo(task.number, task.name, task.description)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteTodo(task.number)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
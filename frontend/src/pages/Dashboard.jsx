import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);

    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTasks(res.data.tasks);
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/tasks",
                {
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTitle("");
            setDescription("");

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const editTask = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditId(task._id);
    };

    const updateTask = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/tasks/${editId}`,
                {
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTitle("");
            setDescription("");
            setEditId(null);

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleStatus = async (task) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/tasks/${task._id}`,
                {
                    title: task.title,
                    description: task.description,
                    status:
                        task.status === "completed"
                            ? "pending"
                            : "completed",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        navigate("/login");
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <Navbar
                title="My Tasks"
                onLogout={handleLogout}
            />

            <div>

                <div className={styles.container}>
                    <h1>My Tasks</h1>

                    <div className={styles.form}>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Task Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        {editId ? (
                            <button onClick={updateTask}>
                                Update Task
                            </button>
                        ) : (
                            <button onClick={createTask}>
                                Create Task
                            </button>
                        )}
                    </div>

                    <div className={styles.tasks}>
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className={styles.card}
                            >
                                <h3>{task.title}</h3>

                                <p>{task.description}</p>

                                <div className={styles.actions}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => editTask(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className={styles.statusBtn}
                                        onClick={() => toggleStatus(task)}
                                    >
                                        {task.status === "completed"
                                            ? "Pending"
                                            : "Complete"}
                                    </button>

                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() =>
                                            deleteTask(task._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </div>
        </>
    );
};
export default Dashboard;
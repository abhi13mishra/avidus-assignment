import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [logs, setLogs] = useState([]);

    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem("token");

            const usersRes = await api.get(
                "/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const tasksRes = await api.get(
                "/admin/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const logsRes = await api.get(
                "/admin/logs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsers(usersRes.data.users);
            setTasks(tasksRes.data.tasks);
            setLogs(logsRes.data.logs);

        } catch (error) {
            console.log(error);
        }
    };

    const updateUserStatus = async (user) => {
        try {
            const token = localStorage.getItem("token");

            await api.patch(
                `/admin/users/${user._id}/status`,
                {
                    status:
                        user.status === "active"
                            ? "inactive"
                            : "active",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchAdminData();

        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(
                `/admin/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchAdminData();

        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(
                `/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchAdminData();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    return (
        <div className={styles.container}>
            <h1>Admin Dashboard</h1>

            <div className={styles.stats}>
                <div className={styles.card}>
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>

                <div className={styles.card}>
                    <h3>Total Tasks</h3>
                    <p>{tasks.length}</p>
                </div>

                <div className={styles.card}>
                    <h3>Completed Tasks</h3>
                    <p>{completedTasks}</p>
                </div>

                <div className={styles.card}>
                    <h3>Pending Tasks</h3>
                    <p>{pendingTasks}</p>
                </div>
            </div>

            <div className={styles.sections}>
                <div className={styles.sectionCard}>
                    <h2>User Management</h2>

                    <div className={styles.userList}>
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className={styles.userCard}
                            >
                                <div>
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                    <p>{user.status}</p>
                                </div>

                                <div className={styles.userActions}>
                                    <button
                                        onClick={() =>
                                            updateUserStatus(user)
                                        }
                                    >
                                        {user.status === "active"
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteUser(user._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sectionCard}>
                    <h2>Task Monitoring</h2>

                    <div className={styles.taskList}>
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className={styles.taskCard}
                            >
                                <h4>{task.title}</h4>

                                <p>{task.description}</p>

                                <p className={styles.status}>
                                    Status: {task.status}
                                </p>

                                <button
                                    className={styles.deleteTaskBtn}
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete Task
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sectionCard}>
                    <h2>Activity Logs</h2>

                    <div className={styles.logsList}>
                        {logs.map((log) => (
                            <div
                                key={log._id}
                                className={styles.logCard}
                            >
                                <h4>{log.action}</h4>

                                <p>
                                    User: {log.user?.name}
                                </p>

                                <p>
                                    {new Date(
                                        log.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
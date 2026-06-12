import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Login.module.css";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "role",
                res.data.role
            );

            localStorage.setItem(
                "userId",
                res.data.userId
            );

            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Welcome Back</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className={styles.spinner}></span>
                                <span>Login</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p>
                    Don't have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
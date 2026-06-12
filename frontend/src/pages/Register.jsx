import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Register.module.css";

const Register = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

            await api.post("/auth/register", formData);

            alert("Registration Successful");

            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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

                    <button type="submit">
                        Register
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
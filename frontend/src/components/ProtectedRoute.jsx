import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role && role !== userRole) {
        return (
            <Navigate
                to={
                    userRole === "admin"
                        ? "/admin"
                        : "/dashboard"
                }
            />
        );
    }

    return children;
};

export default ProtectedRoute;
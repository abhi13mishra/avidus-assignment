import styles from "./Navbar.module.css";

const Navbar = ({
    title,
    onLogout,
    openSidebar,
}) => {
    return (
        <nav className={styles.navbar}>
            <button
                className={styles.menuBtn}
                onClick={openSidebar}
            >
                ☰
            </button>

            <h2>{title}</h2>

            <button
                className={styles.logoutBtn}
                onClick={onLogout}
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
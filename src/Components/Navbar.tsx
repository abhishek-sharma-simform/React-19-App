import { NavLink } from "react-router";
import { useTaskStore, selectIncompleteTotalCount } from "../store/taskStore";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const incompleteCount = useTaskStore(selectIncompleteTotalCount);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            About
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Contact
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/developer"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Developer
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Tasks
            {incompleteCount > 0 && (
              <span className={styles.badge}>{incompleteCount}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

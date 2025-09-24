import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todo-board"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

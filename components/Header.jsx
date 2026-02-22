import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <nav className="navbar-nav">
            <ul>
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/"}>
                        Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to={"/addTask"}>
                        Add Task
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
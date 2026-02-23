import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <nav className="navbar-nav">
            <ul className="list-unstyled d-flex justify-content-center gap-3 py-1 m-0">
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
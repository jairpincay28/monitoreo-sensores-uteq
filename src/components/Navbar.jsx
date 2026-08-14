import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <strong>UTEQ Sensor Monitor</strong>
      <div>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/ubicaciones">Ubicaciones</NavLink>
      </div>
    </nav>
  );
}

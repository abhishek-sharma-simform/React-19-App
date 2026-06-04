import { Link } from "react-router";

const Navbar = () => {
  return (
    <div>
      <ul style={{ display: "flex", gap: "20px", listStyleType: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/developer">Developer </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

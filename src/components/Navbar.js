import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", null);
  };

  return (
    <nav className="navbar bg-dark navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <div className="d-flex">
          {user ? (
            <>
              <div className="navbar-text">{`Welcome ${user.name}!`}</div>
              <button onClick={logout} className="btn btn-primary ms-3">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    fetch("https://tv-shows-app.rsbkme.workers.dev/login", {
      // fetch("http://127.0.0.1:8787/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      })
      .then(() => navigate("/"));
  };

  useEffect(() => {
    // fetch("https://tv-shows-app.rsbkme.workers.dev/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  return (
    <form
      className="container-fluid"
      onSubmit={(e) => login(e)}
      style={{ maxWidth: 500, marginTop: 150 }}
    >
      <div className="card p-4 rounded">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

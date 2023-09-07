import React from "react";
import { useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Header from "./partials/Header.jsx";
function Login() {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await login(form);
    // console.log("form", result);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        console.log(toast(result.data.register));
        toast(result.data.register);
        return;
      }
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4">
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                />
                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                <small id="emailHelp" className="form-text text-danger">
                  *username should be alphanumeric and in between 6 to 32 characters only
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                />
                <small id="emailHelp" className="form-text text-danger">
                  *password should be between 6 to 100 characters only
                </small>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{
                  display: "block",
                  margin: "10px auto ", // Center horizontally
                  borderRadius: "5px", // Rounded corners
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

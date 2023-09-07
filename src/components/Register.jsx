// Register.jsx
import React, { useEffect, useState } from "react";
import { register } from "../services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.jsx";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await register(form);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("Something went wrong, please try again");
    }
  };

  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          maxHeight: "80vh", // Limit the height to 80% of the viewport height
          overflowY: "auto", // Enable vertical scrolling when needed
        }}
      >
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4">
            <div className="card-body">
              <h4 className="card-title">Register</h4>

              {/* ... Other form elements ... */}
              

<div className="form-group">
<label htmlFor="exampleInputEmail1" className="form-label mt-4">
  Name
</label>
<input
  type="text"
  name="name"
  onChange={handleInputChange}
  className="form-control"
  id="exampleInputEmail1"
  aria-describedby="emailHelp"
  placeholder="Enter name"
/>

<small id="emailHelp" className="form-text text-danger">
  *name should be between 6 to 32 letters only
</small>
</div>

<div className="form-group">
<label htmlFor="exampleInputEmail1" className="form-label mt-4">
  Username
</label>
<input
  type="text"
  name="username"
  onChange={handleInputChange}
  className="form-control"
  id="exampleInputEmail1"
  aria-describedby="emailHelp"
  placeholder="Enter username"
/>
<small id="emailHelp" className="form-text text-danger">
  *username should be alphanumeric and in between 6 to 32 characters only
</small>
</div>

<div className="form-group">
<label htmlFor="exampleInputEmail1" className="form-label mt-4">
  Email
</label>
<input
  type="tezt"
  name="email"
  onChange={handleInputChange}
  className="form-control"
  id="exampleInputEmail1"
  aria-describedby="emailHelp"
  placeholder="Enter email"
/>
<small id="emailHelp" className="form-text text-danger">
  *email should be in proper format
</small>
</div>

<div className="form-group">
<label htmlFor="exampleInputEmail1" className="form-label mt-4">
  Password
</label>
<input
  type="text"
  name="password"
  onChange={handleInputChange}
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
                  margin: "10px auto", // Center horizontally
                  borderRadius: "5px", // Rounded corners
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;



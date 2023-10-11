import { useEffect, useState } from "react";
import "../css/Login.css"
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (validation()) {
        let data = JSON.parse(localStorage.getItem("user"));
        let findCredentialInLocalStorage = data.find(
          (user) => user.email === form.email && user.password === form.password
        );
  
        if (findCredentialInLocalStorage) {
          alert("Successfull login!");
          navigate("/home");
        } else {
          alert("Incorrect credential!");
        }
      }
  };

  const validation = () => {
    const errors = {};
    if (form.email === "") {
      errors.email = "Email is Required!";
    } else if (form.password === "") {
      errors.password = "Password is Required!";
    }
    setErrorMessage(errors);
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleBack = () => {
    navigate("/register");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setForm(data);
    }
  }, []);

  return (
    <>
    <div className="container">
      <form className="formData">
      <h1>Login</h1>
        <label>Email:</label>
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        <br />
        <br />
        {errorMessage.email && <p>{errorMessage.email}</p>}

        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          name="password"
          onChange={handleChange}
        />
        <br />
        <br />
        {errorMessage.password && <p>{errorMessage.password}</p>}

        <button className='btn' onClick={handleClick}>Login</button>
        <button className='btn' onClick={handleBack}>New User</button>
      </form>
    </div>
    </>
  );
}



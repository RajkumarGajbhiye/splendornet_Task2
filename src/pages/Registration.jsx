import { useEffect, useState } from "react";
import "../css/Registration.css"
import { useNavigate } from "react-router-dom";
export default function Registration() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmePassword: ""
  });
  const [userArray, setUserArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (validation()) {
      const userAdded = { ...form };
      const newUser = [...userArray, userAdded];
      setUserArray(newUser);
localStorage.setItem("user", JSON.stringify(newUser));
alert("Successful Register!")
setForm({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmePassword: ""
})
      navigate("/");
    }
  };

  const validation = () => {
    const errors = {};
    const hasSpecialCharacter = /[@#$%^&*"(){}]/.test(form.password);
    const hasAlfaNumericCharacter =
      /[A-Za-z]/.test(form.password) && /\d/.test(form.password);
    if (form.firstName === "") {
      errors.firstName = "First Name is Required!";
    } else if (form.lastName === "") {
      errors.lastName = "Last Name is Required!";
    } else if (form.email === "") {
      errors.email = "Email is Required!";
    } else if (form.mobile === "") {
      errors.mobile = "Mobile No. is Required!";
    } else if (form.password === "") {
      errors.password = "Password is Required!";
    } else if (form.password.length < 8) {
      errors.password = "Password must have minimum 8 character!";
    } else if (!hasSpecialCharacter) {
      errors.password = "Password must have one special character!";
    } else if (!hasAlfaNumericCharacter) {
      errors.password = "Password must have one alpha Numeric character!";
    } else if (form.confirmePassword === "") {
      errors.confirmePassword = "Confirm Password is Required!";
    } else if (form.password !== form.confirmePassword) {
      errors.confirmePassword = "Password is not match!";
    }
    setErrorMessage(errors);
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUserArray(data);
    }
  }, []);

  return (
    <>
    <div className="container">
      <form className="formData">
      <h1>Registration</h1>
        <label>First Name: </label>
        <br />
        <input
          type="text"
          placeholder="Enter First Name"
          value={form.firstName}
          name="firstName"
          onChange={handleChange}
        /> <br />
        
       
        {errorMessage.firstName && <p style={{color:"red",fontWeight:"bold"}}>{errorMessage.firstName}</p>}

        <label>Last Name:</label>
        <br />
        <input
          type="text"
          placeholder="Enter Last Name"
          value={form.lastName}
          name="lastName"
          onChange={handleChange}
        /> <br />
       
        {errorMessage.lastName && <p style={{color:"red",fontWeight:"bold"}}>{errorMessage.lastName}</p>}
        <label>Email:</label>
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        
        {errorMessage.email && <p style={{color:"red",fontWeight:"bold"}}>{errorMessage.email}</p>}

        <label>Mobile:</label>
        <br />
        <input
          type="number"
          placeholder="Enter Mobile No.."
          value={form.mobile}
          name="mobile"
          onChange={handleChange}
        />
       
        {errorMessage.mobile && <p style={{color:"red",fontWeight:"bold"}}>{errorMessage.mobile}</p>}

        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          name="password"
          onChange={handleChange}
        />
       
        {errorMessage.password && <p style={{color:"red",fontWeight:"bold"}}>{errorMessage.password}</p>}

        <label>Confirm Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter Confoirm Password"
          value={form.confirmePassword}
          name="confirmePassword"
          onChange={handleChange}
        />
        <br />
        <br />
        {errorMessage.confirmePassword && (
          <p style={{color:"red",fontWeight:"bold"}}>{errorMessage.confirmePassword}</p>
        )}
        <button className='btn' onClick={handleClick}>Save</button>
      </form>
    </div>
    </>
  );
}


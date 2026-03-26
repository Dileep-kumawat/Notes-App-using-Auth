import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length > 0 && formData.password.length > 0) {
      const res = await handleRegister(formData);

      if (res.success) navigate("/");
    } else {
      alert("please fill the form completely");
    }
  }

  return (
    <div>
      I am register page
      <form onSubmit={handleSubmit}>
        <input
          value={formData.username}
          onChange={(e) => {
            setFormData(prev => {
              return {
                ...prev,
                username: e.target.value
              }
            })
          }}
          type="text" placeholder="Enter username..." />
        <input
          value={formData.email}
          onChange={(e) => {
            setFormData(prev => {
              return {
                ...prev,
                email: e.target.value
              }
            })
          }}
          type="email" placeholder="Enter email..." />
        <input
          value={formData.password}
          onChange={(e) => {
            setFormData(prev => {
              return {
                ...prev,
                password: e.target.value
              }
            })
          }}
          type="password" placeholder="Enter password..." />
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register

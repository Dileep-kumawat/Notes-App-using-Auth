import { useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length > 0 && formData.password.length > 0) {
      const res = await handleLogin(formData);

      if(res.success) navigate("/");
    } else {
      alert("please fill the form completely");
    }
  }

  return (
    <div>
      I am Login page
      <form onSubmit={handleSubmit}>
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
          <button>Login</button>
      </form>
    </div>
  )
}

export default Login

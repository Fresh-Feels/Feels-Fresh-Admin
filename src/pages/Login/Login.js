import React, { useState, useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import { adminLogin } from "../../store/Methods/authMethods";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { success, errors, loading, msg } = useSelector(
    (state) => state.AdminLoginReducer
  );
  const dispatch = useDispatch();

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success(msg);
      setEmail("");
      setPassword("");
    }
  }, [success, msg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!loading && (
        <button className="btn_app" type="submit">
          Login
        </button>
      )}
      {loading && (
        <button className="btn_app" disabled>
          Loading...
        </button>
      )}
    </form>
  );
}

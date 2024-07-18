"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email address is invalid");
      return false;
    }

    if (!password.trim()) {
      setError("Password is required");
      return false;
    }

    setError(""); // Clear error message if all validations pass
    return true;
  };

  async function submit(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://api.realworld.io/api/users/login",
          {
            user: {
              email: email,
              password: password,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("username", response.data.user.username);
        router.push("/");
      } catch (err) {
        console.error("Signin error:", err);
        if (err.response) {
          if (err.response.status === 422 && err.response.data.errors) {
            const { errors } = err.response.data;
            if (errors.email && errors.email.includes("password")) {
              setError("Password does not match"); // Display error message for password mismatch
            } else {
              setError("Invalid email or password. Please try again."); // Display generic error message for other validation errors
            }
          } else {
            setError("Signin failed. Please try again."); // Generic error message for other errors
          }
        }
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    setError(""); // Clear error message when user edits inputs
  }

  return (
    <div>
      <link
        href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
        rel="stylesheet"
      />
      <link
        href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <form className="form" onSubmit={submit}>
          <div className="banner">
            <h1>Sign in</h1>
            <Link href="/Signup">
              <p className="para">Need an account?</p>
            </Link>
          </div>
          {error && <p className="error">{error}</p>}
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <button className="signbtn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

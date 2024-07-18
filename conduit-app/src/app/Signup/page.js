"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying a single error message
  const router = useRouter();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }

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
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    setError(""); // Clear error message if all validations pass
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://api.realworld.io/api/users",
          {
            user: {
              username: username,
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
        console.log("Signup successful:", response.data);
        router.push("/Signin");
      } catch (err) {
        console.error("Signup error:", err);
        if (err.response) {
          setError(err.response.data.errors.username); // Display server validation errors if any
        } else {
          setError("Signup failed. Please try again."); // Generic error message for other errors
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    setError(""); // Clear error message when user edits inputs
  };

  return (
    <div>
     
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="banner">
            <h1>Sign up</h1>
            <Link className="link" href="/Signin">
              <p className="para">Have an Account</p>
            </Link>
          </div>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            name="username"
            required
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            name="email"
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            name="password"
            required
          />
          <br />
          <button className="signbtn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth/AuthService";

function SignUpPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const onSubmit = (data) => {
        AuthService.signUp(data)
          .then((res) => {
            AuthService.setToken(res.data);
              if (res.status === 200) {
                alert("Successfully Sign Up");
                navigate("/");
              } else {
                alert("Something went wrong");
              }
           
          })
          .catch((err) => {
            alert(err.response.data.message);
            // alert("Enter a valid Username & Password");
          });
      };
  return (
    <div className="container">
      <div className="card shadow p-8 mb-9 bg-body rounded">
        <div className="card-body">
          <div className="col-md-12 row">
            <div className="col-md-6 left-bg text-white coloumn">
              <div>
                <h1 className="mt-4">Welcome Back!</h1>
              </div>
              <div className="justify-content-center msg-custom">
                <span>
                  To keep connected with us please login with your personal info
                </span>
              </div>
              <div>
                <a href="/">
                  <button type="button" className="round-btn">
                    SIGN IN
                  </button>
                </a>
              </div>
            </div>
            <div className="col-md-6 right-bg">
              <h1>Create account</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <p>Fill all the details for registration</p>
                <div className="input-group">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      {...register("name")}
                      pattern="[a-zA-Z][a-zA-Z ][a-zA-Z ]{3,}"
                      title="Please Enter a valid name"
                      required
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mt-2">
                    <input
                      input
                      type="tel"
                      id="phone"
                      name="phone"
                      {...register("phone")}
                      pattern="[0-9]{10}"
                      title="Please Enter a valid number"
                      required
                      placeholder="Phone number"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mt-2">
                  <input
                      type="email"
                      name="email"
                      {...register("email")}
                      pattern="[^ @]*@[^ @]*"
                      size="30"
                      title="Please provide only a Best Startup Ever corporate e-mail address"
                      required
                      placeholder="Email Address"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="text"
                      name="gender"
                      {...register("gender")}
                      maxLength="6"
                      required
                      placeholder="Gender"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mt-2">
                  <input
                      type="password"
                      name="password"
                      {...register("password")}
                      minLength="8"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="password"
                      name="password"
                      {...register("confirm_password")}
                      minLength="8"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                      placeholder="Confirm Password"
                      className="form-control"
                    />
                  </div>
                </div>
                <a href="/">
                  <button
                    type="submit"
                    className="btn btn-sm btn-danger round-btn mt-2"
                  >
                    SIGN UP
                  </button>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
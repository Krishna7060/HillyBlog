import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block  w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center font-bold text-2xl leading-tight">
          Sign to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          {" "}
          dont have an account?
          <Link
            to="/signup"
            className=" font-medium text-primary transition-all duration-200 hover:underline"
          >
            SignUp
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="enter your email"
              type="email"
              {...register("email", {
                requiredP: true,
                validate: {
                  matchPatern: (value) =>
                    /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                    "Email address must be valid address",
                },
              })}
            />
            <Input
              label="Passward"
              type="password"
              placeholder="enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

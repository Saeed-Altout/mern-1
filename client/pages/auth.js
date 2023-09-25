import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Router from "next/router";
const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    if (variant == "login") {
      setVariant("register");
    } else {
      setVariant("login");
    }
  }, [variant]);

  const login = useCallback(async () => {
    const newUser = {
      name,
      password,
    };
    const res = await axios.post("http://localhost:3001/login", newUser);
    console.log(res.data.message);
    console.log(res);
    window.localStorage.setItem("userID", res.data.userID);
    setCookies("access_token", res.data.token);
    Router.push("/");
  }, [name, password]);

  const register = useCallback(async () => {
    const newUser = {
      name,
      email,
      password,
    };
    const res = await axios.post("http://localhost:3001/register", newUser);
    console.log(res);
    login();
  }, [name, email, password, login]);

  return (
    <div className="container mx-auto">
      <h1 className="mt-20 mb-10 text-5xl font-bold text-center ">
        {variant === "login" ? "Login" : "Register"}
      </h1>

      <div className="flex flex-col max-w-2xl gap-10 mx-auto mb-20">
        {variant === "register" && (
          <Input
            value={name}
            label="Name:"
            type="text"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          value={email}
          label="Email:"
          type="text"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          value={password}
          label="Password:"
          type="text"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="px-5 py-3 ml-auto cursor-pointer bg-black-400 w-fit"
          onClick={variant === "login" ? login : register}
        >
          {variant === "login" ? "Login" : "Sign up"}
        </button>
        <p>
          {variant === "login"
            ? " Do you have account?"
            : "Create new account!"}{" "}
          <strong
            className="cursor-pointer hover:underline"
            onClick={toggleVariant}
          >
            {variant === "login" ? "Login" : "Sign up"}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Auth;

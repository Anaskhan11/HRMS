// libs
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

// Icons
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

// Login User function
const LoginUser = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/auth/loginuser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  toast.success(`Login`, {
    style: {
      background: "#555",
      color: "#ffffff",
    },
  });
  return response.json();
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(LoginUser, {
    onSuccess: (data) => {
      // Assuming `data.accessToken` is the correct path to access the token
      secureLocalStorage.setItem("accessToken", data.accessToken);
      secureLocalStorage.setItem("refreshToken", data.refreshToken);
      secureLocalStorage.setItem("user", data.user);
      console.log("Login user data: ", data);
      setEmail("");
      setPassword("");

      //reload the page after successful login to get the user role
      window.location.reload();
      // Optionally navigate to another page upon successful login
      // You'll need to use the `useNavigate` hook from 'react-router-dom'
      navigate("/");
    },
    onError: (error) => {
      // Handle error condition
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <main className="h-screen bg-slate-800">
      <section className="flex flex-col sm:flex-row w-full justify-center sm:justify-around items-center h-full flex-wrap">
        <div className="flex items-center justify-center">
          <img
            src="./logo.svg"
            alt="company logo"
            className="h-20 w-auto sm:h-30"
          />
        </div>
        <div className="border-l border-primary h-96 hidden sm:block"></div>
        <div className="flex items-center justify-center">
          <div className="w-96 p-4 rounded-md ">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <div className="flex items-center p-1 rounded-md bg-white border-2 border-primary">
                  <HiOutlineMailOpen className=" text-primary  h-8 w-8" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="flex items-center p-1 rounded-md bg-white border-2 border-primary">
                  <RiLockPasswordLine className=" text-primary  h-8 w-8" />

                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-3 mt-12 rounded-md"
              >
                Login
              </button>
              {
                // Show error message if there is any
                mutation.isError ? (
                  <p className="text-black border border-red-400 mt-4 p-2 rounded-md bg-red-100">
                    {mutation.error.message}
                  </p>
                ) : null
              }
              {
                // Show success message if there is any
                mutation.isSuccess ? (
                  <p className="text-black border border-green-400 mt-4 p-2 rounded-md bg-green-100">
                    {mutation.data.message}
                  </p>
                ) : null
              }
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

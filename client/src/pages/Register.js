import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const [isRegister, setIsRegister] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!email || !password || !name) {
        toast.error("all values are required for register");
      } else {
        toast.success("success");
      }
    } else {
      if (!email || !password) {
        toast.error("all values are required for login ");
      } else {
        toast.success("success");
      }
    }
  };

  return (
    <>
      <section className="max-w-5xl mx-auto text-center">
        <div className="shadow-lg shadow-black overflow-hidden rounded-md mt-20 bg-gray-200 w-1/3 mx-auto p-5">
          <form onSubmit={onSubmit} className="space-y-5">
            <h1> {isRegister ? "Register" : "Login"}</h1>
            <div>
              {isRegister && (
                <input
                  type="text"
                  className="w-full h-10 rounded-md p-2"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              )}
            </div>
            <div>
              <input
                type="email"
                className="w-full h-10 rounded-md p-2"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                className="w-full h-10 rounded-md p-2"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="w-full mx-auto">
              <Button variant="contained" className="!w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>

          <p className="mt-5">
            {isRegister ? "Already a Member? " : "Not a member yet? "}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;

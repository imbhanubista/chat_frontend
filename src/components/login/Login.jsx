import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/kaha-logo.png";
import { loginUser } from "../../services/apiServices";
// importing zustand store
import store from "../../store";
import { userId } from "../../store";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let loginApiCall = await loginUser(data);
      console.log(loginApiCall, "loginApiCall");
      if (loginApiCall.type === "error") {
        toast.error(loginApiCall.message);
      } else {
        toast.success(loginApiCall.message);
        store.setState({ token: loginApiCall.data.jwt });
        userId.setState({ userId: loginApiCall.data.userId });
        navigate("/dashboard");
      }
    } catch (err) {}
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary-200 bg-cover bg-no-repeat">
      <div className="rounded-xl bg-tertiary border-4 border-secondary bg-opacity-100 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-black">
          <div className="mb-8 flex flex-col items-center">
            <img src={logo} width="150" alt="" srcset="" />
            <h1 className="mb-2 text-2xl font-bold">LOGIN</h1>
            <span className="text-black">Enter Login Details</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-gray-400 bg-opacity-90 px-6 py-2 text-center text-inherit placeholder-white shadow-lg outline-none backdrop-blur-md"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-gray-400 bg-opacity-90 px-6 py-2 text-center text-inherit placeholder-white shadow-lg outline-none backdrop-blur-md"
                type="Password"
                placeholder="*********"
                {...register("password", { required: true })}
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-secondary px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-lightBlue-100"
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <p className="text-center text-black mt-4">
              Don't have an account?{" "}
              <a
                className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-300 "
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

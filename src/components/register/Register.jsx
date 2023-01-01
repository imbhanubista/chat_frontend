import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/kaha-logo.png";
import { registerUser } from "../../services/apiServices";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let registerApiCall = await registerUser(data);
      if (registerApiCall.type === "error") {
        toast.error(registerApiCall.message);
      } else {
        toast.success(registerApiCall.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary-dark bg-cover bg-no-repeat rounded-md">
      <div className="rounded-xl bg-tertiary border-4 border-secondary bg-opacity-100 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-black">
          <div className="mb-8 flex flex-col items-center">
            <img src={logo} width="80" alt="Kaha Logo" />
            <span className="text-black underline text-xl ">
              Enter Register Details
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-gray-400 bg-opacity-90 px-6 py-2 text-center text-inherit placeholder-white shadow-lg outline-none backdrop-blur-md"
                type="text"
                placeholder="Full Name"
                {...register("fullname", { required: true })}
              />
            </div>
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
                type="text"
                placeholder="example@gmail.com"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-gray-400 bg-opacity-90 px-6 py-2 text-center text-inherit placeholder-white shadow-lg outline-none backdrop-blur-md"
                type="tel"
                placeholder="98**00****"
                {...register("phone", { required: true })}
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

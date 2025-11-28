import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constant";

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function SignInForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
   const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);
    const res = await api.post('api/token/' , {username: data.username , password: data.password})
    console.log(res)
    if(res){
      localStorage.setItem(ACCESS_TOKEN , res.data.access)
      localStorage.setItem(REFRESH_TOKEN , res.data.refresh)
      navigate('/user')
      window.location.reload()
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Project Name */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          MyEduGuide
        </h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>

        </form>

        {/* Bottom Links */}
        <p className="text-center text-gray-500 mt-5">
          Don't have an account?
          <Link to={'/signup'}>
          <span className="text-blue-600 cursor-pointer hover:underline ml-1">
            Register
          </span>
          </Link>
        </p>

      </div>
    </div>
  );
}

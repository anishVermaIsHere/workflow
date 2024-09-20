import { ChangeEvent, FormEvent, useState } from "react";
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from "react-router-dom";
import { authAPI } from "../shared/services/api/auth";
import useAuthStore from "../store/auth.store";
import Spinner from "./Spinner";


const Login = () => {
  const { setUser } =  useAuthStore(state=>state);
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);
  const [formValues, setFormValues]=useState({
      email: "",
      password: "",
  });

  const handleChange=(event: ChangeEvent<HTMLInputElement>)=>{
      setFormValues({
          ...formValues,
          [event.target.name]: event.target.value,
      });
  };

  const handleSubmit=async(event: FormEvent<HTMLFormElement>)=>{
    try {
      event.preventDefault();
      setIsLoading(true);
      const res = await authAPI.login(formValues);
      if(res.status === 200){
        setUser(res.data.user);
        toast.success(res.data.message);
        navigate("/user/workflow");
      } else {
        toast.error("Login failed");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
    setFormValues({ email: "", password: ""});
  }

  if(isLoading) return <Spinner />

  return (
    <div className="max-w-md mx-auto py-12 px-2.5 m-16 border rounded-lg">
    <h4 className="text-teal-700 font-semibold text-2xl text-center">Workflow Builder</h4>
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-teal-500 dark:focus:border-teal-500"
          placeholder="davidpaul@test.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-teal-500 dark:focus:border-teal-500"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-teal-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded text-sm w-full px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
      >
        Login
      </button>
    </form>
      <div className="mt-5 max-w-sm mx-auto text-center">
      <NavLink to="/register" className="text-teal-500 underline">Register</NavLink>
      </div>
    </div>
  );
};

export default Login;

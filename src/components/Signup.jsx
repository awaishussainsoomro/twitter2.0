import { useState } from "react";
import authService from "../appwrite/auth";
import { Button, Input } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [error, setError] = useState("");

  const createAccount = async (data) => {
    setError("");
    try {
      const useData = await authService.createAccount(data);
      if (useData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(authLogin({ userData: currentUser }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Failed to create account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <Send className="w-10 h-10 text-sky-500 fill-current mb-2" />
          <h2 className="text-2xl font-bold text-white">
            Join Twitter 2.0 today
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Create your account to start posting
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(createAccount)} className="mt-4">
          <Input
            label="Full Name"
            placeholder="Awais Hussain"
            {...register("name", { required: "Full name is required" })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-400 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

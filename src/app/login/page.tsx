"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){

    const [user,setUser] = React.useState({
        email:"",
        password:"",
        
    })

    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] =React.useState(false);
    const [loading,setLoading] =React.useState(false);
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const onLogin =async ()=>{
          try {

            if (!validateEmail(user.email)) {
                toast.error("Please enter a valid email");
                return;
            }

            setLoading(true);
           const response =  await axios.post("/api/users/login",user);
           console.log("Login success",response.data);
           toast.success("Login success");
           router.push("/profile")

          } catch (error:any) {
            console.log("Login failed",error.message);
             
            toast.error(error.message)
          }
          finally{
            setLoading(false);
          }

    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-gray-50">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {loading ? "Processing..." : "Login"}
                </h1>
                <div className="w-full h-px bg-gray-200"></div>
            </div>

            {/* Form */}
            <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        text-gray-950
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                 transition-colors duration-200 placeholder-gray-400
                                 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        type="email" 
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Enter your email"
                        disabled={loading}
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label 
                        htmlFor="password" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-3 border border-gray-300 text-gray-950 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                 transition-colors duration-200 placeholder-gray-400
                                 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        type="password" 
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Enter your password"
                        disabled={loading}
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 
                              focus:outline-none focus:ring-2 focus:ring-offset-2 
                              ${buttonDisabled || loading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md'
                              }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Logging in...</span>
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
            </div>

            {/* Sign up link */}
            <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                        href='/signup' 
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    </div>
);

}
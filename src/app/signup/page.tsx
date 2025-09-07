"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Signup(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const[buttonDisabled ,setButtonDisabled] =React.useState(false)

    const [loading ,setLoading] =React.useState(false)
    const onSignup =async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup success" ,response.data);
            router.push("/login")

        } catch (error:any) {
            console.log("SignUp failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length >0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">{loading? "Processing":"SignUp"}</h1>
        <hr className="mb-6 border-gray-200" />
        
        <div className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                </label>
                <input
                    className="w-full p-3 border border-gray-900 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors " 
                    type="text" 
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Enter your username"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <input
                    className="w-full p-3 border   text-gray-900 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                    type="email" 
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <input
                    className="w-full p-3 border border-gray-900 rounded-lg   text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                    type="password" 
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Enter your password"
                />
            </div>

            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`w-full p-3 rounded-lg font-medium transition-colors ${
                    buttonDisabled 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                }`}
            >
                {buttonDisabled ? "Please fill all fields" : "Sign Up"}
            </button>
        </div>

        <div className="mt-6 text-center">
            <Link href='/login' className="text-blue-600 hover:text-blue-800 font-medium">
                Already have an account? Login here
            </Link>
        </div>
    </div>
</div>
    )
}
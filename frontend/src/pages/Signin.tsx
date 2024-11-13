import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface SignupResponse {
    msg: string;
    token: string;
}

export const Signin=()=>{

    const [username,setUsername]=useState(" ");
    const [password,setPassword]=useState(" ");

    const navigate=useNavigate();

    return <div className="flex justify-center h-screen  bg-slate-300">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading title={"Sign In"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox title={"Email"} placeholder={"johndoe@example.com"} onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <InputBox title={"Password"} placeholder={"password"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response=await axios.post<SignupResponse>("http://localhost:3000/api/v1/user/signup",{
                            username,
                            password
                        })
                        localStorage.setItem("token","Bearer "+response.data.token)
                        if(!response){
                            navigate("/signup")
                        }else(
                            navigate("/dashboard")
                        )
                    }} buttonText={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard=()=>{
    const navigate=useNavigate();
    return <div>
        <Appbar onClick={()=>{
            localStorage.removeItem("token");
            navigate("/signin")
        }}/>
        <Balance value={"10,000"} />
        <Users />
    </div>
}
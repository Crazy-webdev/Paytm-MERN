import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


interface User {
    username: string;
    firstName: string;
    lastName: string;
    _id: string;
}


interface UserResponse {
    user: User[];
}
export const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [filter,setFilter]=useState("");
    const [debouncedFilter, setDebouncedFilter] = useState(filter);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 500); // Adjust the delay as needed (500ms here)

        return () => {
            clearTimeout(handler);
        };
    }, [filter]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get<UserResponse>(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`, {
            headers: {
                Authorization: token,
            },
        })
        .then(response => {
            console.log(response);
            setUsers(response.data.user);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
    }, [debouncedFilter]);

    return <div className="m-4 ">
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} key={user._id} />)}
        </div>
    </div>
}

function User({user}:{user:User}) {
    const navigate=useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <button onClick={()=>{
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }} className="bg-black text-white border rounded-md p-3 mt-1 mr-1" >Send Money</button>
    </div>
}
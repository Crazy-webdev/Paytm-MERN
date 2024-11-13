import { MouseEvent } from "react"

export function Appbar({onClick}:{onClick?:(e:MouseEvent<HTMLButtonElement>)=>void}){
    return <div className=" flex justify-between shadow-lg">
        <div className="flex flex-col justify-center h-full ml-4 mt-3 ">
            Paytm App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className=" rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-3 mr-2">
                <div className="flex flex-col justify-center h-full text-xl ">
                    U
                </div>
            </div>
            <div>
                <button onClick={onClick} className="border rounded-md bg-blue-600 text-white p-2 m-4 ">Logout</button>
            </div>
        </div>
    </div>
}
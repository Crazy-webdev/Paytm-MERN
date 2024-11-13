import { MouseEvent } from "react"

export function Button({buttonText,onClick}:{buttonText:string,onClick?:(e:MouseEvent<HTMLButtonElement>)=>void}){
    return<div className="text-white border rounded-lg border-slate-700  text-center">
        <button onClick={onClick} className="bg-black w-full py-2 pl-1" >{buttonText}</button>
    </div>
}
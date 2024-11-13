import { ChangeEvent } from "react";


export function InputBox({title,placeholder,onChange}:{title:string,placeholder:string,onChange:(e:ChangeEvent<HTMLInputElement>)=>void}){
    return <div className="text-left">
        {title}
        <div className="rounded-md py-1 pl-2 text-left">
            <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
    </div>
}
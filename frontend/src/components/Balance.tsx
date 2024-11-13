export function Balance({value}:{value:string}){
    return <div className="flex flex-row pt-2 pl-4">
        <div className="text-bold text-black  mt-2 ">
            Your Balance
        </div>
        <div className="flex justify-end  mt-2 ml-3 ">
            Rs {value}
        </div>
    </div>
}
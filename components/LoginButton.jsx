import { clsx } from "clsx";

export default function Login ({img, text}) {
    return (
        <button className=" bg-white w-full md:w-[70%] flex flex-row items-center justify-start boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:bg-zinc-100">
            <img src={img} alt="" className={clsx("md:ml-4 w-[24px] h-[24px]", {"bg-black p-2 rounded-[50%]": img === '/twitter.svg'})}/>
            <p className="w-full text-center text-sm md:text-2xl font-bold">{text}</p>
        </button>
    )
}
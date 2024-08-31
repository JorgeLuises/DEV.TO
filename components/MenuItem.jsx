export default function MenuItem(props){
    return(
        <>
            <button className="text-left w-full text-black hover:bg-[#E4E4F3] hover:text-[#3B49DF] hover:underline p-4 rounded-lg text-3xl">
                {props.icon} {props.label}
            </button>
        </>
    )
}
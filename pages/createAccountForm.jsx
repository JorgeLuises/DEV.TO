import Image from "next/image";
import { createUser, login } from "@/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import {Toaster, toast} from "sonner";

export default function CreateAccountForm () {
    const router = useRouter();
    const [humanConfirm, setHumanConfirm] = useState(false);

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm();

    function handleCheckedBox (event) {
        setHumanConfirm(event.target.checked);
    };

    async function onSubmit (data) {
        try {
            if (!humanConfirm) {
                toast.error('Necesitas confirmar que eres humano');
                return;
            }
            
            const dataBase = await createUser(data.name, data.profilePic, data.username, data.email, data.password);
            
            if (dataBase && data.email !== dataBase.email) {
                toast.success('Usuario registrado satisfactoriamente');
                const token = await login (data.email, data.password);
                window.sessionStorage.setItem('token', token);
                router.push('/');
                console.log('Usuario registrado');
            } else {
                toast.error('Usuario ya registrado. Inicia sesión.');
                router.push('/login');
                console.error('Usuario ya registrado');
            }
        } catch (error) {
            toast.error('Error al registrar usuario');
            console.error("[register error]", error);
        }
    };



    
    return (
        <>
            <Toaster position="bottom-right"/>
            <main className="w-full flex justify-center">
                <div className="w-full md:w-[38%] flex flex-col items-start m-[5rem] boder-solid border-gray-100 border-[0.5px] p-4 rounded-lg">
                        <h1 className="font-bold text-3xl p-8">Create your account</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 p-8">
                            <label className="text-3xl font-medium">Profile image</label>
                            <input type="text" 
                            placeholder="Introduce enlace de foto" 
                            className="text-xl boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none"
                            {...register ('profilePic', {
                                required: {value:false}
                            })}/>
                            <label className="text-3xl font-medium">Name</label>
                            <input type="text" 
                            className="text-xl boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none"
                            {...register ('name', {
                                required: {value: true, message: 'Nombre requerido'}
                            })}/>
                            <label className="text-3xl font-medium">Username</label>
                            <input type="text" 
                            {...register ('username', {
                                required: {value: true, message: 'Nombre de usuario requerido'}
                            })}
                            className="text-xl boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none"/>
                            <label className="text-3xl font-medium">Email</label>
                            <input type="text" 
                            {...register ('email', {
                                required: {value: true, message: 'Email de usuario requerido'}
                            })}
                            className="text-xl boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none"/>
                            <label className="text-3xl font-medium">Password</label>
                            <input type="password" 
                            {...register ('password', {
                                required: {value: true, message: 'Contraseña de usuario requerida'}
                            })}
                            className="text-xl mt-3 boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none"/>
                            <div className="flex flex-row items-center justify-between bg-zinc-100 w-[150px] lg:w-[50%] h-[65px] boder-solid border-gray-300 border-[0.5px]">
                                <div className="flex flex-row items-center gap-[1.2px] md:gap-3 p-4">
                                    <input onChange={handleCheckedBox} type="checkbox" className="w-[24px] h-[24px]"/>
                                    <label className="text-2xl font-normal text-center">No soy un robot</label>
                                </div>
                                <Image
                                src="/captcha.svg"
                                alt="captcha"
                                width={35}
                                height={0}
                                priority
                                className="pr-[10px]"
                                />
                            </div>
                            <button className="w-[100px] lg:w-[20%] mt-2 boder-solid border-blue-700 border-[0.5px] bg-blue-700 p-4 rounded-lg text-white text-3xl font-semibold hover:bg-blue-900">sign up</button>
                        </form>
                        {errors.name && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.name?.message}</p>)}
                        {errors.username && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.username?.message}</p>)}
                        {errors.email && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.email?.message}</p>)}
                        {errors.password && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.password?.message}</p>)}
                    </div>
            </main>
        </>
    )
}
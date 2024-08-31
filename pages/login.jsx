import { Link } from "@mui/material";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import { login } from "@/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function Login () {
    const socialMedias = [
        {text: 'Continue with Apple', img: '/apple.svg'},
        {text: 'Continue with Facebook', img: '/facebook.svg'},
        {text: 'Continue with Forem', img: '/forem.svg'},
        {text: 'Continue with GitHub', img: '/github.svg'},
        {text: 'Continue with Google', img: '/google.svg'},
        {text: 'Continue with Twitter (x)', img: '/twitter.svg'}
    ];

    const router = useRouter();
    const [remember, setRemember] = useState(false);

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    
    async function onSubmit (data) {
        try {
                const token = await login (data.email, data.password);

                if (remember === true && token) {
                    toast.success('Bienvenido');
                    window.localStorage.setItem('token', token);
                    router.push('/');
                }
                else {
                    toast.success('Bienvenido');
                    window.sessionStorage.setItem('token', token);
                    router.push('/');
                }
        } catch (error) {
            toast.error('Contraseña o correo invalido');
            console.error("[login error]", error);
        }
    };

    function handleCheckedBox (event) {
        setRemember(event.target.checked);
    };
    
    return (
        <>
            <Toaster/>
            <main className="w-full flex justify-center">
                <div className="w-[50%] mt-8 mb-12 flex flex-col items-center gap-4">
                    <Link href="/" className="p-4">
                        <Image
                        src="/devto.svg"
                        alt="Logo devto"
                        className="bg-black rounded-[3px] w-[50px]"
                        width={0}
                        height={0}
                        priority
                        />
                    </Link>
                    <h1 className="text-black text-5xl font-bold text-center">Join the DEV Community</h1>
                    <p className="text-2xl text-neutral-700 text-center mb-4">DEV Community is a community of 1,683,678 amazing developers</p>
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        {
                            socialMedias.map((socialMedia, index) => {
                                return (
                                    <LoginButton
                                    key={index}
                                    img={socialMedia.img}
                                    text={socialMedia.text}/>
                                );
                            })
                        }
                    </div>
                    <div className="relative text-center m-8 w-full md:w-[75%]">
                        <hr className="h-[1px] m-6 bg-gray-300 border-none"/>
                        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-zinc-100 p-4 text-gray-700 text-center text-xl">OR</div>
                    </div>
                    <div className="w-full md:w-[70%] flex flex-col items-start">
                        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <label className="text-3xl font-medium">Email</label>
                            <input type="text" 
                                className="boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none text-2xl"
                                {...register('email', {
                                    required: {value: true, message: 'Correo requerido'}
                                })}/>
                            <label className="text-3xl font-medium">Password</label>
                            <input type="password" 
                                className="mt-3 boder-solid border-gray-300 border-[0.5px] p-4 rounded-lg hover:border-gray-400 focus-within:border-blue-700 focus-within:border-2 focus:outline-none text-2xl"
                                {...register ('password', {
                                    required: {value: true, message: 'Contraseña requerida'}
                                })}/>
                            <div className="flex flex-row justify-between items-center w-full gap-x-8 mt-2 text-xl md:text-2xl text-center p-4">
                                <div className="flex flex-row gap-[1.2px] md:gap-2">
                                    <input type="checkbox" onChange={handleCheckedBox}/>
                                    <label>Remember me</label>
                                </div>
                                <a href="#" className="text-blue-700">Forgot password?</a>
                            </div>
                            <button className="boder-solid border-blue-700 border-[0.5px] bg-blue-700 p-5 rounded-lg text-white text-2xl font-semibold hover:bg-blue-900 text-center no-underline">Log in</button>
                        </form>
                        {errors.email && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.email?.message}</p>)}
                        {errors.password && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.password?.message}</p>)}
                    </div>
                    <div className="w-full md:w-[60%]">
                        <p className="text-2xl text-neutral-500 text-center mt-4 italic">By signing in, you are agreeing to our <a href="#" className="text-blue-700">privacy policy, terms of use</a> and <a href="#" className="text-blue-700">code of conduct.</a>
                        </p>
                    </div>
                    <hr className="h-[1px] m-6 bg-gray-300 border-none w-full md:w-[75%]"/>
                    <div className="flex items-center justify-center">
                        <p className="text-2xl text-center">New to DEV Community? <Link href="/createAccount" className="text-blue-700 no-underline">Create account.</Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {Toaster, toast} from "sonner";
import { createPost } from "@/api";

export default function CreatePost () {
    const router = useRouter();
    const [selectedInput, setSelectedInput] = useState('');
    const [titulo, setTitulo] = useState('');
    const [parrafoUno, setParrafoUno] = useState('');
    const [parrafoDos, setParrafoDos] = useState('');

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (selectedInput === 'titulo') {
            setTitulo('Escribe un gran titulo de Post');
            setParrafoUno('Piensa el titulo de tu post como algo corto pero descriptivo en una oración corta.');
            setParrafoDos('Usa palabras clave que sean apropiadas para asegurar que la gente encuentre tu post al momento de buscarlo.')
        }
        else if (selectedInput === 'tags') {
            setTitulo('Lineamientos del uso de tags');
            setParrafoUno('Los tags ayudan a la gente a encontrar tu post; Piensa en ellos como el titulo o categoría que mejor describa tu post.');
            setParrafoDos('Algunas etiquetas tienen pautas de publicación especiales, verifique dos veces para asegurarse de que su publicación cumpla con ellos.')
        }
        else if (selectedInput === 'cuerpo') {
            setTitulo('Tips de publicación');
            setParrafoUno('Asegúrese de que su publicación contenga una imagen de portada para aprovechar al maximo el feed de inicio y las redes sociales.');
            setParrafoDos('Comparta su publicación en plataformas de redes sociales o con sus compañeros de trabajo o comunidades locales.')
        }
    }, [selectedInput]);

    function handleInputChange (event) {
        setSelectedInput(event.target.name);
    };

    async function onSubmit (data) {
        try {
                await createPost(data.title,data.image, data.body, data.tags);
                toast.success('Post publicado');
                console.log('Post publicado satisfactoriamente');
        } catch (error) {
            toast.error('Error al publicar post');
            console.error("[register error]", error);
        }
    };
    
    return (
        <>
            <Toaster/>
            <main className="w-full flex flex-col">
                <div className="flex flex-row items-center md:pl-4 lg:pl-[10rem] mt-4 w-[90%] md:w-[65%] lg:w-[90%]">
                    <div className="flex-row items-center gap-4 flex-grow hidden md:flex">
                        <Link href="/" className="w-[25%] lg:w-[15%] bg-black flex items-center justify-center rounded-[6px] p-1">
                            <Image
                            src="/devto.svg"
                            alt="Logo devto"
                            width={40}
                            height={0}
                            priority
                            />
                        </Link>
                        <p className="text-2xl font-medium">Create Post</p>
                    </div>
                    <div className="flex flex-row items-center gap-8 flex-grow md:w-[50%] justify-end md:justify-center">
                        <p className="text-2xl font-medium hover:text-indigo-700 hover:bg-indigo-100 p-4 rounded-xl">Edit</p>
                        <p className="text-2xl text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 p-4 rounded-lg">Preview</p>
                    </div>
                    <Link href="/" className="w-[15%] md:w-[5%] lg:w-[3%] text-center text-3xl font-medium hover:text-indigo-700 hover:bg-indigo-100 rounded-xl p-2">X</Link>
                </div>
                <div className="h-[15rem] w-full md:grid grid-cols-[2fr,1fr] justify-center md:p-4">
                    <div className="lg:pl-[17%]">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <div className="bg-white flex flex-col p-8 gap-4 rounded-lg">
                                <input type="url" 
                                placeholder="Ingresa la dirección URL de la imagen" 
                                {...register ('imagen', {
                                    required: {value:false}
                                })}
                                className=" w-[55%] lg:w-[27%] border-solid border-gray-300 border-2 rounded-md p-2 focus:border-transparent focus:ring-2 focus:ring-indigo-700 focus:outline-none placeholder-black text-base lg:text-lg font-bold placeholder-opacity-70"/>
                                <textarea name="title" 
                                type="text" 
                                onClick={handleInputChange} 
                                placeholder="Ingresa el titulo del Post aquí..." 
                                {...register ('title', {
                                    required: {value: true, message:'Se requiere de un titulo'}
                                })}
                                className="w-[90%] mt-6 h-[15rem] resize-none focus:border-transparent focus:outline-none placeholder-black text-3xl md:text-4xl lg:text-7xl font-bold placeholder-opacity-70"/>
                                <input name="tags" 
                                type="text" 
                                onClick={handleInputChange} 
                                placeholder="Ingresa hasta 4 tags separados por coma, ejemplo: #Javascript, #CSS"
                                {...register ('tags', {
                                    required: {value:false}
                                })}
                                className="w-full md:w-[80%] lg:w-[50%] p-2 focus:border-transparent focus:outline-none placeholder-black text-lg font-base placeholder-opacity-60"/>
                                <div className="w-full flex flex-row justify-between items-center mt-8 bg-zinc-50 p-4">
                                    <div className="w-[80%] flex flex-row gap-8 justify-start">
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/negritas.svg"
                                            alt="negritas"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/cursiva.svg"
                                            alt="cursiva"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/adjuntar.svg"
                                            alt="adjuntar"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/enumerar.svg"
                                            alt="enumerar"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/viñetas.svg"
                                            alt="viñetas"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/encabezado.svg"
                                            alt="encabezado"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/comillas.svg"
                                            alt="comillas"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                        <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                            <Image
                                            src="/iconoimagen.svg"
                                            alt="iconoimagen"
                                            width={25}
                                            height={0}
                                            priority
                                            />
                                        </button>
                                    </div>
                                    <button className="hover:bg-indigo-100 md:p-2 lg:p-3 rounded-lg">
                                        <Image
                                        src="/masopciones.svg"
                                        alt="masopciones"
                                        width={25}
                                        height={0}
                                        priority
                                        />
                                    </button>
                                </div>
                                <textarea name="body" 
                                type="text" 
                                onClick={handleInputChange} 
                                placeholder="Ingresa el contenido de tu post aquí..." 
                                {...register ('body', {
                                    required: {value:true, message:'Se requiere de una descripción del post'}
                                })}
                                className="w-[95%] mt-8 focus:border-transparent focus:outline-none placeholder-black text-3xl font-inconsolata resize-none h-[20rem] placeholder-opacity-70"/>
                            </div>
                            <div className="flex flex-row mt-8 w-full md:w-[80%] lg:w-[50%] justify-between items-center p-4">
                                <button className="bg-blue-700 text-white font-semibold text-2xl p-4 rounded-lg hover:bg-indigo-800">Publish</button>
                                <button className="font-base text-2xl p-4 rounded-lg hover:bg-indigo-100 hover:text-blue-700">Save draft</button>
                                <button className="font-base text-2xl p-4 rounded-lg hover:bg-indigo-100 hover:text-blue-700">
                                    <Image
                                    src="/ajustes.svg"
                                    alt="ajustes"
                                    width={25}
                                    height={0}
                                    priority
                                    />
                                </button>
                                <button className="font-base text-2xl p-4 rounded-lg hover:bg-indigo-100 hover:text-blue-700">Revert new changes</button>
                            </div>
                        </form>
                        {errors.titulo && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.titulo?.message}</p>)}
                        {errors.cuerpo && (<p className="text-red-500 text-center font-semibold p-4 text-xl">{errors.cuerpo?.message}</p>)}
                    </div>

                    <div className="pl-8">
                        {
                            selectedInput === 'title' && (<div>
                                <h2 className="font-bold text-4xl p-4">{titulo}</h2>
                                <p className="text-3xl text-zinc-600 p-4">•{parrafoUno}</p>
                                <p className="text-3xl text-zinc-600 p-4">•{parrafoDos}</p>
                            </div>)
                        }
                        {
                            selectedInput === 'tags' && (<div className="mt-[15rem]">
                                <h2 className="font-bold text-4xl p-4">{titulo}</h2>
                                <p className="text-3xl text-zinc-600 p-4">•{parrafoUno}</p>
                                <p className="text-3xl text-zinc-600 p-4">•{parrafoDos}</p>
                            </div>)
                        }
                        {
                            selectedInput === 'body' && (<div className="mt-[30rem]">
                                <h2 className="font-bold text-4xl p-4">{titulo}</h2>
                                <p className="text-3xl text-zinc-600 p-4">•{parrafoUno}</p>
                                <p className="text-3xl text-zinc-600 p-4">•{parrafoDos}</p>
                            </div>)
                        }
                    </div>
                </div>
            </main>
        </>
    )
}
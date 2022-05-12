import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
export default function HelpComponent() {
    const [selected, setSelected] = useState(-1)
    const techs = [
        {
            name: 'Next.js',
            link: 'https://nextjs.org/',
            logo: '/media/Tech/nextjs.png',
        },
        {
            name: 'Tailwind CSS',
            link: 'https://tailwindcss.com/',
            logo: '/media/Tech/tailwindcss.png',
        },
        {
            name: 'Twilio Video',
            link: 'https://www.twilio.com/video/',
            logo: '/media/Tech/twilio.png',
        },
        {
            name: 'MonngoDB Atlas',
            link: 'https://www.mongodb.com/cloud/atlas',
            logo: '/media/Tech/mongodb.png',
        },
        {
            name: 'Flask',
            link: 'https://flask.palletsprojects.com/',
            logo: '/media/Tech/flask.png',
        },
        {
            name: 'Amazon Web Services',
            link: 'https://aws.amazon.com/',
            logo: '/media/Tech/aws.png',
        }
    ]
    const questions = [
        {
            question: '¿Donde se puede conseguir el codigo fuente?',
            answer: <>Puedes conseguir acceso al codigo fuente en el siguiente repositorio: <a className='text-sky-400' href="https://github.com/JRaOr/GoogleMeet-clone" target={'_blank'} rel='noopener noreferrer'>Google Meet Clone</a></>
        },
        {
            question: '¿Donde puedo registrarme para usar el proyecto?',
            answer: <>Crea una cuenta en el siguiente enlace: <Link href={'/signup'}><a className='text-sky-400'>Registrar</a></Link> </>
        },
        {
            question: '¿Cómo se puede ingresar?',
            answer: <>Despues de registrarte, inicia sesion con tu usuario y contraseña en el sigiente enlace: <Link href={'/signin'}><a className='text-sky-400'>Iniciar sesion</a></Link></>
        },
        {
            question: '¿Cómo se puede reportar un problema?',
            answer: <>Para reportar un problema, puedes contactarme en cualquiera de las redes sociales mostradas arriba o en el inicio de sesion.</>
        },
        {
            question: '¿Sobre que tecnologias se basa el proyecto?',
            answer: <>
                        <ul className='flex flex-col items-start gap-3'>
                            {techs.map((tech, index) => (
                                <a href={tech.link} key={`techs-${index}`} target={'_blank'} className='text-sky-700' rel="noreferrer">
                                    <li key={index} className={`flex items-center gap-2`}>
                                        <img src={tech.logo} alt={tech.name} className='w-[30px] h-[30px] object-contain'/>
                                        {tech.name}
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </>
        }
    ]
    return (
        <section className='w-full flex flex-col items-center justify-center text-lg'>
            {questions.map((item, index)=>(
                <div className='w-full' key={`question-${index}`}>
                    <div onClick={()=>{ 
                        if(selected === index) {
                            setSelected(-1)
                        } else {
                            setSelected(index)
                        }
                    }} className="w-full p-2 border-b-[1px] border-slate-300 flex justify-between items-center cursor-pointer hover:bg-gray-100 select-none transition-grl" key={index}>
                        <h2 className="">{item.question}</h2>
                        {selected != index ? <IoIosArrowForward/>:<IoIosArrowDown/>}
                    </div>
                    <div className={`select-none ${selected === index ? 'block':'hidden'} w-full px-5 py-2 border-l-2 border-sky-600`}>
                        {item.answer}
                    </div>
                </div>
            ))}
        </section>
    )
}
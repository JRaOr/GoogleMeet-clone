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
        },
        {
            question: '¿Cómo puedo cambiar mi foto de perfil?',
            answer: <>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>1.</span> Inicia sesion</p>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>2.</span> Da click en el circulo donde se muestra la inicial de tu nombre de usuario</p>
                        <img src='/media/help/profile1.png' className='shadow-md mt-2'/>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>3.</span> En el menu, da click en el icono de la camara para abrir el modal para cambiar tu foto.</p>
                        <img src='/media/help/profile2.png' className='shadow-md mt-2'/>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>4.</span> Da click en el boton de cambiar para seleccionar una imagen predefinida o poder cargar una desde tu equipo.</p>
                        <img src='/media/help/profile3.png' className='shadow-md mt-2'/>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>5.</span> Cambia tu foto!</p>
                        <img src='/media/help/profile4.png' className='shadow-md mt-2'/>
                    </>
        },
        {
            question: '¿Cómo puedo crear una nueva reunion o unirme a una con codigo?',
            answer: <>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>1.</span> Inicia sesion</p>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>2.</span> Da click en el boton Reunion nueva en la pantalla principal.</p>
                        <img src='/media/help/new-meeting1.png' className='shadow-md mt-2'/>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>3.</span> Ingresa el codigo de la reunion y da click en Unirse.</p>
                        <img src='/media/help/new-meeting2.png' className='shadow-md mt-2'/>
                    </>
        },
        {
            question: '¿Cómo puedo invitar a un amigo a una reunion?',
            answer: <>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>A:</span> Usando el codigo en la parte inferior izquierda de la reunion.</p>
                        <img src='/media/help/invite1.png' className='shadow-md mt-2'/>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>B:</span> En el boton de compartir, puedes copiar el link de la reunion.</p>
                        <img src='/media/help/invite2.png' className='shadow-md mt-2'/>
                        <p className='mt-2 text-slate-700'><span className='font-semibold'>C:</span> En el boton de compartir, puedes enviar un email con la invitacion a un amigo.</p>
                        <img src='/media/help/invite3.png' className='shadow-md mt-2'/>
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
                    }} className="w-full font-semibold p-2 border-b-[1px] border-slate-300 flex justify-between items-center cursor-pointer hover:bg-gray-100 select-none transition-grl" key={index}>
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
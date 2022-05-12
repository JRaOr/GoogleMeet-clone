import { AiFillGithub, AiFillLinkedin, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import HelpComponent from '../components/HelpComponent';
export default function About() {
    const social = [
        { link: 'https://github.com/JRaOR', icon : <AiFillGithub/>, color: 'github'},
        { link: 'https://www.linkedin.com/in/gerardo-ramirez-ortega-a2239b133/', icon : <AiFillLinkedin/>, color: 'linkedin'},
        { link: 'https://www.instagram.com/gerardo.raor/', icon : <AiFillInstagram/>, color: 'instagram'},
        { link: 'https://www.facebook.com/gerardo.ramirezortega.5', icon : <AiFillFacebook/>, color: 'facebook'},
    ]
    return (
        <div className="w-full p-5 max-w-[1140px] mx-auto flex flex-col h-full overflow-scroll  hide-scroll">
            <h1 className="text-2xl mx-auto my-5 ">Sobre este Proyecto</h1>
            <section className="flex w-full items-center flex-col md:flex-row mb-5">
                <div className="flex w-full md:w-[50%] items-center p-2 flex-col sm:flex-row" >
                    <img className="w-[120px] h-[120px] rounded-md object-contain" src="/media/Tech/meet.png"/>
                    <div className="font-semibold ml-5 flex flex-col items-center sm:items-start">
                        <h2 className="text-lg">Google Meet Clone</h2>
                        <p>Version: <span className=" text-slate-600 font-normal">v1.0.1</span></p>
                        <h3 className=' text-center sm:text-left'>Descripcion: <span className=" font-normal text-slate-600">Clon de Google Meet, creado unicamente con propositos didacticos.</span></h3>
                    </div>
                </div>
                <div className="w-full md:w-[50%] p-2 relative flex items-center flex-col sm:flex-row mt-5 sm:mt-0">
                    <div className="relative">
                        <img src="/media/me.jpg" className="w-[120px] h-[120px] rounded-md object-contain" />
                        <img src="/media/mexico.png" className=" w-[30px] h-[30px] object-contain absolute bottom-0 right-0 bg-slate-500 px-[2px] rounded-md"/>
                    </div>
                    <div className="ml-5 font-semibold flex flex-col items-center sm:items-start">
                        <h2>Creado por: <span className="font-normal text-slate-700">Gerardo Ramirez Ortega</span></h2>
                        <p>Carrera: <span className="font-normal text-slate-700">Ingeniería Electrónica</span></p>
                        <div className='flex gap-2 text-2xl mt-2'>
                            {social.map((item, index)=>(
                                <a href={item.link} target='_blank' rel='noopener noreferrer' key={index} className={`text-gray-500 ${item.color} transition-grl`}>
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <HelpComponent/>
        </div>
    )
}
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const data = [
    {
        img : 'user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg',
        title: 'Obtén un vínculo para compartir',
        text:   <>
                    Haz clic en <strong>Nueva reunión</strong>  para obtener un vínculo que puedas enviar a las personas con quienes quieras reunirte
                </>
    },
    {
        img : 'user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg',
        title: 'Visualiza a todos los participantes juntos',
        text: "Para ver más personas al mismo tiempo, ve a Cambiar diseño en el menú Más opciones"
    },
    {
        img : 'user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg',
        title: 'Planifica con anticipación',
        text:  <>Haz clic en <strong>Nueva reunión</strong> para programar reuniones en Calendario&nbsp;de&nbsp;Google y enviar invitaciones a los participantes</>
    },
    {
        img : 'user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg',
        title: 'Tu reunión es segura',
        text:  'Nadie podrá unirse a una reunión, a menos que el organizador los invite o admita'
    }
]
export default function Carousel() {
    const [index, setIndex] = useState(0);
    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
                <button onClick={()=>{
                    if(index > 0) {
                        setIndex(index-1)
                    }
                }} className={`${index === 0 ? 'text-gray-400': 'text-gray-600'} h-[48px] w-[48px] flex items-center justify-center hover:bg-stone-100 rounded-full transition-grl`}>
                    <AiOutlineLeft/>
                </button>
                <div className="w-full max-w-[330px] min-h-[480px]">
                    <img className="w-[330px] h-[330px] object-contain" src={`/media/Logos/${data[index].img}`}/>
                    <h3 className="carousel-title">{data[index].title}</h3>
                    <p className="carousel-text">{data[index].text}</p>
                </div>
                <button onClick={()=>{
                    if(index < data.length-1) {
                        setIndex(index+1)
                    }
                }} className={`${index === data.length - 1 ? 'text-gray-400': 'text-gray-600'} h-[48px] w-[48px] flex items-center justify-center hover:bg-stone-100 rounded-full transition-grl`}>
                    <AiOutlineRight/>
                </button>
            </div>
            
            <div className="flex items-center justify-center gap-2">
                {data.map((item, i) => (<div key={`control-${i}`} onClick={()=>{
                    setIndex(i)
                }} className={`h-2 w-2 rounded-full cursor-pointer transition-grl ${index === i ? 'bg-blue-500':'bg-gray-400'}`}/>))}
            </div>
        </div>
    )
}

import { useRouter } from "next/dist/client/router";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa";
import { useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Api from '../util/Api';
export default function Home(){
    const router = useRouter();
    const [focusButton, setFocusButton] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const user = useSelector(state => state.user);
    async function createRoom() {
        const response = await Api.getInstance().createRoom()
        if(response.success){
            router.push(`/room/${response.data.room_name}`)
        }
    }

    useEffect(()=>{
        if(!localStorage.getItem('token')) {
            router.push('/signin')
        }
    }, [])

    return (
        <div className="flex items-center justify-evenly h-full">
            <section className="px-12 py-4">
                <div className="w-[100%]  max-w-[560px]">
                    <h1 className="main-title">Videoconferencias premium. Ahora gratis para todos.</h1>
                    <p className="main-p">
                        Rediseñamos Google Meet, nuestro servicio de reuniones de negocios seguras, de modo que sea gratuito y esté disponible para todos.
                    </p>
                    <div className="flex">
                        <button onClick={()=>{ createRoom() }} className="bg-[#1a73e8] hover:bg-[#1a6dde] text-white font-semibold py-2 px-4 rounded flex items-center transition-grl mr-6">
                            <AiOutlineVideoCameraAdd className="mr-3"/> Reunion nueva
                        </button>
                        <div className={` border-2 flex items-center py-2 px-4 gap-2 w-full max-w-[262px] rounded-md ${focusButton && 'border-blue-500'}`}>
                            <FaKeyboard/>
                            <input value={roomCode} onChange={(e)=>{
                                setRoomCode(e.target.value)
                            }} onFocus={()=>{
                                setFocusButton(true)
                            }} type="text" className=" grow outline-none" placeholder="Ingresa un código o vínculo"/>
                        </div>
                        { (roomCode != "" || focusButton )&& <button onClick={()=>{
                            router.push(`/room/${roomCode}`)
                        }} disabled={roomCode === ''} className={`ml-2 px-2 flex items-center justify-center text-blue-500 font-semibold disabled:text-gray-400`}>
                            Unirse
                        </button>}
                    </div>
                    <div className="divider"/>
                    <Link href='/about'>
                        <p className="text-[16px] text-lg text-semibold text-[#5f6368] cursor-pointer"><span className="text-blue-400">Más información</span> sobre Google Meet</p>
                    </Link>
                
                </div>
            </section>  
            <section className="w-[45%]">
                <Carousel/>
            </section>
        </div>
    )
}
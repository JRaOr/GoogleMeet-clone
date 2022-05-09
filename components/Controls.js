import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsChatLeftText} from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { AiOutlineLink, AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showEmailModal, showToast } from '../store/user/actions';
export default function Controls( { room, toggleAudioButton, toggleVideoButton, toggleChat, participants} ) {
    const router = useRouter()
    const [showShareMenu, setShowShareMenu] = useState(false);
    const dispatch = useDispatch();

    const _shareMenu = () => (
        <ul className="cursor-pointer z-10 absolute rounded-md overflow-hidden bottom-0 left-0 bg-white text-slate-800 text-md flex flex-col w-[125px]">
            <li onClick={()=>{
                const link = `https://meetclone.gerardoraor.com/room/${room.name}`
                navigator.clipboard.writeText(link);
                setShowShareMenu(false)
                dispatch(showToast({
                    message: 'Link copiado al portapapeles',
                    type: 'success',
                    icon: '🔗',
                    position: 'bottom-right'
                }))
            }} className="flex transition-grl items-center py-1 px-2 border-b-[1px] gap-2 hover:bg-slate-100">
                <AiOutlineLink/> Get Link
            </li>
            <li onClick={()=>{
                console.log('Sending email')
                dispatch(showEmailModal(`https://meetclone.gerardoraor.com/room/${room.name}`))
                setShowShareMenu(false);
            }} className="flex transition-grl items-center py-1 px-2 border-b-[1px] gap-2 hover:bg-slate-100">
                <AiOutlineMail/> Send email
            </li>
        </ul>
    )

    return(
        <section className="relative call-controls h-[100px] text-white flex justify-between items-center px-5">
            <h2 className="font-semibold text-xl">{room.name}</h2>
            <div className="flex items-center gap-3 relative">
                {showShareMenu ? _shareMenu() : null}
                <button onClick={()=>{ setShowShareMenu(!showShareMenu) }} className={`w-[40px] relative transition-grl h-[40px] hover:bg-slate-600 rounded-full bg-[#3c4043] text-xl flex items-center justify-center`}>
                    <AiOutlineShareAlt/>
                </button>
                {toggleAudioButton()}
                {toggleVideoButton()}
                <button onClick={()=>{
                    room.disconnect()
                    router.push('/')
                }} className={`w-[40px] transition-grl h-[40px] rounded-full bg-red-400 text-xl flex items-center justify-center`}>
                    <MdCallEnd/>
                </button>
            </div>
            <div className="flex items-center">
                <button className={`w-[40px] relative transition-grl h-[40px] rounded-full text-xl flex items-center justify-center`}>
                    <FiUsers/>
                    <p className="absolute text-sm right-0 top-0 font-semibold bg-[#56585a] h-[18px] w-[18px] rounded-full">{participants}</p>
                </button>
                <button onClick={()=>{
                    toggleChat()
                }} className={`w-[40px] relative transition-grl h-[40px] rounded-full text-xl flex items-center justify-center`}>
                    <BsChatLeftText/>
                </button>
            </div>
        </section>
    )
}
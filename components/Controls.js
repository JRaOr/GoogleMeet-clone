import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsChatLeftText} from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { AiOutlineLink, AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showEmailModal, showToast } from '../store/user/actions';
import Clock from 'react-live-clock';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoMdInformationCircleOutline } from 'react-icons/io';
export default function Controls( { room, toggleAudioButton, toggleVideoButton, toggleChat, participants} ) {
    const router = useRouter()
    const [showShareMenu, setShowShareMenu] = useState(false);
    const dispatch = useDispatch();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const _shareMenu = () => (
        <ul className="cursor-pointer z-10 absolute rounded-md overflow-hidden bottom-0 left-0 bg-white text-slate-800 text-md flex flex-col w-[125px]">
            <li onClick={()=>{ getLink() }} className="flex transition-grl items-center py-1 px-2 border-b-[1px] gap-2 hover:bg-slate-100">
                <AiOutlineLink/> Copiar link
            </li>
            <li onClick={()=>{ sendEmail() }} className="flex transition-grl items-center py-1 px-2 border-b-[1px] gap-2 hover:bg-slate-100">
                <AiOutlineMail/> Enviar email
            </li>
        </ul>
    )

    function getLink() {
        const link = `https://meetclone.gerardoraor.com/room/${room.name}`
        navigator.clipboard.writeText(link);
        setShowShareMenu(false)
        setShowMobileMenu(false)
        dispatch(showToast({
            message: 'Link copiado al portapapeles',
            type: 'success',
            icon: '🔗',
            position: 'bottom-right'
        }))
    }

    function sendEmail() {
        dispatch(showEmailModal(`https://meetclone.gerardoraor.com/room/${room.name}`))
        setShowShareMenu(false);
        setShowMobileMenu(false);
    }

    const _mobileMenu = () => (
        <ul className='absolute cursor-pointer rounded-md right-2 bottom-[100px] py-2 text-lg bg-white w-[300px] text-slate-700 animation-fadeleft shadow-lg z-[5]'>
            <li className='flex items-center px-5 hover:bg-slate-100 py-2 transition-grl' >
                <IoMdInformationCircleOutline className='text-xl'/> <span className='ml-5'>Detalles de la reunion</span>
            </li>
            <li onClick={()=> getLink()} className='flex items-center px-5 hover:bg-slate-100 py-2 transition-grl' >
                <AiOutlineLink className='text-xl'/> <span className='ml-5'>Copiar link</span>
            </li>
            <li onClick={()=> sendEmail()} className='flex items-center px-5 hover:bg-slate-100 py-2 transition-grl' >
                <AiOutlineMail className='text-xl'/> <span className='ml-5'>Enviar email</span>
            </li>
            <li onClick={()=>{ toggleChat(); setShowMobileMenu(false); }} className='flex items-center px-5 hover:bg-slate-100 py-2 transition-grl' >
                <BsChatLeftText className='text-xl'/> <span className='ml-5'>Chat de la reunion</span>
            </li>
        </ul>
    )

    return(
        <section className="relative call-controls h-[100px] text-white flex justify-between items-center px-5">
            <h2 className="text-xl"><Clock format={'HH:mm A'} ticking={true} /> <span className='hidden sm:inline-block'>| {room.name}</span></h2>
            <div className="flex items-center gap-3 relative">
                {showShareMenu ? _shareMenu() : null}
                <button onClick={()=>{ setShowShareMenu(!showShareMenu) }} className={`w-[40px] hidden sm:flex relative transition-grl h-[40px] hover:bg-slate-600 rounded-full bg-[#3c4043] text-xl items-center justify-center`}>
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
                <button className={`w-[40px] hidden relative transition-grl h-[40px] rounded-full text-xl sm:flex items-center justify-center`}>
                    <FiUsers/>
                    <p className="absolute text-sm right-0 top-0 font-semibold bg-[#56585a] h-[18px] w-[18px] rounded-full">{participants}</p>
                </button>
                <button onClick={()=>{ toggleChat() }} className={`w-[40px] relative hidden transition-grl h-[40px] rounded-full text-xl sm:flex items-center justify-center`}>
                    <BsChatLeftText/>
                </button>
                <button onClick={()=>{
                    setShowMobileMenu(!showMobileMenu)
                }} className={`w-[40px] relative flex transition-grl h-[40px] rounded-full text-xl sm:hidden items-center justify-center`}>
                    {showMobileMenu ? <IoIosArrowDown/>:<IoIosArrowUp/>}
                </button>
            </div>
            {showMobileMenu ? _mobileMenu() : null}
        </section>
    )
}
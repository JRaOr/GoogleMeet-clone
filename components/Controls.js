import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsChatLeftText} from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function Controls( { room, toggleAudioButton, toggleVideoButton } ) {
    const count = 0
    const router = useRouter()
    return(
        <section className="relative call-controls h-[100px] text-white flex justify-between items-center px-5">
            <h2 className="font-semibold text-xl">{room.name}</h2>
            <div className="flex items-center gap-3 relative">
                {/* {showShareMenu ? _shareMenu() : null} */}
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
                    <p className="absolute text-sm right-0 top-0 font-semibold bg-[#56585a] h-[18px] w-[18px] rounded-full">{count}</p>
                </button>
                <button onClick={()=>{
                    
                }} className={`w-[40px] relative transition-grl h-[40px] rounded-full text-xl flex items-center justify-center`}>
                    <BsChatLeftText/>
                </button>
            </div>
        </section>
    )
}
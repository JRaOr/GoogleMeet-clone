import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react"
import Api from '../../util/Api';
import { BsFillMicMuteFill, BsFillMicFill, BsCameraVideoFill, BsCameraVideoOffFill, BsChatLeftText } from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShareAlt, AiOutlineLink, AiOutlineMail, AiOutlineClose, AiOutlineSend} from "react-icons/ai";
import { showEmailModal } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../components/Comments";
//Get server side props
export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id
        }
    }
}

export default function Room( { id } ) {
    const router = useRouter();
    const [room, setRoom] = useState(null);
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [connected, setConnected] = useState(false);
    const [count, setCount] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    async function getAccessToken(){
        if(localStorage.getItem('token')){
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/room/join/${id}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const responseroom = await Twilio.Video.connect(response.data.token);
            setRoom(responseroom);
        } else {
            router.push('/signin');
        }
    }

    useEffect(() => {
        if(room != null){
            console.log(room);
            room.participants.forEach(participantConnected);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.on('participantReconnecting', participantReconnecting);
            setConnected(true);
            updateParticipantCount();
        }
    }, [room])
    
    async function attachMiniVideo() {
        const minivideo = document.getElementById('minime');
        const track = await Twilio.Video.createLocalVideoTrack()
        if(minivideo.childNodes.length == 0){
            minivideo.appendChild(track.attach())
        }
    }

    useEffect(()=>{
        if(room != null && count > 1){
            attachMiniVideo();
        }
    },[count])

    function participantReconnecting(participant) {
        try {
            const participantElement = document.getElementById(`participant-info-${participant.sid}`);
            participantElement.style.zIndex = '2';
        } catch (error) {
            console.log(error);
        }
    }
    async function participantConnected (participant) {
        console.log(participant);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/user/profilePicture/${participant.identity}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const template = `<div id='participant-${participant.sid}' class="participant">
                        <div class="participant-info" id='participant-info-${participant.sid}'>
                            <img src="${response.data.avatar}" alt="">
                            <p>${participant.identity} connecting...</p>   
                        </div>
                            <div class="video"></div>
                            <p>${participant.identity}</p>
                        </div>`
        const container = document.getElementById('container');
        container.insertAdjacentHTML('beforeend', template)
    
        participant.tracks.forEach(localTrackPublication => {
        const {isSubscribed, track} = localTrackPublication
        if (isSubscribed) attachTrack(track)
        })
    
        participant.on('trackSubscribed', attachTrack)
        participant.on('trackUnsubscribed', track => track.detach())
        updateParticipantCount()
    }

    function updateParticipantCount () {
        if(room != null){
            setCount(room.participants.size + 1);
        }
    }

    function participantDisconnected (participant) {
        console.log(participant);
        const participantLeaving = document.getElementById(`participant-${participant.sid}`);
        participantLeaving.remove();
        setCount(room.participants.size + 1);
    }

    function attachTrack (track) {
        const container = document.getElementById('container');
        const video = container.querySelector(`.participant:last-child .video`)
        video.appendChild(track.attach())
    }

    useEffect(()=>{
        getAccessToken()
        addLocalVideo()
    }, [])

    async function addLocalVideo () {
        const localVideo = document.getElementById('local-video')
        const track = await Twilio.Video.createLocalVideoTrack()
        //I track child is null
        if(localVideo.childNodes.length == 0){
            localVideo.appendChild(track.attach())
        }
    }

    function disconnect() {
        if(room != null){
            const localVideo = document.getElementById('local-video')
            const minivideo = document.getElementById('minime')
            //remove childs of localVideo
            while(localVideo.firstChild){
                localVideo.removeChild(localVideo.firstChild);
            }
            //remove childs of minivideo
            if(minivideo != null)
                while(minivideo.firstChild){
                    minivideo.removeChild(minivideo.firstChild);
                }
            room.disconnect();
            router.push('/');
        }
    }
    const styles = {
        2 : 'relative h-full w-full flex items-center justify-center',
        3 : 'relative h-full w-full grid grid-cols-2 items-center justify-center gap-4 px-4',
        4 : 'relative h-full w-full grid grid-cols-2 grid-rows-2 items-center justify-center gap-4 px-4',
        5 : 'relative h-full w-full grid grid-cols-2 grid-rows-2 items-center justify-center gap-4 px-4',
        6 : 'relative h-full w-full grid grid-cols-3 grid-rows-2 items-center justify-center gap-4 px-4',
        7 : 'relative h-full w-full grid grid-cols-3 grid-rows-2 items-center justify-center gap-4 px-4',
        8 : 'relative h-full w-full grid grid-cols-3 grid-rows-3 items-center justify-center gap-4 px-4',
        9 : 'relative h-full w-full grid grid-cols-3 grid-rows-3 items-center justify-center gap-4 px-4',
        10 : 'relative h-full w-full grid grid-cols-3 grid-rows-3 items-center justify-center gap-4 px-4',
    }

    const _shareMenu = () => (
        <ul className="cursor-pointer z-10 absolute rounded-md overflow-hidden bottom-0 left-0 bg-white text-slate-800 text-md flex flex-col w-[125px]">
            <li onClick={()=>{
                const link = `https://meetclone.myowjourney.com/room/${id}`
                navigator.clipboard.writeText(link);
                setShowShareMenu(false)
            }} className="flex transition-grl items-center py-1 px-2 border-b-[1px] gap-2 hover:bg-slate-100">
                <AiOutlineLink/> Get Link
            </li>
            <li onClick={()=>{
                console.log('Sending email')
                dispatch(showEmailModal(`https://meetclone.myowjourney.com/room/${id}`))
                setShowShareMenu(false);
            }} className="flex transition-grl items-center py-1 px-2 border-b-[1px] gap-2 hover:bg-slate-100">
                <AiOutlineMail/> Send email
            </li>
        </ul>
    )
    const [showChat, setShowChat] = useState(false);

    function handleClose(){
        setShowChat(false);
    }

    return (
        <div className="h-full w-full bg-[#202124] text-white">
            <section className="main-content h-[92vh] flex relative">
                <div id='container' className={`${count > 1 ? styles[count]:'h-full w-full relative flex items-center justify-center'} ${showChat ? 'p-5':''}`}>
                    <div id='local-video' className={`${count > 1 ? 'hidden':'relative video-big'}`}>
                        {count > 0 && <p className="absolute bottom-5 left-6 font-semibold text-xl">Tu</p>}
                    </div>
                    {count > 1 && <div className="absolute h-[200px] w-[350px] border-sky-900 z-[4] right-2 bottom-0 border-2 rounded-md overflow-hidden">
                        <div id='minime' />
                    </div>}
                </div>
                <Comments user={user} show={showChat} handleClose={handleClose} room_name={id}/>
            </section>
            <section className="relative call-controls h-[8vh] text-white flex justify-between items-center px-5">
                <h2 className="font-semibold text-xl">{id}</h2>
                <div className="flex items-center gap-3 relative">
                    {showShareMenu ? _shareMenu() : null}
                    <button onClick={()=>{ setShowShareMenu(!showShareMenu) }} className={`w-[40px] relative transition-grl h-[40px] hover:bg-slate-600 rounded-full bg-[#3c4043] text-xl flex items-center justify-center`}>
                        <AiOutlineShareAlt/>
                    </button>
                    <button onClick={()=>{
                        setMicOn(!micOn)
                    }} className={`w-[40px] transition-grl h-[40px] rounded-full ${micOn ? 'bg-[#3c4043] hover:bg-slate-600' : 'bg-red-400'} text-xl flex items-center justify-center`}>
                        {micOn ?<BsFillMicFill/> : <BsFillMicMuteFill/>}
                    </button>
                    <button onClick={()=>{
                        setCameraOn(!cameraOn)
                    }} className={`w-[40px] transition-grl h-[40px] rounded-full ${cameraOn ? 'bg-[#3c4043] hover:bg-slate-600' : 'bg-red-400'} text-xl flex items-center justify-center`}>
                        {cameraOn ?<BsCameraVideoFill/>: <BsCameraVideoOffFill/>}
                    </button>
                    <button onClick={()=>{
                        disconnect()
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
                        setShowChat(!showChat)
                    }} className={`w-[40px] relative transition-grl h-[40px] rounded-full text-xl flex items-center justify-center`}>
                        <BsChatLeftText/>
                    </button>
                </div>
            </section>
        </div>
    )
}
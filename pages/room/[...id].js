import axios from "axios";
import { useEffect, useState } from "react";
import ConfigScreen from "../../components/ConfigScreen";
import RoomComponent from "../../components/RoomConponent";
import useDominantSpeaker from "../../hooks/useDominantSpeaker";
import useLocalTracks from "../../hooks/useLocalTracks";
import useParticipants from "../../hooks/useParticipants";
import useRoom from "../../hooks/useRoom";
import useRoomState from "../../hooks/useRoomState";
import RoomContainer from "../../components/RoomContainer";
import Controls from "../../components/Controls";
import useLocalVideoToggle from "../../hooks/useLocalVideoToggle";
import useLocalAudioToggle from "../../hooks/useLocalAudioToggle";
import { BsFillMicFill, BsFillMicMuteFill, BsCameraVideoFill, BsCameraVideoOffFill, BsChatLeftText} from 'react-icons/bs';
import Comments from "../../components/Comments";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id
        }
    }
}

export default function Room({ id }) {
    const { localTracks, getLocalAudioTrack, getLocalVideoTrack, removeLocalAudioTrack, removeLocalVideoTrack } = useLocalTracks();
    const { room, isConnecting, connect } = useRoom(localTracks, ()=>{
        console.error("Could not connect to room");
    }, {})
    const roomState = useRoomState(room);
    const dominantSpeaker = useDominantSpeaker(room);
    const participants = useParticipants(room);
    const videoTrack = localTracks.find(
        track => !track.name.includes("screen") && track.kind === "video"
    )
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle( room, localTracks, getLocalVideoTrack, removeLocalVideoTrack)
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle( localTracks )
    const [showChat, setShowChat] = useState(true)
    const user = useSelector(state => state.user)

    const toggleVideoButton = () => (
        <button onClick={()=>{
            toggleVideoEnabled()
        }} className={`w-[40px] text-white transition-grl h-[40px] rounded-full ${isVideoEnabled ? 'bg-[#3c4043] hover:bg-slate-600' : 'bg-[#ea4335]'} text-xl flex items-center justify-center`}>
            {isVideoEnabled ?<BsCameraVideoFill/>: <BsCameraVideoOffFill/>}
        </button>
    )

    const toggleAudioButton = () => (
        <button onClick={()=>{
            toggleAudioEnabled()
        }} className={`w-[40px] text-white transition-grl h-[40px] rounded-full ${isAudioEnabled ? 'bg-[#3c4043] hover:bg-slate-600' : 'bg-[#ea4335]'} text-xl flex items-center justify-center`}>
            {isAudioEnabled ?<BsFillMicFill/> : <BsFillMicMuteFill/>}
        </button>
    )

    useEffect(() => {
        getLocalVideoTrack()
        getLocalAudioTrack()
    }, [])

    useEffect(() => {
        console.log('participants:', participants)
    }, [participants])

    useEffect(() => {
        console.log('Room:', room)
    }, [room?.participants])
    async function joinRoom() {
        console.log('Joining room...');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/room/join/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        connect(response.data.token);
    }

    const handleClose = () => {
        setShowChat(false)
    }

    const toggleChat = () => {
        setShowChat(!showChat)
    }

    return (
        <>
            {roomState === 'disconnected' ? 
                <ConfigScreen localTracks={localTracks} toggleAudioButton={toggleAudioButton} toggleVideoButton={toggleVideoButton} joinRoom={joinRoom} track={videoTrack} isLocal/>
                :
                <RoomContainer>
                    <div className="h-full flex">
                        <RoomComponent showChat={showChat} user={user} track={videoTrack} participants={participants} room={room}/>
                        <Comments show={showChat} handleClose={handleClose} user={user} room_name={room.name}/>
                    </div>
                    <Controls participants={participants.length + 1} toggleChat={toggleChat} toggleAudioButton={toggleAudioButton} toggleVideoButton={toggleVideoButton} room={room}/>
                </RoomContainer >
            }
        </>
    )
}
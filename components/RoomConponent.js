import { useEffect, useRef } from 'react';
import TrackVideoParticipant from './TrackVideoParticipant';
export default function RoomComponent( { room, participants, track, user, showChat} ) {
    const videoRef = useRef(null);
    useEffect(() => {
        if(track) {
            const element = videoRef.current
            element.muted = true
            track.attach(element)
            return () => {
                track.detach(element)
                element.srcObject = null
            }
        }
    }, [track])

    const _videoTrack = () => (
        <>
            { track ? <video className="h-[100%] object-cover" ref={videoRef}/> :
            <div className="w-[100%] h-[100%] flex items-center justify-center">
                <img src={user.avatar ? user.avatar : '/media/profile.png'} className="w-[150px] h-[150px] object-cover rounded-full"/>
            </div>}
        </>
    )

    if(participants.length === 0){
        return(
            <section className={`w-full flex items-center justify-center ${showChat && 'p-5'}`}>
                {_videoTrack()}
            </section>
        )
    }
    return(
        <div className={`participants-grid relative participants-${participants.length}`}>
            {participants.map((participant, index)=> {
                return(
                    <TrackVideoParticipant key={`participant-box-${participant.sid}`} participant={participant} index={index}/>
                )
            })}
            {participants.length > 0 ? <div className=' h-44 w-72 border-2 border-[#31373f] bg-[#292b2e] absolute right-5 rounded-md overflow-hidden bottom-5 z-[2]'>{_videoTrack()}</div> : null}
        </div>
    )
}
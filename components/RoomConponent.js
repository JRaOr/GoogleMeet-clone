import { useEffect, useRef } from 'react';
import MultipleParticipants from './MultipleParticipants';
import TrackVideoParticipant from './TrackVideoParticipant';
export default function RoomComponent( { room, participants, track, user, showChat, dominantSpeaker} ) {
    const videoRef = useRef(null);
    const people = participants.length + 1
    // const people = 9
    
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
            { track ? <video className="h-[100%] object-cover rounded-md" ref={videoRef}/> :
            <div className="w-[100%] h-[100%] flex items-center justify-center">
                <img src={user.avatar ? user.avatar : '/media/profile.png'} className="w-[150px] h-[150px] object-cover rounded-full"/>
            </div>}
        </>
    )

    if(participants.length === 0){
        return(
            <section className={`w-full flex items-center max-w-[1440px] p-5 md:h-full justify-center ${showChat ? 'p-5':'md:p-0'}`}>
                {_videoTrack()}
            </section>
        )
    }
    return(
        <div className={`participants-grid gap-2 mx-auto ${people < 7 ? 'max-w-[1050px]':'max-w-[1545px]'} relative ${people < 3 ? `participants-${people}`: people < 7 ? 'participants-3' : 'participants-4'}`}>
            {participants.map((participant, index)=> {
                if( people > 9 && index > 6 ) return null
                return(
                    <TrackVideoParticipant dominant={dominantSpeaker?.sid === participant.sid} key={`participant-box-${participant.sid}`} participant={participant} index={index}/>
                )
            })}
            {people > 9 && <MultipleParticipants participants={participants.slice(7, participants.length)}/>}
            {participants.length > 0 ? <div className='rounded-md overflow-hidden bg-[#36373a] flex items-center justify-center h-full w-full relative max-w-[504px] max-h-[283px] my-auto mx-auto'>
                {_videoTrack()}
                <p className="z-[3] absolute text-white text-xl left-2 bottom-2">Tú</p>
            </div> : null}
        </div>
    )
}
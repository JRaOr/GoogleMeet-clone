import { useEffect } from 'react';
import TrackVideoParticipant from './TrackVideoParticipant';
export default function RoomComponent( { room, participants } ) {
    if(participants.length === 0) return null;
    return(
        <div className={`participants-grid  participants-${participants.length}`}>
            {participants.map((participant, index)=> {
                return(
                    <TrackVideoParticipant key={`participant-box-${participant.sid}`} participant={participant} index={index}/>
                )
            })}
        </div>
    )
}
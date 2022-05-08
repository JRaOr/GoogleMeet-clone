import { useEffect, useState } from "react";
import useDominantSpeaker from "../useDominantSpeaker";

export default function useParticipants(room) {
    console.log('Start room:', room?.participants)
    const dominantSpeaker = useDominantSpeaker();
    const [participants, setParticipants] = useState(Array.from(room?.participants.values() ?? []));

    useEffect(() => {
        if (dominantSpeaker) {
            setParticipants(prevParticipants => [
                dominantSpeaker,
                ...prevParticipants.filter(participant => participant !== dominantSpeaker),
            ]);
        }
    }, [dominantSpeaker]);
    useEffect(() => {
        if(room){
            console.log('Room participants:', room.participants)
            const newParticipants = Array.from(room.participants.values())
            
            if(newParticipants.length !== participants.length){
                console.log('New participants:', newParticipants)
                setParticipants(newParticipants)
            }

            const participantConnected = (participant) => {
                console.log('participant connected:', participant)
                setParticipants(prevParticipants => [...prevParticipants, participant]);
            }
            const participantDisconnected = (participant) => {
                console.log('participant disconnected:', participant)
                setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
            }
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            return () => {
                room.off('participantConnected', participantConnected);
                room.off('participantDisconnected', participantDisconnected);
            };
        }
    }, [room]);
    return participants;
}
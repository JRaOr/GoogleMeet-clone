import { useEffect, useState } from "react";
import useDominantSpeaker from "../useDominantSpeaker";

export default function useParticipants(room) {
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
            const newParticipants = Array.from(room.participants.values())
            
            if(newParticipants.length !== participants.length){
                setParticipants(newParticipants)
            }

            const participantConnected = (participant) => {
                setParticipants(prevParticipants => [...prevParticipants, participant]);
            }
            const participantDisconnected = (participant) => {
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
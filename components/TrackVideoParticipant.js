import axios from "axios";
import { useEffect, useRef, useState } from "react"
import usePublications from "../hooks/usePublications";
import Publication from "./Publication";
const colors =[
    "#3c4043",
    "#ea4335",
    "#f8b62c",
    "#00a8ff",
    "#00c853",
    "#ffa400",
    "#ff5252",
    "#ff3b30",
    "#ff6d00",
    "#ffa000",
    "#ffd600",
    "#ffff00",
    "#ffd740",
    "#ffab40",
]
export default function TrackVideoParticipant({ participant, index, onlyAudio }) {
    const publications = usePublications(participant);
    const [avatar, setAvatar] = useState(null);

    async function getUserProfile() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/user/profilePicture/${participant.identity}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setAvatar(response.data.avatar);
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    useEffect(() => {
        const element = document.getElementById(`img-participant-${participant.sid}`);
        if (element !== null) {
            element.style.borderColor = colors[index];
        }
    }, [])

    if (onlyAudio) {
        return (
            <>
                {publications.map((publication, index) => (
                    <Publication key={`publication-onlyaudio-${index}`} publication={publication} onlyAudio={onlyAudio}/>
                ))}
            </>
        )
    }
    return (
        <div className="rounded-md border-2 border-transparent overflow-hidden bg-[#36373a] flex items-center justify-center h-full w-full relative max-w-[504px] max-h-[283px] my-auto mx-auto min-h-[250px]">
            <p className="z-[3] absolute text-white text-xl left-2 bottom-2">{participant.identity}</p>
            {publications.map((publication, index)=> (
                <Publication key={`publication-${index}`} publication={publication}/>
            ))}
            <img id={`img-participant-${participant.sid}`} className={`h-full w-full z-[1] max-w-[150px] max-h-[150px] rounded-full absolute`} src={avatar ? avatar:'/media/profile.png'}/>    
        </div>
    )
}

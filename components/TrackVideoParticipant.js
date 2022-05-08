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
export default function TrackVideoParticipant({ participant, index }) {
    const conatinerRef = useRef(null);
    const contentRef = useRef(null);
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
        if (conatinerRef.current !== null) {
            console.log("containerRef:", conatinerRef.current.getBoundingClientRect());
        }
        const element = document.getElementById(`img-participant-${participant.sid}`);
        if (element !== null) {
            element.style.borderColor = colors[index];
        }
    }, [])
    
    return (
        <div ref={conatinerRef} className="h-full w-full overflow-hidden p-2">
            <div className="border-2 rounded-xl border-[#000000] bg-[#18191b] flex items-center justify-center h-full w-full relative" ref={contentRef}>
                <p className="z-[3] absolute text-white text-4xl font-semibold left-5 bottom-5">{participant.identity}</p>
                {publications.map((publication, index)=> (
                    <Publication key={`publication-${index}`} publication={publication}/>
                ))}
                <img id={`img-participant-${participant.sid}`} className={`h-full w-full z-[1] max-w-[150px] max-h-[150px] rounded-full absolute border-4`} src={avatar ? avatar:'/media/profile.png'}/>    
            </div>
        </div>
    )
}

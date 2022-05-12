import axios from "axios"
import { useEffect, useState } from "react"
import TrackVideoParticipant from "./TrackVideoParticipant"

export default function MultipleParticipants({ participants }) {
    const [user1, setUser1] = useState(null)
    const [user2, setUser2] = useState(null)
    const [publications, setPublications] = useState([])
    useEffect(()=>{
        getUser1Picture()
        getUser2Picture()
    }, [participants])
    
    const getUser1Picture = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/user/profilePicture/${participants[0].identity}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser1(response.data.avatar);
    }
    const getUser2Picture = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/user/profilePicture/${participants[1].identity}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser2(response.data.avatar);
    }
    return(
        <div className="h-full w-full max-h-[283px] max-w-[504px] bg-[#36373a] rounded-md flex items-center justify-center relative">
            <div className="flex items-center justify-center relative">
                <div src="/media/profile.png" className="z-[1] w-[100px] h-[100px] object-contain rounded-full bg-emerald-500 absolute left-[-15px] border-4 border-[#36373a]">
                    {user1 ? <img src={user1} className="object-contain rounded-full"/>:null}
                </div>
                <div src="/media/signin-bg.jpg" className="z-[1] w-[100px] h-[100px] rounded-full bg-pink-600 absolute  right-[-15px] border-4 border-[#36373a]">
                    {user2 ? <img src={user2} className="object-contain rounded-full"/>:null}
                </div>
            </div>
            <p className="text-white absolute bottom-10 font-semibold">Otros {participants.length}</p>
            {participants.map((participant, index)=> (
                <TrackVideoParticipant onlyAudio={true} key={`participant-onlyaudio-${index}`} participant={participant} index={index}/>
            ))}
        </div>
    )
}
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { db } from "../util/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
export default function Comments( { show, handleClose, room_name, user }){
    const [animationchat, setAnimationchat] = useState(false);
    const [comment, setComment] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        if(!show){
            setAnimationchat(false);
        }
    },[show])

    async function getFirestoreData(){
        const chatrooms = collection(db, "chatrooms");
        console.log(room_name)
        const q = query(chatrooms, where("room_name", "==", room_name[0]));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.size)
        if(querySnapshot.size === 0){
            await setDoc(doc(db, 'chatrooms', room_name[0]), {
                room_name: room_name[0],
                messages: []
            });
        }
        const unSub = onSnapshot(doc(db, 'chatrooms', room_name[0]), (doc) => {
            console.log('Current data', doc.data())
            setMessages(doc.data().messages)
        })
    }

    useEffect(()=>{
        getFirestoreData();
    },[])

    async function sendMessage(message){
        const updateRef = doc(db, 'chatrooms', room_name[0]);
        const response = await getDoc(updateRef);
        await updateDoc(updateRef, {
            messages: [...response.data().messages, {
                message: message,
                user: user.username,
                timestamp: new Date().getTime(),
                image: user.avatar
            }]
        });
        setComment('');
    }
    return (
        <>
            { show ?
                <section onAnimationEnd={()=>{
                    setAnimationchat(true)
                }} className="animation-box">
                    <div className="h-full w-full bg-white rounded-md shadow-xl p-5">
                        {animationchat &&     
                            <div className="flex relative h-full items-center flex-col w-full animation-fadeleft text-slate-800">
                                <div className="flex w-full justify-between items-center text-xl">
                                    <h3 className="">Mensajes en la llamada</h3>
                                    <AiOutlineClose className="cursor-pointer" onClick={()=>{
                                        handleClose()
                                    }}/>
                                </div>
                                {messages.length === 0 && <p className="w-full bg-slate-200 p-2 text-sm rounded-lg mt-5">Los mensajes solo pueden ser vistos por personas en la llamada y son eliminados cuando la llamada termina.</p>}
                                <div className="w-full absolute bottom-0 pt-5 flex flex-col">
                                    <div className="w-full max-h-[70vh] mb-5 overflow-scroll hide-scroll">
                                        {messages.map((message, index)=>{
                                            let userowns = message.user === user.username;
                                            return (
                                                <div key={`message-${room_name[0]}-${index}`} className={`w-full flex items-end ${userowns ? 'flex-row-reverse':'' }`}>
                                                    {(!userowns && messages[index - 1]?.user != message.user)  && <img src={message?.image ? message.image : ''} alt="avatar" className="rounded-full w-12 h-12 mr-2 bg-blue-300"/>}
                                                    <p className={`text-sm mt-2 py-2 px-3 rounded-md ${!(!userowns && messages[index - 1]?.user != message.user) ? 'ml-14':''} ${userowns ? 'bg-gray-900':'bg-slate-600'}  text-white`}>{!userowns && `${message.user}:`} {message.message}</p>
                                                </div>
                                        )})}
                                    </div>
                                    <div className="flex p-2 grow-[2] bg-slate-200 rounded-md">
                                        <textarea value={comment} onChange={(e)=>{ setComment(e.target.value) }} className="grow bg-transparent outline-none hide-scroll " placeholder="message"/>
                                        <div className={`w-[40px] text-2xl cursor-pointer h-[100%] flex items-center justify-center ${comment != '' ? 'text-sky-500' : 'text-slate-600'}`}>
                                            <AiOutlineSend onClick={()=>{
                                                sendMessage(comment)
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </section>
            :null}
        </>
    )
}
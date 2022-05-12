import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { db } from "../util/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { BsEmojiLaughing } from "react-icons/bs";
import dynamic from 'next/dynamic';
import ReactTooltip from "react-tooltip";
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function Comments( { show, handleClose, room_name, user }){
    const [animationchat, setAnimationchat] = useState(false);
    const [comment, setComment] = useState('');
    const [messages, setMessages] = useState([]);
    const dummy = useRef(null);
    const [showEmojis, setShowEmojis] = useState(false);
    useEffect(()=>{
        if(!show){
            setAnimationchat(false);
        }
    },[show])

    async function getFirestoreData(){
        const chatrooms = collection(db, "chatrooms");
        const q = query(chatrooms, where("room_name", "==", room_name[0]));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size === 0){
            await setDoc(doc(db, 'chatrooms', room_name[0]), {
                room_name: room_name[0],
                messages: []
            });
        }
        const unSub = onSnapshot(doc(db, 'chatrooms', room_name[0]), (doc) => {
            setMessages(doc.data().messages)
        })
    }

    useEffect(()=>{
        getFirestoreData();
    },[])

    useEffect(()=>{
        if(dummy.current !== null)
            dummy.current.scrollIntoView({ behavior: 'smooth' });
    },[messages])

    async function sendMessage(event){
        event.preventDefault();
        const updateRef = doc(db, 'chatrooms', room_name[0]);
        const response = await getDoc(updateRef);
        await updateDoc(updateRef, {
            messages: [...response.data().messages, {
                message: event.target.comment.value,
                user: user.username,
                timestamp: new Date().getTime(),
                image: user.avatar
            }]
        });
        setShowEmojis(false);
        dummy.current.scrollIntoView({ behavior: 'smooth' });
        setComment('');
    }

    function onEmojiClick(event, emojiObject){
        setComment(comment + emojiObject.emoji);
    }

    function getDate(timestamp){
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
    }

    return (
        <>
            { show ?
                <section onAnimationEnd={()=>{
                    setAnimationchat(true)
                }} className="animation-box absolute right-0 sm:relative z-[2]">
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
                                    <div className="w-full max-h-[70vh] mb-5 overflow-scroll hide-scroll relative">
                                        {messages.map((message, index)=>{
                                            let userowns = message.user === user.username;
                                            return (
                                                <div key={`message-${room_name[0]}-${index}`} className={`w-full flex items-end ${userowns ? 'flex-row-reverse':'' }`}>
                                                    {(!userowns && messages[index - 1]?.user != message.user)  && 
                                                        <> 
                                                            <img data-tip data-for={`image-tool-${index}`} src={message?.image ? message.image : '/media/profile.png'} className="rounded-full w-12 h-12 mr-2 bg-blue-300"/>
                                                            <ReactTooltip place="bottom" type="dark" effect="solid" id={`image-tool-${index}`}>
                                                                <span>{message.user}, {getDate(message.timestamp)}</span>
                                                            </ReactTooltip>
                                                        </>}
                                                    <p data-tip data-for={`comment-tool-${index}`} className={`text-sm mt-2 py-2 px-3 rounded-md ${!(!userowns && messages[index - 1]?.user != message.user) ? 'ml-14':''} ${userowns ? 'bg-gray-900':'bg-slate-600'}  text-white`}>{message.message}</p>
                                                    <ReactTooltip place={userowns ? "left" : "right"} type="dark" effect="solid" id={`comment-tool-${index}`}>
                                                        <span>{getDate(message.timestamp)}</span>
                                                    </ReactTooltip>
                                                </div>
                                        )})}
                                        <div ref={dummy}/>
                                    </div>
                                    <form onSubmit={sendMessage} className="flex p-2 grow-[2] bg-slate-200 rounded-md relative">
                                        {showEmojis && 
                                                <div className='w-[278px] h-[318px] -top-[330px] left-0 absolute'>
                                                    <Picker
                                                        onEmojiClick={onEmojiClick}
                                                        native
                                                    />
                                                </div>}
                                        <div onClick={()=>{
                                            setShowEmojis(!showEmojis)
                                        }} className="flex items-center justify-center mr-2 cursor-pointer hover:text-purple-600 transition-grl">
                                            <BsEmojiLaughing/>
                                        </div>
                                        <input type='text' value={comment} onChange={e => setComment(e.target.value)} name='comment' className="grow bg-transparent outline-none hide-scroll " placeholder="message"/>
                                        <button disabled={comment.length === 0} type="submit" className={`w-[40px] text-2xl cursor-pointer my-auto flex items-center justify-center ${comment != '' ? 'text-sky-500' : 'text-slate-600'}`}>
                                            <AiOutlineSend/>
                                        </button>
                                    </form>
                                </div>
                            </div>}
                    </div>
                </section>
            :null}
        </>
    )
}
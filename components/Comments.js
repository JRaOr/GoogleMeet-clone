import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
export default function Comments( { show, handleClose, }){
    const [animationchat, setAnimationchat] = useState(false);
    const [comment, setComment] = useState('');
    useEffect(()=>{
        if(!show){
            setAnimationchat(false);
        }
    },[show])
    return (
        <>
            { show ?
                <section onAnimationEnd={()=>{
                    setAnimationchat(true)
                }} className="animation-box">
                    <div className="h-full w-full bg-white rounded-md shadow-xl p-5">
                        {animationchat &&     
                            <div className="flex items-center flex-col h-full w-full animation-fadeleft text-slate-800">
                                <div className="flex w-full justify-between items-center text-xl">
                                    <h3 className="">Mensajes en la llamada</h3>
                                    <AiOutlineClose className="cursor-pointer" onClick={()=>{
                                        handleClose()
                                    }}/>
                                </div>
                                <p className="w-full bg-slate-200 p-2 text-sm rounded-lg mt-5">Los mensajes solo pueden ser vistos por personas en la llamada y son eliminados cuando la llamada termina.</p>
                                <div className="w-full pt-5 grow flex flex-col">
                                    <div className="w-full grow">
                                    </div>
                                    <div className="flex p-2 bg-slate-200 rounded-md">
                                        <textarea value={comment} onChange={(e)=>{ setComment(e.target.value) }} className="grow bg-transparent outline-none hide-scroll " placeholder="message"/>
                                        <div className={`w-[40px] text-2xl cursor-pointer h-[100%] flex items-center justify-center ${comment != '' ? 'text-sky-500' : 'text-slate-600'}`}>
                                            <AiOutlineSend/>
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
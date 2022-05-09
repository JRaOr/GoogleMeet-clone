import Link from "next/link"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { AiFillHome } from "react-icons/ai"
import useDevices from "../hooks/useDevices"
import useMediaStreamTrack from "../hooks/useMediaStreamtrack"
import { SELECTED_AUDIO_INPUT_KEY } from "../util/constants"
export default function ConfigScreen( { joinRoom, track, isLocal, priority, toggleAudioButton, toggleVideoButton, localTracks} ) {
    const videoRef = useRef(null)
    const { audioInputDevices } = useDevices();
    const user = useSelector(state => state.user)
    const localAudioTrack = localTracks.find(track => track.kind === 'audio');
    const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);
    const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

    console.log('localAudioInputDeviceId:', localAudioInputDeviceId)
    function replaceTrack(newDeviceId) {
        window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
        localAudioTrack?.restart({ deviceId: { exact: newDeviceId } });
    }

    useEffect(() => {
        if(track) {
            const element = videoRef.current
            element.muted = true
            if (track.setPriority && priority) {
                track.setPriority(priority)
            }
            track.attach(element)
            return () => {
                track.detach(element)
                element.srcObject = null
                if(track.setPriority && priority) {
                    track.setPriority(null)
                }
            }
        }
    }, [track, priority])
    return(
        <div className="h-[100vh] w-[100vw] flex relative">
            <div className="relative h-[100vh] w-[60%] flex items-center justify-center py-[28vh] px-10">
                <div className="relative flex justify-center h-[100%] overflow-hidden w-[100%] bg-[#202124] rounded-xl">
                    
                    { track ? <video className="h-[100%] object-cover" ref={videoRef}/> :
                        <div className="w-[100%] h-[100%] flex items-center justify-center">
                            <img src={user.avatar} alt="avatar" className="w-[150px] h-[150px] object-cover rounded-full"/>
                        </div>}
                    <div className="absolute flex gap-5 bottom-2">
                        {toggleAudioButton()}
                        {toggleVideoButton()}
                    </div>
                </div>
            </div>
            <div className="flex flex-col grow items-center justify-center">
                <h1 className="font-semibold text-4xl py-5">Bienvenido {user.username}!</h1>
                <label className="text-lg my-2 ">Selecciona un dispositivo de audio:</label>
                <select className="w-[80%] border-2 border-gray-800 text-lg cursor-pointer" value={localAudioInputDeviceId || ''} onChange={(e) => { replaceTrack(e.target.value) }}>
                    {audioInputDevices.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
                    ))}
                </select>
                <p className="text-2xl py-5">No sabemos si hay alguien mas aqui!</p>
                <div className="flex gap-5 mt-5">
                    <button className="text-xl text-white font-semibold bg-teal-700  py-2 px-5 rounded-full" onClick={joinRoom}>Join Room</button>
                    <Link href='/'>
                        <button className="text-xl text-teal-700 font-semibold shadow-xl flex items-center justify-center gap-4 py-2 px-5 rounded-full">
                            <AiFillHome/> Inicio
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
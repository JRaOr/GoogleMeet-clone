import { useEffect, useRef } from "react";

export default function VideoTrack({ track }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if(track) {
            const element = videoRef.current
            element.muted = true
            track.attach(element)
            return () => {
                track.detach(element)
                element.srcObject = null
            }
        }
    }, [track])
    return (
        <video key={`video-track-${track.id}`} className="center-video z-[2]" ref={videoRef}/>            
    )
}
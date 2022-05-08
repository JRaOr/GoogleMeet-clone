import { useEffect, useRef } from "react";

export default function AudioTrack({ track }) {
    const audioRef = useRef();
    useEffect(() => {
        if(track) {
            audioRef.current = track.attach();
            audioRef.current.setAttribute('data-cy-audio-track-name', track.name);
            audioRef.current.setAttribute('key', `audio-track-${track.name}`);
            document.body.appendChild(audioRef.current);
            return () => {
                track.detach().forEach(element => {
                    element.remove();
                    element.srcObject = null;
                })};
        }
    }, [track]);

    return null;
}
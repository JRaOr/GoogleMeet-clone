import { useCallback, useEffect, useRef, useState } from "react";
import Video from "twilio-video";
export default function useRoom(localTracks, onError, options) {
    const [room, setRoom] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    }, [options])

    const connect = useCallback(
        token => {
            setIsConnecting(true);
            return Video.connect(token, { ...optionsRef.current, tracks: localTracks }).then(
                newRoom => {
                    setRoom(newRoom);
                    const disconnect = () => newRoom.disconnect();
                    newRoom.setMaxListeners(15);
                    newRoom.once('disconnected', () => {
                        setTimeout(() => setRoom(null));
                        window.removeEventListener('beforeunload', disconnect);
                    })
                    newRoom.localParticipant.videoTracks.forEach(publication => {
                        publication.setPriority('low');
                    });
                    setIsConnecting(false);

                    window.addEventListener('beforeunload', disconnect);
                }, error =>{
                    setIsConnecting(false);
                    onError(error);
                }
            )
        }, [localTracks, onError]
    )

    return { room, isConnecting, connect };
}

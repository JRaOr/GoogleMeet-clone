import useTrack from "../hooks/useTrack";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";

export default function Publication({ publication, onlyAudio }) {
    const track = useTrack(publication);
    if(!track) return null

    switch (track.kind) {
        case "video":
            return onlyAudio ? <VideoTrack track={track} />:null;
        case "audio":
            return <AudioTrack onlyAudio={onlyAudio} track={track}/>
        default:
            return null
    }
}
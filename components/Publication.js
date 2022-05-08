import useTrack from "../hooks/useTrack";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";

export default function Publication({ publication }) {
    const track = useTrack(publication);
    if(!track) return null

    switch (track.kind) {
        case "video":
            return <VideoTrack track={track} />;
        case "audio":
            return <AudioTrack track={track}/>
        default:
            return null
    }
}
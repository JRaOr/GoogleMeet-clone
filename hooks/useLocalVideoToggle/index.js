import { useCallback, useState } from 'react';
export default function useLocalVideoToggle(room, localTracks,  getLocalVideoTrack, removeLocalVideoTrack) {
    const localParticipant = room?.localParticipant;
    const videoTrack = localTracks.find(
        track => !track.name.includes('screen') && track.kind === 'video'
    )
    const [isPublishing, setIsPublishing] = useState(false);

    const toggleVideoEnabled = useCallback(() => {
        console.log('toggleVideoEnabled');
        if(!isPublishing){
            if (videoTrack) {
                const locacalTrackPublication = localParticipant?.unpublishTrack(videoTrack);
                localParticipant?.emit('trackUnpublished', locacalTrackPublication);
                removeLocalVideoTrack();
            } else {
                setIsPublishing(true);
                getLocalVideoTrack()
                    .then(track => localParticipant?.publishTrack(track), { priority: 'low' })
                    .catch(err => console.log('Error publishing track: ', err))
                    .finally(() => setIsPublishing(false));
            }
        }
    }, [videoTrack, localParticipant, getLocalVideoTrack, isPublishing, removeLocalVideoTrack]);
    return [!!videoTrack, toggleVideoEnabled];
}
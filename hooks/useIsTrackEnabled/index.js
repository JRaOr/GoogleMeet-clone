import { useState, useEffect } from 'react';
import { LocalAudioTrack, LocalVideoTrack, RemoteAudioTrack, RemoteVideoTrack } from 'twilio-video';

export default function useIsTrackEnabled(track) {
    const [isEnabled, setIsEnabled] = useState(track ? track.isEnabled : false);
    useEffect(() => {
        if(track) {
            const setEnabled = () => setIsEnabled(true);
            const setDisabled = () => setIsEnabled(false);
            track.on('enabled', setEnabled);
            track.on('disabled', setDisabled);
            return () => {
                track.off('enabled', setEnabled);
                track.off('disabled', setDisabled);
            }
        }
    },[track])

    return isEnabled;
}
import { useCallback } from 'react';
import useIsTrackEnabled from '../useIsTrackEnabled';

export default function useLocalAudioToggle( localTracks ) {
    console.log('localTracks: ', localTracks);
    const audioTrack = localTracks?.find(track => track.kind === 'audio');
    const isEnabled = useIsTrackEnabled(audioTrack);

    const toggleAudioEnabled = useCallback(() => {
        if (audioTrack) {
            audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
        }
    }, [audioTrack]);

    return [isEnabled, toggleAudioEnabled];
}

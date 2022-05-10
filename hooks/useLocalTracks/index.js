import { useCallback, useState } from "react";
import Video from 'twilio-video';
import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from "../../util/constants";
import { getDeviceInfo } from "../../util/functions";
export default function useLocalTracks() {
    const [audioTrack, setAudioTrack] = useState();
    const [videoTrack, setVideoTrack] = useState();
    const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);
    
    const getLocalAudioTrack = useCallback((deviceId) => {
        console.log('Getting local audio track...');
        const options = {}
        if(deviceId) {
            options.deviceId = { exact: deviceId };
        }
        return Video.createLocalAudioTrack(options).then(track => {
            setAudioTrack(track);
            return track;
        });
    }, []);

    const getLocalVideoTrack = useCallback( async () =>{
        console.log('Getting local video track...');
        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
        const { videoInputDevices } = await getDeviceInfo();
        const hasSelectedVideoDevice = videoInputDevices.some(device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId);
        const options = {
            ...DEFAULT_VIDEO_CONSTRAINTS,
            name: `camera-${Date.now()}`,
            ...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId } })
        };
        return Video.createLocalVideoTrack(options).then(track => {
            setVideoTrack(track);
            return track;
        });
    }, []);

    const removeLocalAudioTrack = useCallback(() => {
        if (audioTrack) {
            audioTrack.stop();
            setAudioTrack(undefined);
        }
    }, [audioTrack]);
    
    const removeLocalVideoTrack = useCallback(() => {
        if (videoTrack) {
            videoTrack.stop();
            setVideoTrack(undefined);
        }
    }, [videoTrack]);

    const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined)
    
    return {
        localTracks,
        getLocalAudioTrack,
        getLocalVideoTrack,
        removeLocalAudioTrack,
        removeLocalVideoTrack,
    }
}
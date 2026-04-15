import { Alert, Button, Text, View } from "react-native";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setIsAudioActiveAsync,
  useAudioRecorderState,
  setAudioModeAsync,
  useAudioPlayer,
} from "expo-audio";
import { useEffect, useState } from "react";
export default function Index() {
  // Enable audio recording and playback
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  // Set the audio module to active so it can record and play audio
  const recorderState = useAudioRecorderState(audioRecorder);
  const [audio, setAudio] = useState<string | null>(null); // State to hold the URI of the recorded audio

  const player = useAudioPlayer(
    audio, // Set the URI of the audio player to the recorded audio file
  );
  const startRecording = async () => {
    await audioRecorder.prepareToRecordAsync(); // Prepare the audio recorder to start recording
    await audioRecorder.record(); // Start recording audio
  };
  const stopRecording = async () => {
    Alert.alert(`Recording stopped. Audio saved at: ${recorderState.url}`); // Alert the user with the URI of the recorded audio for debugging purposes
    await audioRecorder.stop(); // Stop recording audio
    const audio = audioRecorder.uri; // Get the URI of the recorded audio file
    setAudio(audio); // Update the state with the URI of the recorded audio
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync(); // Request permission to access the microphone
      if (!status.granted) {
        Alert.alert(
          "Permission to access the microphone is required to use this app.",
        ); // Alert the user if permission is not granted
      }
      setAudioModeAsync({
        playsInSilentMode: true, // Allow audio to play even when the device is in silent mode
        shouldPlayInBackground: true, // Allow audio to play in the background
        allowsRecording: true, // Allow recording audio
        interruptionMode: "doNotMix", // Do not mix audio with other apps
      }); // Set the audio module to active so it can record and play audio
    };
    // Request permissions when the component mounts
    requestPermissions();
  }, []);
  const handleAudioSubmission = async () => {
    if (recorderState.isRecording) {
      await stopRecording(); // Stop recording if it's currently recording
    }

    const audioUri = audio; // Get the URI of the recorded audio
    Alert.alert(`Audio URI: ${audioUri}`); // Log the audio URI for debugging purposes
    // Here you can implement the logic to submit the audio file to your backend or process it as needed
  };
  const handleReplayAudio = async () => {
    if (audio) {
      console.log(`Playing audio from URI: ${audio}`); // Log the audio URI for debugging purposes
      player.seekTo(0);
      player.play(); // Play the recorded audio
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title={recorderState.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recorderState.isRecording ? stopRecording : startRecording}
      />
      <Button title="replay" onPress={handleReplayAudio} />
      <Button title="Submit Audio" onPress={handleAudioSubmission} />
    </View>
  );
}

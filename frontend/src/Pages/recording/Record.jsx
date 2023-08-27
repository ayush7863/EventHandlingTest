import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Record.module.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const Record = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const openCamera = async () => {
      const useStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // console.log(useStream.getTracks())
      setStream(useStream);
      videoRef.current.srcObject = useStream;
    };
    openCamera();
  }, []);

  const startRecording = () => {
    alert("Recording Start");
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
      }
    };
    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    alert("Recording Stop");
    // mediaRecorder.stop();
    if (stream) {
      const tracks = stream.getTracks();
      console.log(tracks);
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };
  const saveRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);

    localStorage.setItem("recordingUrl", url);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorded-video.webm";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleLogOut = () => {
    if (stream) {
      const tracks = stream.getTracks();
      console.log(tracks);
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.menu_link}>
          <button onClick={startRecording}>Start</button>
          <button onClick={stopRecording}>Stop</button>
          <button onClick={saveRecording}>Download</button>
          <button onClick={handleLogOut}>LogOut</button>
        </div>
      </nav>
      <div className={styles.recordContainer}>
        <div>
          <h1>Video Conferencing</h1>
        </div>
        <div>
          <video ref={videoRef} id="userVideo" autoPlay playsInline></video>
        </div>
      </div>
    </div>
  );
};

export default Record;

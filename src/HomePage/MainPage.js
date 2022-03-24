import React, { useEffect, useRef, useState} from 'react'
import * as faceapi from 'face-api.js';



function MainPage() {

    const videoRef = useRef();
    const canvasRef = useRef();
    const videoHeight = 380;
    const videoWidth = 360;
    
  const [initializing, setInitializing] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
          const MODEL_URL = process.env.PUBLIC_URL + '/models';
          setInitializing(true);
          Promise.all([
       
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
          ]).then(() => {
            startVideo();
            console.log(faceapi.nets);
          });
        }
        loadModels();
        }, []) 
    
        const startVideo = () =>{
            navigator.mediaDevices.getUserMedia({
                video: true
              }).then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
              }).catch((err) => {
                console.error(err);
              });
            
        };
  
        const handleVideoOnPlay = () => {
          setInterval(async () => {
            if (initializing) {
              setInitializing(false);
            }
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
             const displaySize = {
              width: videoWidth,
              height: videoHeight
            }

            faceapi.matchDimensions(canvasRef.current, displaySize);

            const detection = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const resizeDetections = faceapi.resizeResults(detection, displaySize);
            canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
            faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
            console.log(detection); 
          }, 180)
        }

  return (
      <div>
      <span>{initializing ? 'Initializing' : 'Ready'}</span>
      <div className="display-flex justify-content-center">
        <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
        <canvas ref={canvasRef} className="position-absolute"/>
        </div>
      </div>
  )
}

export default MainPage;
import {useEffect, useState, useRef} from 'react';

export default function AudioAnalyser ({audio}) {
  const audioData = useRef(null)
  const canvasRef = useRef(null)
  const requestRef = useRef();

  useEffect(() => {
    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const source = audioCtx.createMediaStreamSource(audio)
    source.connect(analyser)

    const tick = () => {
      analyser.getByteTimeDomainData(dataArray)
      audioData.current = dataArray
      draw()
      requestRef.current = requestAnimationFrame(tick)
    }

    requestRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(requestRef.current);
  }, [])

  

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return  
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.current.length;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData.current) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  return (
    <canvas width="300" height="300" ref={canvasRef} />
  )
}
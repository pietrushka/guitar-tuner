import React, {useEffect, useState} from 'react';

import AudioAnalyser from './AudioAnalyser';

function App() {
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const getAudio = async () => {
      navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia;
      const source =  await navigator.mediaDevices.getUserMedia({ video: false, audio: true })

      setAudio(source)
    }

    getAudio()
  }, [])

  return (
    <>
      {
        audio ? <AudioAnalyser audio={audio} /> : 'There is no audio'
      }
    </>
  )
}
  
export default App;


//   const autoCorrelate = ( buf, sampleRate ) => {
//         // Implements the ACF2+ algorithm
//         var SIZE = buf.length;
//         var rms = 0;

//         for (var i=0;i<SIZE;i++) {
//           var val = buf[i];
//           rms += val*val;
//         }
//         rms = Math.sqrt(rms/SIZE);
//         if (rms<0.01) // not enough signal
//           return -1;

//         var r1=0, r2=SIZE-1, thres=0.2;
//         for (var i=0; i<SIZE/2; i++)
//           if (Math.abs(buf[i])<thres) { r1=i; break; }
//         for (var i=1; i<SIZE/2; i++)
//           if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }

//         buf = buf.slice(r1,r2);
//         SIZE = buf.length;

//         var c = new Array(SIZE).fill(0);
//         for (var i=0; i<SIZE; i++)
//           for (var j=0; j<SIZE-i; j++)
//             c[i] = c[i] + buf[j]*buf[j+i];

//         var d=0; while (c[d]>c[d+1]) d++;
//         var maxval=-1, maxpos=-1;
//         for (var i=d; i<SIZE; i++) {
//           if (c[i] > maxval) {
//             maxval = c[i];
//             maxpos = i;
//           }
//         }
//         var T0 = maxpos;

//         var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
//         a = (x1 + x3 - 2*x2)/2;
//         b = (x3 - x1)/2;
//         if (a) T0 = T0 - b/(2*a);

//         return sampleRate/T0;
// }
  

  // const setup = async () => {
  //     const audioCtx = new AudioContext();

  //     navigator.getUserMedia = navigator.getUserMedia
  //                     || navigator.webkitGetUserMedia
  //                     || navigator.mozGetUserMedia;
  //     const source =  await navigator.mediaDevices.getUserMedia({ video:false, audio:true })
  //     const audio = audioCtx.createMediaStreamSource(source)

  //     // Connect it to the destination.
  //     const analyser = audioContext.createAnalyser();
  //     analyser.fftSize = 2048;
  //     audio.connect( analyser );

  //     const buflen = 2048;
  //     const buf = new Float32Array( buflen )

  //     analyser.getFloatTimeDomainData( buf )

  //     const ac = autoCorrelate(buf, audioContext.sampleRate)
  //   }


  // const audioCtx = new AudioContext();
  
  // navigator.getUserMedia = navigator.getUserMedia
  //                 || navigator.webkitGetUserMedia
  //                 || navigator.mozGetUserMedia;
  // const source =  await navigator.mediaDevices.getUserMedia({ video:false, audio:true })
  // const audio = audioCtx.createMediaStreamSource(source)
  
  // const analyser = audioCtx.createAnalyser();
  // analyser.fftSize = 32;
  // const bufferLength = analyser.frequencyBinCount
  // const dataArray = new Uint8Array(bufferLength);
  // analyser.getByteFrequencyData(dataArray)
  // audio.connect(analyser);
  // let frequencyData = analyser.connect(audioCtx.destination);
  // setData(frequencyData)

  // console.log(dataArray)      
  //let frequencyData.getByteTimeDomainData(dataArray);
  //audio.connect(analyser);
  //let frequencyData = new Uint8Array(analyser.frequencyBinCount);
  //analyser.getByteFrequencyData(frequencyData)
  //console.log({frequencyData})
  //console.log('audioCtx.sampleRate', audioCtx.sampleRate)
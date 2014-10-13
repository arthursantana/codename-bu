var loudness; // the cool variable we can use to check if someone is screaming their lungs out

var audioContext, micNode, bandPassFilterNode, analyserNode, processorNode; // webAudio context and nodes

var centerFreq, topFreq, bottomFreq; // frequency limits

// the good'ol' browser prefix dance!
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

// gets the average of an array (no kidding)
function getAverage(array) {
   var sum = 0;

   for (var i = 0; i < array.length; i++) {
      sum += array[i];
   }
   return (sum / array.length);
}

if (!navigator.getUserMedia) {
   console.log('Error: getUserMedia() not available.');
} else {
   navigator.getUserMedia({audio: true}, function(localMediaStream) {
      var min = 10;
      var max = 20;
      var array, average, l; // auxiliary variables

      bottomFreq = 88;
      topFreq = 440;
      centerFreq = (bottomFreq + topFreq)/2;

      audioContext = new AudioContext();

      micNode = audioContext.createMediaStreamSource(localMediaStream);
      bandPassFilterNode = audioContext.createBiquadFilter();
      analyserNode = audioContext.createAnalyser();
      processorNode = audioContext.createScriptProcessor(2048, 1, 0);

      analyserNode.smoothingTimeConstant = 0.3;
      analyserNode.fftSize = 1024;

      bandPassFilterNode.type = 'bandpass';
      bandPassFilterNode.frequency.value = centerFreq;
      bandPassFilterNode.Q.value = centerFreq / (topFreq - bottomFreq);

      array = new Uint8Array(analyserNode.frequencyBinCount);
      
      processorNode.onaudioprocess = function () {
         analyserNode.getByteFrequencyData(array);
         average = getAverage(array);

         l = (average-min)/max;

         if (l > 1)
            loudness = 1;
         else if (l > 0)
            loudness = l;
         else
            loudness = 0;
      };

      micNode.connect(bandPassFilterNode);
      bandPassFilterNode.connect(analyserNode);
      analyserNode.connect(processorNode);
   },
   function (e) {
      console.log('Error: ', e);
   });
}

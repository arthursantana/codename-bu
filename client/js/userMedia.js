var loudness; // the cool variable we can use to check if someone is screaming their lungs out

var audioContext, micNode, analyserNode, processorNode; // webAudio context and nodes

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

      audioContext = new AudioContext();

      micNode = audioContext.createMediaStreamSource(localMediaStream);
      analyserNode = audioContext.createAnalyser();
      processorNode = audioContext.createScriptProcessor(2048, 1, 0);

      array = new Uint8Array(analyserNode.frequencyBinCount);

      analyserNode.smoothingTimeConstant = 0.3;
      analyserNode.fftSize = 1024;
      
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

      micNode.connect(analyserNode);
      analyserNode.connect(processorNode);
   },
   function (e) {
      console.log('Error: ', e);
   });
}

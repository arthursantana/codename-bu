var volume;

// the good'ol' browser prefix dance!
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

// gets the average of an array (no kidding)
function getAverage(array) {
   var values = 0;
   var average;
   var length = array.length;
   for (var i = 0; i < length; i++) {
      values += array[i];
   }
   average = values / length;
   return average;
}

if (!navigator.getUserMedia) {
   console.log('Error: getUserMedia() not available.');
} else {
   navigator.getUserMedia({audio: true}, function(localMediaStream) {
      var average = 0;
      var max = 50;
      var aC = new AudioContext();
      var mic = aC.createMediaStreamSource(localMediaStream);
      var analyser = aC.createAnalyser();
      var processor = aC.createScriptProcessor(2048, 1, 1);
      analyser.smoothingTimeConstant = 0.3;
      analyser.fftSize = 1024;
      
      processor.onaudioprocess = function () {
         var array = new Uint8Array(analyser.frequencyBinCount);
         analyser.getByteFrequencyData(array);
         var average = getAverage(array);

         if (average > max) average = max;
         volume = average/max;
      };

      mic.connect(analyser);
      analyser.connect(processor);
   },
   function (e) {
      console.log('Error: ', e);
   });
}

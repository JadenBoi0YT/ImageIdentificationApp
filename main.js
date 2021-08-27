/*https://teachablemachine.withgoogle.com/models/[...]*/
var SpeechRecognition = window.webkitSpeechRecognition;

Webcam.set({width:350,
height:300,
image_format:'png',
png_quality:90});

camera = document.getElementById("Camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='CameraPreview' src='"+data_uri+"'>";
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_H2DhFgwx/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

function Check(){
    /*window.location="Load.html";*/
    img = document.getElementById("CameraPreview");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        var synth = window.speechSynthesis;
    speak_data = "Object is: " + results[0].label;
    nextSpeak_Data = "Acuracy is: " + results[0].confidence.toFixed(3);
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    var utterNextThis = new SpeechSynthesisUtterance(nextSpeak_Data);
    synth.speak(utterThis);
    synth.speak(utterNextThis);
    }
}
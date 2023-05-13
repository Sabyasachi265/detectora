function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("label").innerHTML = "status : detecting objects";
}

img="";
status_ ="";
objects = [];

function modelLoaded(){
    console.log("model is loaded");
    status_=true;
    object_detector.detect(img, gotResult);
}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status_!=""){
        for(i=0; i < objects.lenght; i++){
            document.getElementById("label").innerHTML = "Status : Objects Detected";
            fill("#92DB1A");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#1ADBBB");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
if(error){
    console.log(error);
}

else{
    console.log(results);
    objects=results;
}
}
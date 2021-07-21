objects = [];
video = "";
status = "";


function preload(){
    video = createVideo("video.mp4");
    video.hide();
}





function setup(){
    canvas = createCanvas(400,300);
    canvas.center()
    
}





function draw(){
    image(video,0,0,400,300);
    if (status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status_detected").innerHTML = "Status: Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "Number Of Objects Detected Are:" + objects.length;

            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+"" + "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

}






function gotResult(error , results){
if (error){
    console.error(error);
}
console.log(results);
objects = results;
}






function start(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status_detected").innerHTML = "status: detecting objects";
}






function modelLoaded(){
    console.log('Model is Loaded !');
    status = true;
    video.loop(1);
    video.speed(1);
    video.volume(1);
}
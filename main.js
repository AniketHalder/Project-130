Aint_my_fault="";
Harry_potter_theme_song="";

RightWristX = 0;
RightWristY = 0;

LeftWristX = 0;
LeftWristY = 0;

scoreleftWrist = 0;
scoreRightWrist = 0;

song_aint_my_fault = "";
song_harry_potter_theme = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Aint_my_fault = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#FF0000");
    stroke("#FF0000");

    song_aint_my_fault = Aint_my_fault.isPlaying();
    console.log("Ain't My Fault" + song_aint_my_fault);

    song_harry_potter_theme = Harry_potter_theme_song.isPlaying();
    console.log("Harry Potter Theme Song" + song_harry_potter_theme);

    if(scoreleftWrist > 0.2){
        circle(LeftWristX,LeftWristY,20);
        Harry_potter_theme_song.stop();
        if(song_aint_my_fault == false){
            Aint_my_fault.play();
        }
        else{
            console.log("Song Name: Ain't My Fault ");
            document.getElementById("song_id").innerHTML = "Song Name: Ain't My Fault";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20);
        Aint_my_fault.stop();
        if(song_harry_potter_theme == false){
            Harry_potter_theme_song.play();
        }
        else{
            console.log("Song Name: Ain't My Fault ");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+LeftWristX+" leftWrist_y = "+LeftWristY);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+RightWristX+" rightWrist_y = "+RightWristY);
    }
}
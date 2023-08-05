let img;
let detector;
function preload(){
  img = loadImage('');  
  detector = ml5.objectDetector('yolo');
  }
  
  function setup() {
    createCanvas(800, 800);
    image(img,0,0);
    detector.detect(img,gotDetections);
  
  }

function getimage(){
var src = document.getElementById('photo').getAttribute('src');
detector = ml5.objectDetector('yolo');
createCanvas(800, 800);
 img = loadImage(src, img => {
    image(img,0,0);
  },
    (event) => {
      fill("red")
      text("Error: The image could not be loaded.", 20, 40);
      console.log(event);
    }
  );
  detector.detect(img,gotDetections);
}
function gotDetections(error, result){
  if(error){
    console.log(error)
  }
  console.log(result)
  drawResults(result);
//     for (let i = 0 ; i< result.length; i++){
//    let object = result[i];
//    stroke(0,255,255);
//    strokeWeight(4);
//    noFill();
//    rect(object.x ,object.y,object.width,object.height);
//  }
}

function drawResults(results) {
   results.forEach((result) => {

       const r = Math.random()*256|0;
       const g = Math.random()*256|0;
       const b = Math.random()*256|0;

       stroke(0, 0, 0);
       strokeWeight(2);
       textSize(16);
       fill(r, g, b);
 text(`${result.label} (${result.confidence.toFixed(2)}%)`, result.x, result.y - 10);
 
       noFill();
       strokeWeight(3);
       stroke(r, g, b);
       rect(result.x, result.y, result.width, result.height);
   });
};
 
(() => {
    const width = 320;
    let height = 0;
    let streaming = false;
    let video = null;
    let canvas = null;
    let photo = null;
    let startbutton = null;
  
    function showViewLiveResultButton() {
      if (window.self !== window.top) {
        document.querySelector(".contentarea").remove();
        const button = document.createElement("button");
        button.textContent = "View live result of the example code above";
        document.body.append(button);
        button.addEventListener("click", () => window.open(location.href));
        return true;
      }
      return false;
    }
  
    function startup() {
      if (showViewLiveResultButton()) {
        return;
      }
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      photo = document.getElementById("photo");
      startbutton = document.getElementById("startbutton");
  
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
  
      video.addEventListener(
        "canplay",
        (ev) => {78
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
  
            if (isNaN(height)) {
              height = width / (4 / 3);
            }
  
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
          }
        },
        false,
      );
  
      startbutton.addEventListener(
        "click",
        (ev) => {
          takepicture();
          ev.preventDefault();
        },
        false,
      );
  
      clearphoto();
    }

    function clearphoto() {
      const context = canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    }

    function takepicture() {
      const context = canvas.getContext("2d");
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
  
        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
      } else {
        clearphoto();
      }
    }
    window.addEventListener("load", startup, false);
  })();
  
  function showCamera() {
    document.getElementById("contentarea").removeAttribute("hidden"); 
  }

 function hideCamera(){
    document.getElementById("contentarea").setAttribute("hidden",true); 
 }

 var loadFile = function(event) {
	var image = document.getElementById('photo');
	image.src = URL.createObjectURL(event.target.files[0]);
 };
  
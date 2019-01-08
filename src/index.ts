import { RearCameraController } from "./Modules/RearCameraController";


let constraints = {

    audio : false,
    video : {facingMode: "environment",  width: 640}

};

let controller = new RearCameraController.Camera(constraints);
let orientation_callback = new RearCameraController.CameraOrientation();
controller.get_stream();
controller.append_video();
window.addEventListener("orientationchange", orientation_callback.onOrientationChange.bind(orientation_callback));


if(window.innerHeight > window.innerWidth){
    controller.video.style.width = "auto";
    controller.video.style.height = "100%";
}
else {
    controller.video.style.width = "100%";
    controller.video.style.height = "auto";
}

orientation_callback.addListener({onOrientationChange : (event)=>{
    if(window.innerHeight > window.innerWidth){
        controller.video.style.width = "auto";
        controller.video.style.height = "100%";
    }
    else {
        controller.video.style.width = "100%";
        controller.video.style.height = "auto";
    }

}});



console.log(controller);

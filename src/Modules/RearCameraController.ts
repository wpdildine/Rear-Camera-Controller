import {EventCallback} from "./Events/EventCallback";
import {Orientation} from "./OrientationController/Orientation";

export module RearCameraController{

    export interface OrientationListener
    {

        onOrientationChange(event) : void;

    }
    export class Camera extends EventCallback implements OrientationListener
    {

        public video : HTMLVideoElement;
        public constraints: MediaStreamConstraints;

        constructor (constraints: MediaStreamConstraints, video?: HTMLVideoElement){

            super();
            this.video = this.create_video(video);
            this.constraints = constraints;

        }


        public get_stream = () => {

            navigator.mediaDevices.getUserMedia(this.constraints)
                .then(this.on_success).catch(this.on_error);

        };

        private create_video = (video) =>{

            let vid = video;
            if (typeof vid == "undefined"){

                vid = document.createElement("video");
                (vid as any).id  = "rear-camera";
                (vid as any).autoplay = true;
                (vid as any).muted = true;
                vid.setAttribute("playsinline", true)

            }

            return vid;

        };

        private on_success = (stream: MediaStream) =>{

            let track = stream.getVideoTracks();
            console.log('Got stream with constraints:', this.constraints);
            console.log('Using video device: ' + track[0].label);
            stream.oninactive = function() {
                console.log('Stream inactive');
            };
            this.video.srcObject = stream;

        };

        public onOrientationChange (event){

            switch(window.orientation) {
                case -90 || 90:
                    (this as any).postMessage('landscape');
                    break;
                default:
                    (this as any).postMessage('portrait');
                    break;
            }

        }

        private on_error = (error) =>{

            this.error_message('getUserMedia error: ' + error.name, error);

        };

        private error_message = (error: string, msg?: string) =>{

            if (typeof error !== 'undefined' && typeof msg !== 'undefined' ) {
                console.error(msg, error);
            }

            else if (typeof error !== 'undefined') {
                console.error(error);
            }

        };

        public append_video = () => {

            document.body.appendChild(this.video);

        }

    }

    export class CameraOrientation extends Orientation {

        constructor(){
            super();
        };

    }

     export class Controller{

        constructor (){

        }

    }

}

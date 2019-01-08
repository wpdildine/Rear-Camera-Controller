import {EventCallback} from "../Events/EventCallback"

    export enum OrientationScape
    {
        PORTRAIT_PRIMARY = 0,
        PORTRAIT_SECONDARY = 180,
        LANDSCAPE_PRIMARY = 90,
        LANDSCAPE_SECONDARY = -90
    }

    export class Orientation extends EventCallback
    {
        private static orientationscape: OrientationScape = OrientationScape.PORTRAIT_PRIMARY;


        private lastDeviceOrientationEvent: DeviceOrientationEvent;

        public constructor()
        {
            super();

            if(window.orientation)
            {
                Orientation.orientationscape = window.orientation as OrientationScape;
            }
        }

        public onDeviceRotation(event: DeviceOrientationEvent)
        {
            this.lastDeviceOrientationEvent = event;
        }

        public onOrientationChange(event): void
        {
            Orientation.orientationscape = (event.screen && event.screen.orientation) ? event.screen.orientation : window.orientation;

            // Invoke listeners
            this.invokeListeners("onOrientationChange", event);
        }

        public static getOrientationScape(): OrientationScape
        {
            return Orientation.orientationscape;
        }

        public static isPortrait(): boolean
        {
            return Orientation.orientationscape === OrientationScape.PORTRAIT_PRIMARY || Orientation.orientationscape === OrientationScape.PORTRAIT_SECONDARY;
        }

        public static isLandscape(): boolean
        {
            return Orientation.orientationscape === OrientationScape.LANDSCAPE_PRIMARY || Orientation.orientationscape === OrientationScape.LANDSCAPE_SECONDARY;
        }
    }

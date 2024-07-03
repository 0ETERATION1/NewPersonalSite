import { inputStore } from "../Utils/Store";
import nipplejs from 'nipplejs';

export default class InputController {
    constructor() {
        this.startListening();
        this.inputStore = inputStore;
        this.keyPressed = {};
        this.touchStartX = 0;
        this.touchStartY = 0;

        if (isMobileDevice()) {
            this.initJoystick();
        }
    }

    startListening() {
        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        if (!this.keyPressed[event.code]) {
            switch (event.code) {
                case "KeyW":
                case "ArrowUp":
                    inputStore.setState({ forward: true });
                    break;
                case "KeyA":
                case "ArrowLeft":
                    inputStore.setState({ left: true });
                    break;
                case "KeyS":
                case "ArrowDown":
                    inputStore.setState({ backward: true });
                    break;
                case "KeyD":
                case "ArrowRight":
                    inputStore.setState({ right: true });
                    break;
            }
            this.keyPressed[event.code] = true;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp":
                inputStore.setState({ forward: false });
                break;
            case "KeyA":
            case "ArrowLeft":
                inputStore.setState({ left: false });
                break;
            case "KeyS":
            case "ArrowDown":
                inputStore.setState({ backward: false });
                break;
            case "KeyD":
            case "ArrowRight":
                inputStore.setState({ right: false });
                break;
        }
        this.keyPressed[event.code] = false;
    }

    initJoystick() {
        const joystick = nipplejs.create({
            zone: document.body,
            mode: 'static',
            position: { left: '50%', bottom: '50px' },
            color: 'blue'
        });

        joystick.on('move', (evt, data) => {
            const angle = data.angle.degree;
            if (angle >= 45 && angle < 135) {
                inputStore.setState({ forward: true, backward: false });
            } else if (angle >= 135 && angle < 225) {
                inputStore.setState({ left: true, right: false });
            } else if (angle >= 225 && angle < 315) {
                inputStore.setState({ backward: true, forward: false });
            } else {
                inputStore.setState({ right: true, left: false });
            }
        });

        joystick.on('end', () => {
            inputStore.setState({ forward: false, backward: false, left: false, right: false });
        });
    }
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

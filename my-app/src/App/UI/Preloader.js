import assetStore from '../Utils/AssetStore.js';
import { appStateStore } from '../Utils/Store.js';
import InputController from './InputController.js'; // Ensure correct import path

export default class Preloader {
    constructor() {
        this.assetStore = assetStore;

        // access to DOM elements
        this.overlay = document.querySelector('.overlay');
        this.loading = document.querySelector('.loading');
        this.startButton = document.querySelector('.start');
        this.audioElement = document.getElementById('backgroundAudio');

        this.assetStore.subscribe((state) => {
            this.numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
            this.numberOfAssetsToLoad = state.assetsToLoad.length;
            this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;
            this.progress = Math.trunc(this.progress * 100);
            document.getElementById('progressPercentage').innerHTML = this.progress;

            if (this.progress === 100) {
                appStateStore.setState({ assetsReady: true });
                this.loading.classList.add('fade');
                window.setTimeout(() => this.ready(), 1200);
            }
        });

        this.inputController = new InputController(); // Initialize InputController
    }

    ready() {
        this.loading.remove();

        this.startButton.style.display = 'inline';
        this.startButton.classList.add('fadeIn');

        this.startButton.addEventListener('click', () => {
            console.log('started');
            this.overlay.classList.add('fade');
            this.startButton.classList.add('fadeOut');

            // Play the audio
            this.audioElement.play().catch(error => {
                console.error('Failed to play audio:', error);
            });

            // Initialize the joystick only after the user presses start
            this.inputController.initJoystick();

            window.setTimeout(() => {
                this.overlay.remove();
                this.startButton.remove();
            }, 2000);
        }, { once: true });
    }
}

import * as PIXI from 'pixi.js'
import SelectCharacterScreen from './screens/select-character-screen.js';

class App {
  constructor() {
    window.onload = () => this.start();
  }

  async start() {
    this.app = new PIXI.Application({
      width: 1000,
      height: 1000,
    });

    this.loader = new PIXI.Loader();

    this.app.renderer.backgroundColor = 0xAAAAAA // 0x4a2f30;
   

    this.screen = new SelectCharacterScreen(this.loader, this.app.stage);


    document.body.appendChild(this.app.view);



  }



}

new App();

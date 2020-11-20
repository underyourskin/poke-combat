import * as PIXI from 'pixi.js'
import ScreenManager from './core/screen-manager';


class App extends PIXI.Application{
  constructor() {
    super( { width: 1000, height: 1000} )
    window.onload = () => this.init();
  }
  
  async init() {
    console.log(this.view)
    
    const appContainer = new PIXI.Container();

    this.renderer.backgroundColor = 0xAAAAAA;

    document.body.appendChild(this.view);

    const screenManager = new ScreenManager(appContainer);
    
    await screenManager.init();

    this.stage.addChild(appContainer);

    this.start();
  }
}


new App();

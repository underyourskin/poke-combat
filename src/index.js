import * as PIXI from 'pixi.js'
import Api from './api/api';
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

    this.app.renderer.backgroundColor = 0xAAAAAA // 0x4a2f30; 

    document.body.appendChild(this.app.view);

    this.pokemons = await Api.getPokemons();

    this.screen = new SelectCharacterScreen(this.app, this.pokemons );
    this.screen.render();
  }
}

new App();

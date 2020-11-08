import * as PIXI from 'pixi.js'
import Api from './api/api.js'

class App {
  constructor() {
    window.onload = () => this.onLoad();
    window.addEventListener('resize', () => this.onResize());
  } 

  async onLoad() {
    

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.loader = new PIXI.Loader();

    this.app.renderer.backgroundColor = 0x4a2f30;

    document.body.appendChild(this.app.view);



    const pokemons = await Api.getPokemons();

    const setup = () => {
      
      pokemons.map(item => {
        let pokemon = new PIXI.Sprite(this.loader.resources[item.name].texture);
        console.log(pokemon)
        this.app.stage.addChild(pokemon);
      })
    }

    pokemons.map(item => {
      this.loader.add(item.name, item.sprites.front_default)
    })
    this.loader.load(setup)

  }

 
  onResize() {
    const { renderer } = this.app;

    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);
  }
}

new App();

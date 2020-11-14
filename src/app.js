import * as PIXI from 'pixi.js'
import Api from './api/api';
import ScreenManager from './core/screen-manager';
import BattleScreen from './screens/battle-screen';
import SelectCharacterScreen from './screens/select-character-screen.js';

class App {
  constructor() {
    window.onload = () => this.start();
  }
  
  async start() {
    const app = new PIXI.Application({
      width: 1000,
      height: 1000,
    });
    
    document.body.appendChild(app.view);

    const screenManager = new ScreenManager(app);
    const pokemons = await Api.getPokemons();

    const selectCharacterScreen = new SelectCharacterScreen( app, pokemons );
    const battleScreen = new BattleScreen( app );

    screenManager.addScreen( selectCharacterScreen );
    screenManager.addScreen( battleScreen );

    screenManager.navigateTo( selectCharacterScreen.getId() );
  }
}

new App();

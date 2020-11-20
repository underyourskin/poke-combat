import Api from "../api/api";
import BattleScreen from "../screens/battle-screen";
import SelectCharacterScreen from "../screens/select-character-screen";

export default class ScreenManager {
  static instance = null;

  constructor(appContainer) {
    if (ScreenManager.instance) {
      throw new Error('You cannot have another instance of ScreenManager');
    }
    this.appContainer = appContainer;

    this.screens = {};

    this.canvas = document.getElementsByTagName('canvas')[0];

    ScreenManager.instance = this;
  }

  async init() {
    let pokemons = await Api.getPokemons();

    pokemons.forEach(item => console.log(item.name , item.weight));

    this.selectCharacterScreen = new SelectCharacterScreen(pokemons, this.handleBattleInit.bind(this));
    
    // uncomment to directly test the battle screen 
    // this.handleBattleInit({playerA: pokemons[17], playerB: pokemons[8]});

    // Register initial screen here :
    this.addScreen(this.selectCharacterScreen);

    // render initial screen :
    this.navigateTo(this.selectCharacterScreen.getId());
  }

  static getInstance() {
    return this.instance;
  }

  addScreen(screen) {
    // Registers new screen.
    this.screens[screen.getId()] = screen;
  }

  switchToSelect() {
    this.navigateTo(this.selectCharacterScreen.getId());
  }

  handleBattleInit(args) {

    const props = {
      playerA: args.playerA,
      playerB: args.playerB,
      handleSwitch: this.switchToSelect.bind(this)
    }

    const battleScreen = new BattleScreen(props);

    this.addScreen(battleScreen);

    this.navigateTo(battleScreen.getId());
  }

  async navigateTo(screenId) {
    const screen = this.screens[screenId];

    const { classList } = this.canvas;

    // check if the screen id exist.
    if (!screen) {
      throw new Error(`There is no screen with id: ${screenId}`);
    }

    // check if navigation is to the same screen.
    if (this.currentScreen?.getId() == screenId) {
      return;
    }

    // check if there is already screen.
    if (this.currentScreen) {
      const prevScreen = this.currentScreen

      // remove old animation class.
      classList.remove(prevScreen.getLoadingAnimationClass());

      // trigger animation of destroying prev screen.
      classList.add(prevScreen.getDestroyingAnimationClass());

      await new Promise((resolve) => {
        setTimeout(() => {
          // clear stage from prev screen
          this.appContainer.removeChild(prevScreen);

          // clear canvas classes for next animations.
          classList.remove(prevScreen.getDestroyingAnimationClass());

          resolve();
        }, 2500);
      });
    }

    this.currentScreen = screen;

    this.appContainer.addChild(this.currentScreen);
    
    classList.add(this.currentScreen.getLoadingAnimationClass());
  }
}
import * as PIXI from 'pixi.js';
import BattleButton from '../components/battle-button';
import CharacterList from '../components/character-list';
import SelectedCharacter from '../components/selected-character';

const INITIAL_POKEMON = 0;

export default class SelectCharacterScreen {

  constructor(stage, pokemons, renderer) {
    this.renderer = renderer
    this.stage = stage;
    this.pokemons = pokemons;

    this.initialize();
  }

  battleCountdown(count, timeout, x = 500, y = 500) {
    return new Promise(async (resolve) => {
      const style = new PIXI.TextStyle({
        fill: "black",
        fontFamily: "\"Comic Sans MS\", cursive, sans-serif",
        fontSize: 80,
        fontStyle: "italic",
      });

      const textObj = new PIXI.Text(count, style);

      textObj.x = x;
      textObj.y = y;

      this.stage.addChild(textObj);

      setTimeout(() => {
        this.stage.removeChild(textObj);

        resolve();
      }, timeout)
    });
  }

  async startBattle() {
    for (let i = 1; i < 4; i++) {
      await this.battleCountdown(i, 1000);
    }
  }

  async initialize() {
    const selectedCharacter = new SelectedCharacter(this.stage);
    const characterList = new CharacterList(this.stage, this.pokemons, selectedCharacter);
    const battleButton = new BattleButton(this.stage, this.startBattle.bind(this), this.renderer);

    selectedCharacter.select(this.pokemons[INITIAL_POKEMON]);

    characterList.render();
    selectedCharacter.render();
  }

}
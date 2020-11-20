import BattleButton from '../components/select-character/battle-button';
import CharacterList from '../components/select-character/character-list';
import SelectedCharacter from '../components/select-character/selected-character';
import Countdown from '../components/agnostic/countdown';
import ScreenBase from '../core/base/screen-base';

const INITIAL_POKEMON = 0;

export default class SelectCharacterScreen extends ScreenBase {

  constructor(pokemons, switchToBattle) {
    super();
    this.pokemons = pokemons;

    this.handleBattleInit = switchToBattle;

    this.init();
  }

  getId() {
    return 'select-character-screen';
  }

  init() {

    this.selectedCharacter = new SelectedCharacter();
    const characterList = new CharacterList(this.pokemons, this.handleSelectCharacter.bind(this));
    const battleButton = new BattleButton();

    battleButton.interactive = true;
    battleButton.buttonMode = true;
    battleButton.defaultCursor = 'crosshair';
    battleButton.on('mousedown', () => this.handleClickBattle())

    this.addChild(this.selectedCharacter);
    this.addChild(characterList);
    this.addChild(battleButton);

    this.countdown = new Countdown({
      start: 3,
      end: 1,
      timeout: 1000,
      x: 500,
      y: 500,
      stage: this
    })

    this.selectedCharacter.select(this.pokemons[INITIAL_POKEMON]);
  }

  async handleClickBattle() {

    await this.countdown.render();
    await this.countdown.countdown('Battle!!!');


    const random = Math.floor(Math.random() * Math.floor(this.pokemons.length - 1));
    const args = {
      playerA: this.selectedCharacter.selected,
      playerB: this.pokemons[random],
    }

    this.handleBattleInit(args)
  }

  handleSelectCharacter(pokeSprite) {
    this.selectedCharacter.select(pokeSprite);
  }
}
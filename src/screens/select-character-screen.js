import BattleButton from '../components/battle-button';
import CharacterList from '../components/character-list';
import SelectedCharacter from '../components/selected-character';
import Countdown from '../components/agnostic/countdown';
import ScreenBase from '../core/base/screen-base';
import ScreenManager from '../core/screen-manager';

const INITIAL_POKEMON = 0;

export default class SelectCharacterScreen extends ScreenBase {

  constructor(app, pokemons) {
    super( app );
 
    this.pokemons = pokemons;

    this.initialize();
  }

  getId() {
    return 'select-character-screen';
  }

  async startBattle() {
    await this.countdown.render();
    ScreenManager.getInstance().navigateTo( 'battle-screen');
  }

  async initialize() {
    this.selectedCharacter = new SelectedCharacter(this.stage);
    this.characterList = new CharacterList(this.stage, this.pokemons, this.selectedCharacter);
    this.battleButton = new BattleButton(this.stage, this.startBattle.bind(this), this.renderer); // props.onClick = this.startBattle.
    
    this.countdown = new Countdown({
      start: 5,
      end: 1,
      timeout: 1500,
      x: 500,
      y: 500,
      stage: this.stage
    })

    this.selectedCharacter.select(this.pokemons[INITIAL_POKEMON]);
  }

  render() {
    this.characterList.render();
    this.selectedCharacter.render();
    this.battleButton.render();
  }
}
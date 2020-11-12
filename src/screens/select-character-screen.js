import Api from '../api/api';
import CharacterList from '../components/character-list';
import SelectedCharacter from '../components/selected-character';

export default class SelectCharacterScreen {
  constructor(loader, stage) {
    this.loader = loader;
    this.stage = stage;

    this.initialize();
  }

  async initialize() {
    // this.loadedPromise = new Promise( ( resolve ) => {
    //   this.resolve = resolve;
    // } );
    this.pokemons = await Api.getPokemons();

    this.selectedCharacter = new SelectedCharacter(this.stage, this.loader);
    this.CharacterList = new CharacterList(this.loader, this.stage,this.pokemons , this.selectedCharacter);
    
    this.CharacterList.render();
    this.selectedCharacter.select(this.pokemons[0]);
    this.selectedCharacter.render();

  }

    
  sync() {
    return this.loadedPromise;
  }
}
import * as PIXI from 'pixi.js'
import { OutlineFilter, GlowFilter } from 'pixi-filters';
import { pokeTypes } from '../common/poke-types';

export default class CharacterList {
  constructor(loader, stage, pokemons, selectedCharacter) {
    this.loader = loader;
    this.stage = stage;
    this.pokemons = pokemons;
    this.selectedCharacter = selectedCharacter;

    this.initialize();
  }

  initialize() {

    this.outlineFilterWhite = new GlowFilter(15, 2, 1, 0xff9999, 0.5);
    this.pokeSprites = [];
    this.pokeContainers = [];

    this.pokemons.map(item => {
      this.loader.add(item.name, item.sprites.front_default)
    })


    this.loader.load(() => this.setupCharacterList())
  }

  filterOn(pokeSprite) {
    pokeSprite.filters = [this.outlineFilterWhite];
  }

  filterOff(pokeSprite) {
    pokeSprite.filters = [];
  }

  handleSpriteClick(pokeSprite) {
    this.selectedCharacter.select(pokeSprite);
    this.selectedCharacter.delete();
    this.selectedCharacter.render();
  }

  // Calculation for character box x position
  calculateX(index) {
    let temp = index;
    while (temp > 9) {
      temp -= 10;
    }
    return (temp * 100)
  }

  // Calculation for character box y position
  calculateY(index) {
    const temp = Math.floor(index / 10); // 10 sprites for a row
    return (temp * 100)
  }

  setupCharacterList() {

    this.pokemons.map((item, index) => {

      const xPos = this.calculateX(index),
        yPos = this.calculateY(index);

      // Character box  
      const graphics = new PIXI.Graphics();

      graphics.lineStyle(1, 0x000000, 1) // border
        .beginFill(pokeTypes[item.types[0].type.name], 0.25) // background color depends on poke type
        .drawRoundedRect(xPos, yPos, 98.5, 100, 2) // x , y , width, height, radios
        .endFill();


      // Character Image
      const pokeSprite = new PIXI.Sprite(this.loader.resources[item.name].texture);

      pokeSprite.x = xPos;
      pokeSprite.y = yPos;
      pokeSprite.width = 100;
      pokeSprite.height = 100;
      pokeSprite.interactive = true;
      pokeSprite.data = item;
      pokeSprite.buttonMode = true;
      pokeSprite.defaultCursor = 'crosshair';

      pokeSprite.on('pointerover', () => this.filterOn(pokeSprite));
      pokeSprite.on('pointerout', () => this.filterOff(pokeSprite));
      pokeSprite.on('mousedown', () => this.handleSpriteClick(pokeSprite));

      this.pokeContainers.push(graphics)
      this.pokeSprites.push(pokeSprite);
    })
    this.render()
  }


  render() {
    this.pokeContainers.map(container => this.stage.addChild(container));
    this.pokeSprites.map(pokeSprite => this.stage.addChild(pokeSprite));
  }

}

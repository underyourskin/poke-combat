import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters';
import { pokeTypes } from '../data/poke-types';

const ROW_SIZE = 10;
const BOX_WIDTH = 100;
const BOX_HEIGHT = 100;

export default class CharacterList {
  constructor(stage, pokemons, selectedCharacter) {
    this.stage = stage;
    this.pokemons = pokemons;
    this.selectedCharacter = selectedCharacter;

    this.initialize();
  }

  initialize() {
    this.outlineFilterWhite = new GlowFilter(15, 2, 1, 0xff9999, 0.5);

    this.pokeSprites = [];
    this.pokeContainers = [];

    this.setupCharacterList();
  }

  setupCharacterList() {
    this.pokemons.map((item, index) => {

      // calculation for the box positions
      const xPos = this.calculateX(index);
      const yPos = this.calculateY(index);

      const boxColor = pokeTypes[item.types[0].type.name]; // take only the first pokemon type

      // Character box 
      // Draws dynamically character box with configuration for 10 boxes in a row
      const graphics = new PIXI.Graphics();

      graphics
        .lineStyle(1, 0x000000, 1)
        .beginFill(boxColor, 0.25) 
        .drawRoundedRect(xPos, yPos, BOX_WIDTH - 1.5 , BOX_HEIGHT, 2)
        .endFill();


      // Character Image
      const pokeSprite = new PIXI.Sprite.from(item.sprites.front_default);

      pokeSprite.x = xPos;
      pokeSprite.y = yPos;
      pokeSprite.width = BOX_WIDTH;
      pokeSprite.height = BOX_HEIGHT;
      pokeSprite.data = item;
      pokeSprite.interactive = true;
      pokeSprite.buttonMode = true;
      pokeSprite.defaultCursor = 'crosshair';

      pokeSprite.on('pointerover', () => this.filterOn(pokeSprite));
      pokeSprite.on('pointerout', () => this.filterOff(pokeSprite));
      pokeSprite.on('mousedown', () => this.handleSpriteClick(item));

      this.pokeContainers.push(graphics);
      this.pokeSprites.push(pokeSprite);
    })
  }

  // filters toggle onClick
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
    while (index >= ROW_SIZE) { // row size is 10 
      index -= ROW_SIZE;
    }
    return (index * BOX_WIDTH)
  }

  // Calculation for character box y position
  calculateY(index) {
    const temp = Math.floor(index / ROW_SIZE); // index / 10 
    return (temp * BOX_HEIGHT)
  }

  render() {
    this.pokeContainers.forEach(container => this.stage.addChild(container));
    this.pokeSprites.forEach(pokeSprite => this.stage.addChild(pokeSprite));
  }

}

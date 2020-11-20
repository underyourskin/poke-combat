import * as PIXI from 'pixi.js'
import { pokeTypes } from '../../data/poke-types';

const BOX_WIDTH = 380;
const BOX_HEIGHT = 500;

export default class SelectedCharacter extends PIXI.Container {
  constructor() {
    super();
  }
  
  // the component box everything else should be draw on top of that
  createCharacterBox(typeColor) {
    
    // Character box  
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0x000000, 1) 
      .beginFill(typeColor, 0.25)
      .drawRoundedRect(500 - (BOX_WIDTH / 2), 250, BOX_WIDTH, BOX_HEIGHT, 4)
      .endFill();

    graphics.pivot.x = 0.5;

    this.selectedBox = graphics;
  }

  // presents the character name
  createBoxHeader(name) {

    const style = new PIXI.TextStyle({
      fill: "#000000",
      fontFamily: "Courier New",
      fontStyle: "italic"
    });
    this.pokeName = new PIXI.Text(name, style);
    this.pokeName.x = 500;
    this.pokeName.y = 260;
    this.pokeName.anchor.x = 0.5;
  }


  // presents character's stats
  createCharacterStats(pokeData) {

    const yStartPos = 570;

    let yPos = yStartPos;

    // Ability
    const firstAbility = pokeData.abilities.find(ability => !ability.is_hidden).ability.name;

    this.abilityText = this.textCreator('Ability', firstAbility, yPos);

    yPos += 20;

    // Moves
    const moves = pokeData.moves
      .slice(0, 4)
      .reduce((acc, item) => {
        acc.push(item.move.name);
        return acc;
      }, [])

    const movesLine1 = moves.slice(0, 2).join(', '),
      movesLine2 = moves.slice(2).join(', ');

    this.movesText = this.textCreator('Moves', `${movesLine1},\n       ${movesLine2}`, yPos);

    yPos += 40; // increment by 20,  2 times as Moves takes 2 lines

    // Stats
    this.stats = []; // initialize stats array
    
    pokeData.stats.map(item => {
      const statName = item.stat.name,
        statValue = item.base_stat;

      const statText = this.textCreator(this.capitalize(statName), statValue, yPos);

      this.stats.push(statText);

      yPos += 20;
    })
  }

  // presents the character image
  createCharacterImage(pokeData) {
    
    const spriteWidth = 300,
      spriteHeight = 300;

    const pokeSprite = new PIXI.Sprite.from(pokeData.sprites.front_default);

    pokeSprite.x = 500 - (spriteWidth / 2);
    pokeSprite.y = 280;
    pokeSprite.width = spriteWidth;
    pokeSprite.height = spriteHeight;

    this.selectedImage = pokeSprite;
  }

  // Generate text elements for the Stats section
  textCreator(statName, statText, yPos) {

    const text = `${statName}: ${statText}`;

    const style = new PIXI.TextStyle({
      fill: "#312b2b",
      fontFamily: "Courier New",
      fontSize: 18,
      fontStyle: "italic",
    });

    const textObj = new PIXI.Text(text, style);

    textObj.x = 500 - (BOX_WIDTH / 2) + 10;
    textObj.y = yPos;

    return textObj;
  }

  capitalize(string) {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  select(pokeData) {
    this.prev = this.selected;

    if (pokeData.data) {
      pokeData = pokeData.data;
    }
    if (this.prev && pokeData.name == this.prev.name) {
      return;
    }

    this.selected = pokeData;

    this.createCharacterBox(pokeTypes[pokeData.types[0].type.name])
    this.createBoxHeader(pokeData.name);
    this.createCharacterImage(pokeData);
    this.createCharacterStats(pokeData);


    this.delete();
  
    this.addChild(this.selectedBox);
    this.addChild(this.pokeName);
    this.addChild(this.selectedImage);
    this.addChild(this.abilityText);
    this.addChild(this.movesText);
    
    this.stats.map(stat => {
      this.addChild(stat);
    })

  }

  delete() {
    if (!this.prev) {
      return;
    }
    for(let i = this.children.length - 1; i >= 0; i --){
      this.removeChild(this.children[i]);
    }
  }
}
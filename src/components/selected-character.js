import * as PIXI from 'pixi.js'
import { pokeTypes } from '../common/poke-types';

export default class SelectedCharacter {
  constructor(stage, loader) {
    this.stage = stage;
    this.loader = loader;

    this.boxHeight = 470;
    this.boxWidth = 380;
  }

  boxCalculateX() {

  }

  createCharacterBox(typeColor) {

    this.prevBox = this.selectedBok;

    // Character box  

    const graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0x000000, 1) // border
      .beginFill(typeColor, 0.25) // background color depends on poke type
      .drawRoundedRect(500 - (this.boxWidth / 2), 250, this.boxWidth, this.boxHeight, 4) // x , y , width, height, radios
      .endFill();

    graphics.pivot.x = 0.5;
    // graphics.pivot.t = 0.5;

    this.selectedBox = graphics;

  }

  createBoxHeader(name) {
    // poke name
    this.prevName = this.pokeName;

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

  createCharacterStats(pokeData) {
    // Ability: lightning-rod
    // Move 1: Mega Punch
    // Move 2: Pay Day
    // Move 3: Thunder Punch
    // Move 4: Slam
    // Speed: 90
    // Special Defense: 50
    // Special Attack: 50
    // Defense: 40
    // Attack: 55
    // HP: 35
    const firstAbility = pokeData.abilities.find(ability => !ability.is_hidden).ability.name;
    console.log(firstAbility);

    const style = new PIXI.TextStyle({
      fill: "#312b2b",
      fontFamily: "Courier New",
      fontSize: 18,
      fontStyle: "italic"
    });
    this.abilityText = new PIXI.Text(`Ability: ${firstAbility}`, style);
    this.abilityText.x = 500;
    this.abilityText.y = 585;
    this.abilityText.anchor.x;
    

  }

  createCharacterImage(pokeData) {
    this.prevImage = this.selectedImage;

    const spriteWidth = 300,
      spriteHeight = 300;

    const pokeSprite = new PIXI.Sprite.from(pokeData.sprites.front_default);

    pokeSprite.x = 500 - (spriteWidth / 2);
    pokeSprite.y = 280;
    pokeSprite.width = spriteWidth;
    pokeSprite.height = spriteHeight;


    this.selectedImage = pokeSprite;
  }

  select(pokeData) {
    this.prev = this.selected;

    if(pokeData.data){
      pokeData = pokeData.data;
    }
    if(this.prev && pokeData.name == this.prev.name){
      return;
    }
    
    this.selected = pokeData;
    console.log(pokeData);
  

    this.createCharacterBox(pokeTypes[pokeData.types[0].type.name])
    this.createBoxHeader(pokeData.name);
    this.createCharacterImage(pokeData);
    this.createCharacterStats(pokeData);


  }

  render() {
    if (!this.selected) {
      return;
    }
    this.stage.addChild(this.selectedBox);
    this.stage.addChild(this.pokeName);
    this.stage.addChild(this.selectedImage);
  }

  delete() {
    if (!this.prev) {
      return;
    }
    this.stage.removeChild(this.prevBox);
    this.stage.removeChild(this.prevName);
    this.stage.removeChild(this.prevImage);

  }
}
import * as PIXI from 'pixi.js';

export default class HealthBar extends PIXI.Container {
  constructor(yPos, isSelected) {
    super()

    this.yPos = yPos;
    this.isSelected = isSelected;

    this.healthBackground = new PIXI.Graphics();
    this.health = new PIXI.Graphics();
    this.healthBorder = new PIXI.Graphics();
    this.plaster = new PIXI.Graphics();

    this.init();
  }

  init(width = 100) {
    
    // health bar box - black background
    this.healthBackground.lineStyle(2, 0x000000, 1, 1, true);
    this.healthBackground.beginFill(0x000);
    this.healthBackground.drawRect(450, this.isSelected ? this.yPos + 250 : this.yPos - 10, 100, 15);
    this.healthBackground.endFill();

    // actual health 
    this.health.lineStyle(1, 0x000000, 1, 1, true);
    this.health.beginFill(0x7FFF00);
    this.health.drawRect(450, this.isSelected ? this.yPos + 250 : this.yPos - 10, width, 15);
    this.health.endFill();

    this.healthBorder.lineStyle(1, 0x000000, 1, 1, true);
    this.healthBorder.drawRect(450, this.isSelected ? this.yPos + 250 : this.yPos - 10, width, 15);
    this.healthBorder.endFill();

    // health plaster 
    this.plaster.lineStyle(1, 0xAAAAAA, 1, 1, true); // needs to be same as background. 
    this.plaster.beginFill(0xAAAAAA);
    this.plaster.drawRect(449 - width, this.isSelected ? this.yPos + 250 : this.yPos - 10, width, 16);
    this.plaster.endFill();

    // stage
    this.addChild(this.healthBackground);
    this.addChild(this.health);
    this.addChild(this.healthBorder);
    this.addChild(this.plaster);
  }
}
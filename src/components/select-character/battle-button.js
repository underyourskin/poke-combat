import * as PIXI from 'pixi.js';

export default class BattleButton extends PIXI.Container {
  constructor() {
    super();

    this.init();
  }

  init() {

    const graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0xa12727, 1);
    graphics.beginFill(0xff4a4a, 0.25);
    graphics.drawRect(420, 760, 160, 50, 2);
    graphics.endFill();

    const style = new PIXI.TextStyle({
      "fill": "black",
      "fontFamily": "\"Comic Sans MS\", cursive, sans-serif",
      "fontSize": 25,
      "fontStyle": "italic"
    })

    const text = new PIXI.Text('Start Battle', style);
    text.y = 770;
    text.x = 500;
    text.anchor.x = 0.5;

    this.addChild(graphics);
    this.addChild(text);
  }
}
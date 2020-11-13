import * as PIXI from 'pixi.js';

export default class BattleButton {
  constructor(stage, startBattle, renderer) {
    this.stage = stage;
    this.startBattle = startBattle;
    this.renderer = renderer;

    this.init();
  }

  handleClick(e) { this.startBattle() }


  init() {

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1, 0xa12727, 1);
    this.graphics.beginFill(0xff4a4a, 0.25);
    this.graphics.drawRoundedRect(420, 760, 160, 50, 2);
    this.graphics.endFill();

    const texture = this.renderer.generateTexture(this.graphics);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.interactive = true;
    this.sprite.x = 420;
    this.sprite.y = 760;
    this.sprite.buttonMode = true;
    this.sprite.defaultCursor = 'crosshair';
    this.sprite.on('mousedown', () => this.handleClick())



    const style = new PIXI.TextStyle({
      "fill": "black",
      "fontFamily": "\"Comic Sans MS\", cursive, sans-serif",
      "fontSize": 25,
      "fontStyle": "italic"
    })

    this.text = new PIXI.Text('Start Battle', style);
    this.text.y = 770;
    this.text.x = 500;
    this.text.anchor.x = 0.5;
  }

  render() {
    this.stage.addChild(this.sprite);
    this.stage.addChild(this.text);
  }
}
import * as PIXI from 'pixi.js';

const STYLE = {
  fill: "black",
  fontFamily: "\"Comic Sans MS\", cursive, sans-serif",
  fontSize: 80,
  fontStyle: "italic",
};

export default class Countdown {
  constructor(props) {
    
    if (!props.stage) {
      throw new Error('Stage is required prop example : props = { start: 5, end: 1, timeout: 1000, x: 500, y: 480, }');
    }
    this.props = props;
  }

  countdown(count) {
    return new Promise(async (resolve) => {

      const style = new PIXI.TextStyle(STYLE);

      const textObj = new PIXI.Text(` ${count} `, style);

      const { x, y, stage, timeout } = this.props;

      textObj.x = x;
      textObj.y = y;
      textObj.anchor.x = 0.5;

      stage.addChild(textObj);

      setTimeout(() => {
        stage.removeChild(textObj);

        // Give him a heartbeat 
        setTimeout(() => {
          resolve();
        }, 100);
      }, timeout)
    });
  }

  async render() {
    for (let i = this.props.start; i >= this.props.end; i--) {
      await this.countdown(i);
    }
  }
}
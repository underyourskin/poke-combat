import { gsap } from 'gsap';
import * as PIXI from 'pixi.js';
import { PixiPlugin } from 'gsap/PixiPlugin';

const Default_Delay = 4000;
const STYLE = new PIXI.TextStyle({
  fill: "black",
  fontFamily: "\"Comic Sans MS\", cursive, sans-serif",
  fontSize: 100,
  fontStyle: "italic",
});

export default class Animations {

  constructor() {
    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);

  }

  async bottomPlayerAttacks(params, handleComplete) {

    const attacker = params.attacker,
      opponent = params.opponent,
      delay = params.delay || Default_Delay,
      opponentHpPercentage = params.opponentHp;

    setTimeout(() => {

      const timeline = gsap.timeline();

      const opponentHealthBox = opponent.children[1];

      const opponentSprite = opponent.children[0];

      timeline.to(attacker, { y: -400, duration: 0.5 })
        .to(opponentSprite, { alpha: 0, duration: 0.1 })
        .to(attacker, { y: -400, duration: 0.05 })
        .to(attacker, { y: -420, duration: 0.05 })
        .to(opponentSprite, { alpha: 1, duration: 0.1 })
        .to(opponentSprite, { alpha: 0, duration: 0.1 })
        .to(opponentSprite, { alpha: 1, duration: 0.1 })
        .to(opponentSprite, { alpha: 0, duration: 0.1 })
        .to(opponentSprite, { alpha: 1, duration: 0.1 })
        .to(attacker, { y: 0, duration: 0.5 });


      timeline.to(opponentHealthBox.children[1], {
        pixi: {
          colorize: opponentHpPercentage < 40 ? "red" : "yellow",
          colorizeAmount: 1,
        }, 
        x: opponentHpPercentage - 100,
        y: + 1
      });
      if (opponentHpPercentage == 0) {

        const text = new PIXI.Text(' You Won!! ', STYLE);

        text.x = 500;
        text.y = 480;
        text.anchor.x = 0.5
        text.visible = 0;

        timeline.to(text, { pixi: { visible: 1 }, x: 500, y: 400, css: { opacity: 1 }, duration: 2 }, "+=1");
        attacker.addChild(text);
      }

    }, delay);

  }

  async topPlayerAttacks(params) {
    const attacker = params.attacker,
      opponent = params.opponent,
      delay = params.delay || Default_Delay,
      opponentHpPercentage = params.opponentHp;

    const opponentHealthBox = opponent.children[1];

    const opponentSprite = opponent.children[0];

    setTimeout(() => {
      const timeline = gsap.timeline();

      timeline.to(attacker, { y: 440, duration: 0.5 })
        .to(opponentSprite, { alpha: 0, duration: 0.1 })
        .to(attacker, { y: 400, duration: 0.05 })
        .to(attacker, { y: 420, duration: 0.05 })
        .to(opponentSprite, { alpha: 1, duration: 0.1 })
        .to(opponentSprite, { alpha: 0, duration: 0.1 })
        .to(opponentSprite, { alpha: 1, duration: 0.1 })
        .to(opponentSprite, { alpha: 0, duration: 0.1 })
        .to(opponentSprite, { alpha: 1, duration: 0.1 })
        .to(attacker, { y: 0, duration: 0.5 });

      timeline.to(opponentHealthBox.children[1], {
        pixi: {
          colorize: opponentHpPercentage < 40 ? "red" : "yellow",
          colorizeAmount: 1,
        },
        x: opponentHpPercentage - 100,
        y: + 1
      });

      if (opponentHpPercentage == 0) {  

        const text = new PIXI.Text(' You Lost!! ', STYLE);

        text.x = 500;
        text.y = 480;
        text.anchor.x = 0.5
        text.visible = 0;


        timeline.to(text, { pixi: { visible: 1 }, x: 500, y: 400, css: { opacity: 1 }, duration: 2 }, "+=1");
        opponent.addChild(text);
      }

    }, delay);

  }

  async bottomPlayerMisses(params) { 

    const attacker = params.attacker,
      opponent = params.opponent,
      delay = params.delay || Default_Delay;

    setTimeout(() => {

      const timeline = gsap.timeline();

      timeline.to(attacker, { y: - 580, duration: 1 })
        .to(opponent, { x: 300, duration: 0.5 }, "-=1")
        .to(attacker, { y: 0, duration: 1 })
        .to(opponent, { x: 0, duration: 0.5 }, "-=1");

    }, delay)
  }

  async topPlayerMisses(params) {
    
    const attacker = params.attacker,
      opponent = params.opponent,
      delay = params.delay || Default_Delay;
    
    setTimeout(() => {
      
      const timeline = gsap.timeline();

      timeline.to(attacker, { y: 580, duration: 1 })
        .to(opponent, { x: -300, duration: 0.5 }, "-=1")
        .to(attacker, { y: 0, duration: 1 })
        .to(opponent, { x: 0, duration: 0.5 }, "-=1");

    }, delay)

  }
}
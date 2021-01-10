import { gsap } from 'gsap';
import * as PIXI from 'pixi.js';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { TEXT_STYLE } from '../config/animations';

const Default_Delay = 4000;

const STYLE = new PIXI.TextStyle(TEXT_STYLE);


export default class BattleAnimations {

  constructor() {
    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);

  }

  successfulAttack(attacker, opponent, direction) {

    const timeline = gsap.timeline();

    const opponentSprite = opponent.children[0];

    return timeline.to(attacker, { y: 440 * direction, duration: 0.5 })
      .to(opponentSprite, { alpha: 0, duration: 0.1 })
      .to(attacker, { y: 400 * direction, duration: 0.05 })
      .to(attacker, { y: 420 * direction, duration: 0.05 })
      .to(opponentSprite, { alpha: 1, duration: 0.1 })
      .to(opponentSprite, { alpha: 0, duration: 0.1 })
      .to(opponentSprite, { alpha: 1, duration: 0.1 })
      .to(opponentSprite, { alpha: 0, duration: 0.1 })
      .to(opponentSprite, { alpha: 1, duration: 0.1 })
      .to(attacker, { y: 0, duration: 0.5 });

  }

  reduceHealth(target, health) {
    const timeline = gsap.timeline();
    return timeline.to(target, {
      pixi: {
        colorize: health < 40 ? "red" : "yellow",
        colorizeAmount: 1,
      },
      x: health - 100,
      y: + 1
    });
  }

  missedAttack(attacker, opponent, direction) {

    const timeline = gsap.timeline();

    return timeline.to(attacker, { y: 580 * direction, duration: 1 })
      .to(opponent, { x: -300 * direction, duration: 0.5 }, "-=1")
      .to(attacker, { y: 0, duration: 1 })
      .to(opponent, { x: 0, duration: 0.5 }, "-=1");
  }
}
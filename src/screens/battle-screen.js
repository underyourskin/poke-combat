import * as PIXI from 'pixi.js';
import ScreenBase from "../core/base/screen-base";

export default class BattleScreen extends ScreenBase {
  constructor( app ) {
    super( app );

    this.sprites = [];
  }

  getId() {
    return 'battle-screen';  
  }

  async onScreenChange( args = {} ) {

    this.playerA = args.playerA;
    this.playerB = args.playerB;
    
    const selectedPlayerSprite = new PIXI.Sprite.from(this.playerA.sprites.back_default);

    selectedPlayerSprite.x = 500;
    selectedPlayerSprite.anchor.x = 0.5
    selectedPlayerSprite.y = 750;
    selectedPlayerSprite.anchor.y = 0.5;
    selectedPlayerSprite.width = 250;
    selectedPlayerSprite.height = 250;

    this.sprites.push(selectedPlayerSprite);

    const opponentSprite = new PIXI.Sprite.from(this.playerB.sprites.front_default);

    opponentSprite.x = 500;
    opponentSprite.anchor.x = 0.5
    opponentSprite.y = 150;
    opponentSprite.anchor.y = 0.5;
    opponentSprite.width = 250;
    opponentSprite.height = 250;

    this.sprites.push(opponentSprite);
  }

  // first attacker - compare speeds
  // damage  = (Attack / Opponent Defense) * 0 - 200
  // attack animation ::
  //  - The pokemon moves to the oponent.
  //  - The opponent should blink 3 times
  //  - The opponent HP bar should decrease
  //  - The pokemon that attacked, should return to it's initial position
  // If you loose or win, show a text 'You Lose' or 'You Win' respectively, and a Play Again button which should repeat the steps from step 1. This button shouldn't refresh the page, but redraw the stage.
  battleManager() {
    const statsA = this.playerA.stats;
    const statsB = this.playerB.stats;

    const aSpeed = this.findStat('speed', statsA);
    const bSpeed = this.findStat('speed', statsB);

    
    let isAttackerA;
    if( aSpeed < bSpeed ) {
       isAttackerA = false;
      console.log(' B starts');

    } else if ( aSpeed >  bSpeed) {
      isAttackerA = true;
      console.log( 'a starts');
    
    } else {
      isAttackerA = Math.random() < 0.5 ? true : false;
    }

  }
  
  findStat( name, stats) {
    const stat = stats.find(item => item.stat.name == name);
    return stat.base_stat;
  }

  calculateDamage( playerA, playerB ) {

  }

  render() {
    this.renderer.backgroundColor = 0x000300;
    this.sprites.forEach(item => this.stage.addChild(item));
    this.battleManager();
  }
}
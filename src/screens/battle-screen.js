import * as PIXI from 'pixi.js';
import Player from '../components/battle/player';
import ScreenBase from "../core/base/screen-base";
import BattleManager from '../core/battle-manager';

export default class BattleScreen extends ScreenBase {
  constructor(props) {
    super();

    const { playerA, playerB, handleSwitch } = props;

    this.handleSwitch = handleSwitch;
    this.players = {
      playerA,
      playerB
    }
    this.sprites = [];

    this.init()
  }

  getId() { return 'battle-screen'; }

  async init() {

    const playerA = new Player({
      xPos: 500,
      yPos: 580,
      pokemon: this.players.playerA,
      isSelected: true,
    });

    const playerB = new Player({
      xPos: 500,
      yPos: 35,
      pokemon: this.players.playerB,
      isSelected: false,
    });

    this.addChild(playerA);
    this.addChild(playerB);

    this.playerA = playerA;
    this.playerB = playerB;
    
    const battleManager = new BattleManager(this.playerA, this.playerB, this.players)
    
   setTimeout(async ()=> {
     await battleManager.start(this.handleSwitch.bind(this));
     
   }, 3000); 
   
  }
}
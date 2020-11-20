import * as PIXI from 'pixi.js';
import HealthBar from './healthbar';

export default class Player extends PIXI.Container {
  constructor(props) {
    super()

    this.props = props;

    this.init();
  }

  init() {
    const { yPos, isSelected } = this.props;
    
    this.totalHp = this.findStat('hp');
    this.speed = this.findStat('speed')
    this.attack = this.findStat('attack');
    this.defense = this.findStat('defense');
    
    this.hp = this.totalHp;
    
    const playerSprite = this.createPlayerSprite();
    const healthBar = new HealthBar(yPos, isSelected);

    this.addChild(playerSprite);
    this.addChild(healthBar);

  }

  findStat( name, stats = this.props.pokemon.stats ) {

    const stat = stats.find(item => item.stat.name == name);
    return stat.base_stat;
  }

  createPlayerSprite() {
    const { xPos, yPos, pokemon, isSelected } = this.props;
    
    const playerSprite = new PIXI.Sprite.from( isSelected ? pokemon.sprites.back_default : pokemon.sprites.front_default );

    playerSprite.x = xPos;
    playerSprite.anchor.x = 0.5
    playerSprite.y = yPos;
    playerSprite.anchor.y;
    playerSprite.height = 250;
    playerSprite.width = 300;

    return playerSprite
  }

}
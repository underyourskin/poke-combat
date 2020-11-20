import AnimationManager from "../animations/animation-manager";
import Animations from "../animations/animations";

export default class BattleManager {
  constructor(playerA, playerB, players) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.players = players;


  }
  
  async start(handleSwitch){

    const animationManager = new AnimationManager();

    const animations = new Animations();

    const aStats = this.players.playerA.stats;
    const bStats = this.players.playerB.stats;

    const aSpeed = this.findStat('speed', aStats),
      bSpeed = this.findStat('speed', bStats);

    let isAttackerA;

    // Move to function compare speed ?
    if ( aSpeed < bSpeed ) {
      isAttackerA = false; // B starts

    } else if ( aSpeed > bSpeed ) {
      isAttackerA = true; // A starts

    } else {
      isAttackerA = Math.random() < 0.5 ? true : false;
    }

    let aTotalHealth = this.findStat('hp', aStats),
      bTotalHealth = this.findStat('hp', bStats),
      delay = 0,
      misses = 0, // if 6 misses in a row quit the game !
      aHealth = aTotalHealth,
      bHealth = bTotalHealth;

    while ( aHealth > 0 && bHealth > 0 && misses < 6 ) {

      delay += 4000

      if (isAttackerA) {

        const actualDmg = this.calcActualDmg(aStats, bStats);

        if (actualDmg > 0) {

          bHealth -= (actualDmg / 2);
          bHealth = bHealth > 0 ? bHealth : 0;

          animationManager.addToQueue({
            params: {
              attacker: this.playerA,
              opponent: this.playerB,
              delay,
              opponentHp: ((bHealth / bTotalHealth) * 100).toFixed(0)
            },
            callback: animations.bottomPlayerAttacks
          });

          misses = 0;

        } else {

          animationManager.addToQueue({
            params: {
              attacker: this.playerA,
              opponent: this.playerB,
              delay
            },
            callback: animations.bottomPlayerMisses
          });

          misses++

        }

        isAttackerA = false;

      } else {

        const actualDmg = this.calcActualDmg(bStats, aStats);

        if (actualDmg > 0) {

          aHealth -= (actualDmg / 2);
          aHealth = aHealth > 0 ? aHealth : 0;

          animationManager.addToQueue({
            params: {
              attacker: this.playerB,
              opponent: this.playerA,
              delay,
              opponentHp: ((aHealth / aTotalHealth) * 100).toFixed(0)
            },
            callback: animations.topPlayerAttacks
          });

          misses = 0;

        } else {

          animationManager.addToQueue({
            params: {
              attacker: this.playerB,
              opponent: this.playerA,
              delay
            },
            callback: animations.topPlayerMisses
          });

          misses++

        }

        isAttackerA = true;

      }
    }
   
    await animationManager.start(handleSwitch.bind(this));

  }

  calcActualDmg(attacker, defender) {

    const attack = this.findStat('attack', attacker);
    const defense = this.findStat('defense', defender);

    const damage = Math.round(attack / defense) * Math.round(Math.random() * 200);

    return Math.round(damage / 2);
  }

  findStat(name, stats = this.props.pokemon.stats) {
    const stat = stats.find(item => item.stat.name == name);
    return stat.base_stat;
  }
}

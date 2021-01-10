import BattleAnimations from "../animations/BattleAnimations";
import gsap from 'gsap';

export default class BattleManager {
  constructor(playerA, playerB, players) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.players = players;
  }

  async start(handleSwitch) {

    const timeline = gsap.timeline({onComplete: () => handleSwitch()});
    const animations = new BattleAnimations();

    const aStats = this.players.playerA.stats;
    const bStats = this.players.playerB.stats;

    const aSpeed = this.findStat('speed', aStats),
      bSpeed = this.findStat('speed', bStats);

    let isAttackerA;

    // Move to function compare speed ?
    if (aSpeed < bSpeed) {
      isAttackerA = false; // B starts

    } else if (aSpeed > bSpeed) {
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

    while (aHealth > 0 && bHealth > 0 && misses < 6) {

      delay += 4000

      if (isAttackerA) {

        const actualDmg = this.calcActualDmg(aStats, bStats);

        if (actualDmg > 0) {

          bHealth -= (actualDmg / 2);
          bHealth = bHealth > 0 ? bHealth : 0;

          timeline.add(animations.successfulAttack(this.playerA, this.playerB, -1));
          timeline.add(animations.reduceHealth(this.playerB.children[1].children[1], bHealth));

          misses = 0;

        } else {

          timeline.add(animations.missedAttack(this.playerA, this.playerB, -1))
          misses++
        }

        isAttackerA = false;

      } else {

        const actualDmg = this.calcActualDmg(bStats, aStats);

        if (actualDmg > 0) {

          aHealth -= (actualDmg / 2);
          aHealth = aHealth > 0 ? aHealth : 0;

          timeline.add(animations.successfulAttack(this.playerB, this.playerA, 1))
          timeline.add(animations.reduceHealth(this.playerA.children[1].children[1], aHealth))
          

          misses = 0;

        } else {

          timeline.add(animations.missedAttack(this.playerB, this.playerA, 1))

          misses++
        }

        isAttackerA = true;
      }
    }

    timeline.play();
    

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

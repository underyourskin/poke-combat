export default class AnimationManager {
  constructor() {
    this.queue = [];

  }

  /**
   * 
   * @param {object} animation  {params, callback}
   */
  addToQueue(animation) {
    this.queue.push({
      params: animation.params,
      callback: animation.callback
    });
   
  }

  async next(){
    if( !this.queue.length ){
      return;
    }
    const animation = this.queue[0];
    
    await animation.callback(animation.params);

    this.queue = this.queue.slice(1);
  }

  onComplete(){
    this.next();
  }

  async start(handleSwitch) {

    const fightDuration = this.queue[this.queue.length - 1].params.delay;
    
    setTimeout(() => {
        handleSwitch();
      }, fightDuration + 5000)

    while(this.queue.length > 0){

      await this.next();
    }
    
  }
}
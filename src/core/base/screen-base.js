import * as PIXI from 'pixi.js'

export default class ScreenBase extends PIXI.Container {
  constructor(  ) {
    super()
  }
  
  getId() {
    throw new Error( 'getId() is required.' );
  }

  getLoadingAnimationClass() {
    return 'bounce-in-left';
  }

  getDestroyingAnimationClass(){
   return 'bounce-out-fwd';
  }

  async onScreenChange( args = {} ) {};

}
export default class ScreenBase {
  constructor( app ) {
    this.renderer = app.renderer;
    this.stage = app.stage;;
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

  render() {
    throw new Error( 'render() is required.' );
  }

  destroy() {
    this.stage.removeChildren();
  }
}
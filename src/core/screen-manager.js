import ScreenBase from "./base/screen-base";

export default class ScreenManager {
  static instance = null;

  constructor( app ) {
    if( ScreenManager.instance ) {
      throw new Error( 'ScreenManager is singleton');
    }

    this.app = app;

    this.screens = {};
    this.canvas = document.getElementsByTagName('canvas')[0];

    ScreenManager.instance = this;
  }

  static getInstance() {
    return this.instance;
  }

  addScreen( screen ) {
    // Register new screen.
    this.screens[ screen.getId() ] = screen;
  }

  navigateTo( screenId, force = false ) {
    if( !force && this.currentScreen ) {
      this.canvas.classList.remove( this.currentScreen.getLoadingAnimationClass() );
      this.canvas.classList.add( this.currentScreen.getDestroyingAnimationClass() );

      return setTimeout( () => {
        this.navigateTo( screenId, true );
      }, 2000 );
    }
    
    const screen = this.screens[ screenId ];

    this.currentScreen = screen;
    
    this.canvas.classList.add( screen.getLoadingAnimationClass() );
    
    screen.destroy();
    screen.render();
  }
}
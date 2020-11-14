import ScreenBase from "./base/screen-base";

export default class ScreenManager {
  static instance = null;

  constructor(app) {
    if (ScreenManager.instance) {
      throw new Error('ScreenManager is singleton');
    }

    this.app = app;

    this.screens = {};
    this.canvas = document.getElementsByTagName('canvas')[0];

    ScreenManager.instance = this;
  }

  static getInstance() {
    return this.instance;
  }

  addScreen(screen) {
    // Register new screen.
    this.screens[screen.getId()] = screen;
  }

  navigateTo(screenId, args = { force: false } ) {
    const { classList } = this.canvas;
    const screen = this.screens[screenId];

    if (this.currentScreen) {
      this.prevScreen = this.currentScreen;

      if (!args.force) {

        classList.remove(this.prevScreen.getLoadingAnimationClass());
        classList.add(this.prevScreen.getDestroyingAnimationClass());
        screen.onScreenChange( args );
        return setTimeout(() => {
          this.prevScreen.destroy();

          classList.remove(this.prevScreen.getDestroyingAnimationClass());

          args.force = true;

          
          this.navigateTo(screenId, args );
        }, 2000);
      }
    }

    this.currentScreen = screen;

    classList.add(screen.getLoadingAnimationClass());

    screen.render();
  }
}
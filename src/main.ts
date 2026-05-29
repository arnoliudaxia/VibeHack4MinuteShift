import Phaser from 'phaser';
import './style.css';

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('background', '/assets/bg1.png');
  }

  create() {
    const { width, height } = this.scale;

    const background = this.add.image(width / 2, height / 2, 'background');
    const scale = Math.max(width / background.width, height / background.height);
    background.setScale(scale).setScrollFactor(0);

    this.add
      .text(width / 2, height / 2, 'Phaser 4.1.0', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#111827',
        strokeThickness: 6
      })
      .setOrigin(0.5);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 960,
  height: 540,
  backgroundColor: '#111827',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: MainScene
};

new Phaser.Game(config);

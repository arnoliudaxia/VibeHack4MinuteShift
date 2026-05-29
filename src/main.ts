import Phaser from 'phaser';
import './style.css';

const SCENE_WIDTH = 1672;
const SCENE_HEIGHT = 941;
const PLAYER_WIDTH = 38;
const PLAYER_HEIGHT = 72;
const PLAYER_SPEED = 260;
const PLAYER_GRAVITY = 1100;
const PLAYER_MAX_FALL_SPEED = 900;
const PLAYER_STEP_HEIGHT = 24;
const PLAYER_LADDER_EXIT_LIFT = SCENE_HEIGHT;
const COLLISION_ALPHA_THRESHOLD = 16;
const BGM_VOLUME = 0.45;
const PANEL_CONTROL_X = 92;
const PANEL_CONTROL_WIDTH = 112;

type PlayerKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

type VolumeSound = Phaser.Sound.BaseSound & {
  setVolume?: (value: number) => Phaser.Sound.BaseSound;
  volume?: number;
};

type PlayerState = 'Normal' | 'Climbing';

class MainScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Graphics;
  private keys?: PlayerKeys;
  private bgm?: VolumeSound;
  private isBgmMuted = true;
  private isGravityEnabled = true;
  private playerVelocityY = 0;
  private playerState: PlayerState = 'Normal';
  private isWhiteCollisionEnabled = true;
  private collisionData?: Uint8Array;
  private ladderData?: Uint8Array;
  private collisionWidth = 0;
  private collisionHeight = 0;
  private gravityButton?: Phaser.GameObjects.Rectangle;
  private gravityText?: Phaser.GameObjects.Text;
  private stateText?: Phaser.GameObjects.Text;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('space', '/assets/scene/space.png');
    this.load.image('background', '/assets/scene/spaceShip.png');
    this.load.image('collision', '/assets/scene/physic.png');
    this.load.image('drive', '/assets/scene/ShipRoom/drive.png');
    this.load.image('driveFire', '/assets/scene/ShipRoom/driveFire.png');
    this.load.audio('bgm', '/assets/Sound/BGM/HOYO-MiX - 危机预知 Crises.mp3');
    this.load.image('astronautWalkRight1', '/assets/generated_sprites/astronaut_walk_right/walk-1.png');
    this.load.image('astronautWalkRight2', '/assets/generated_sprites/astronaut_walk_right/walk-2.png');
    this.load.image('astronautWalkRight4', '/assets/generated_sprites/astronaut_walk_right/walk-4.png');
    this.load.image('astronautWalkRight5', '/assets/generated_sprites/astronaut_walk_right/walk-5.png');
    this.load.image('astronautWalkRight6', '/assets/generated_sprites/astronaut_walk_right/walk-6.png');
  }

  create() {
    const { width, height } = this.scale;

    const space = this.add.image(width / 2, height / 2, 'space');
    const spaceScale = Math.max(width / space.width, height / space.height);
    space.setScale(spaceScale).setScrollFactor(0);

    const background = this.add.image(width / 2, height / 2, 'background');
    const scale = Math.max(width / background.width, height / background.height);
    background.setScale(scale).setScrollFactor(0);

    const driveOverlay = this.add
      .image(width / 2, height / 2, 'drive')
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(false);

    this.createCollisionMask();

    const collisionOverlay = this.createCollisionDebugOverlay(scale);

    this.bgm = this.sound.add('bgm', { loop: true, volume: 0 }) as VolumeSound;
    this.bgm.play();

    this.player = this.add.graphics({ x: width / 2, y: height / 2 });
    this.player
      .fillStyle(0x38bdf8, 1)
      .fillRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .lineStyle(3, 0xe0f2fe, 1)
      .strokeRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2);

    this.keys = this.input.keyboard?.addKeys('W,A,S,D') as PlayerKeys | undefined;

    const panel = this.add.container(16, 16).setScrollFactor(0);
    const panelBackground = this.add
      .rectangle(0, 0, 220, 240, 0x0f172a, 0.82)
      .setOrigin(0);
    const soundLabel = this.add.text(14, 21, 'BGM', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const muteButton = this.add
      .rectangle(PANEL_CONTROL_X, 16, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const muteText = this.add.text(119, 22, 'Muted', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });

    const collisionLabel = this.add.text(14, 65, 'Collision', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const collisionButton = this.add
      .rectangle(PANEL_CONTROL_X, 60, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const collisionText = this.add.text(127, 66, 'Hidden', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });

    const gravityLabel = this.add.text(14, 109, 'Gravity', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const gravityButton = this.add
      .rectangle(PANEL_CONTROL_X, 104, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const gravityText = this.add.text(133, 110, 'On', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });
    this.gravityButton = gravityButton;
    this.gravityText = gravityText;
    gravityButton.setFillStyle(0x22c55e, 1);

    const stateLabel = this.add.text(14, 153, 'Player State', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.stateText = this.add.text(116, 153, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const label = this.add.text(14, 197, 'Drive', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });

    const selectedBackground = this.add
      .rectangle(PANEL_CONTROL_X, 192, PANEL_CONTROL_WIDTH, 32, 0x334155, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const selectedText = this.add.text(104, 199, 'None', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    const arrow = this.add.text(184, 199, 'v', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#cbd5e1'
    });

    const menu = this.add.container(PANEL_CONTROL_X, 226).setVisible(false);
    const options = [
      { label: 'None', texture: null },
      { label: 'Normal', texture: 'drive' },
      { label: 'Wrong', texture: 'driveFire' }
    ];

    options.forEach((option, index) => {
      const optionY = index * 30;
      const optionBackground = this.add
        .rectangle(0, optionY, 112, 30, 0x1e293b, 1)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
      const optionLabel = this.add.text(12, optionY + 7, option.label, {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        color: '#ffffff'
      });

      optionBackground.on('pointerdown', () => {
        selectedText.setText(option.label);
        menu.setVisible(false);

        if (!option.texture) {
          driveOverlay.setVisible(false);
          return;
        }

        driveOverlay.setTexture(option.texture).setVisible(true);
      });

      menu.add([optionBackground, optionLabel]);
    });

    panel.add([
      panelBackground,
      soundLabel,
      muteButton,
      muteText,
      collisionLabel,
      collisionButton,
      collisionText,
      gravityLabel,
      gravityButton,
      gravityText,
      stateLabel,
      this.stateText,
      label,
      selectedBackground,
      selectedText,
      arrow,
      menu
    ]);

    selectedBackground.on('pointerdown', () => {
      menu.setVisible(!menu.visible);
    });

    muteButton.on('pointerdown', () => {
      if (!this.bgm) {
        return;
      }

      this.isBgmMuted = !this.isBgmMuted;

      const nextVolume = this.isBgmMuted ? 0 : BGM_VOLUME;

      if (this.bgm.setVolume) {
        this.bgm.setVolume(nextVolume);
      } else {
        this.bgm.volume = nextVolume;
      }

      muteButton.setFillStyle(this.isBgmMuted ? 0x475569 : 0x22c55e, 1);
      muteText.setText(this.isBgmMuted ? 'Muted' : 'Sound On');
      muteText.setX(this.isBgmMuted ? 119 : 109);
    });

    collisionButton.on('pointerdown', () => {
      if (!collisionOverlay) {
        return;
      }

      const isVisible = !collisionOverlay.visible;

      collisionOverlay.setVisible(isVisible);
      collisionButton.setFillStyle(isVisible ? 0xdc2626 : 0x475569, 1);
      collisionText.setText(isVisible ? 'Visible' : 'Hidden');
      collisionText.setX(isVisible ? 130 : 127);
    });

    gravityButton.on('pointerdown', () => {
      if (this.playerState === 'Climbing') {
        return;
      }

      this.isGravityEnabled = !this.isGravityEnabled;
      this.playerVelocityY = 0;

      this.updateGravityUi();
    });
  }

  update(_: number, delta: number) {
    if (!this.player || !this.keys) {
      return;
    }

    this.updatePlayerState(this.keys.W.isDown || this.keys.S.isDown);

    const direction = new Phaser.Math.Vector2(0, 0);

    if (this.keys.A.isDown) {
      direction.x -= 1;
    }

    if (this.keys.D.isDown) {
      direction.x += 1;
    }

    if (this.keys.W.isDown) {
      direction.y -= 1;
    }

    if (this.keys.S.isDown) {
      direction.y += 1;
    }

    if (direction.lengthSq() > 0) {
      direction.normalize().scale(PLAYER_SPEED * (delta / 1000));
    }

    if (this.isGravityEnabled) {
      this.playerVelocityY = Math.min(
        this.playerVelocityY + PLAYER_GRAVITY * (delta / 1000),
        PLAYER_MAX_FALL_SPEED
      );
      direction.y += this.playerVelocityY * (delta / 1000);
    } else {
      this.playerVelocityY = 0;
    }

    if (direction.x === 0 && direction.y === 0) {
      return;
    }

    const nextX = Phaser.Math.Clamp(
      this.player.x + direction.x,
      PLAYER_WIDTH / 2,
      this.scale.width - PLAYER_WIDTH / 2
    );

    if (!this.isWhiteCollisionEnabled || !this.collidesWithMap(nextX, this.player.y)) {
      this.player.x = nextX;
    } else if (direction.x !== 0) {
      const steppedY = this.tryStepUp(nextX, this.player.y);

      if (steppedY !== undefined) {
        this.player.x = nextX;
        this.player.y = steppedY;
        this.playerVelocityY = 0;
      }
    }

    const nextY = Phaser.Math.Clamp(
      this.player.y + direction.y,
      PLAYER_HEIGHT / 2,
      this.scale.height - PLAYER_HEIGHT / 2
    );

    if (!this.isWhiteCollisionEnabled || !this.collidesWithMap(this.player.x, nextY)) {
      this.player.y = nextY;
    } else if (this.isGravityEnabled && direction.y > 0) {
      this.playerVelocityY = 0;
    }

    this.updatePlayerState(this.keys.W.isDown || this.keys.S.isDown);
  }

  private createCollisionMask() {
    const source = this.textures.get('collision').getSourceImage() as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = source.width;
    canvas.height = source.height;

    if (!context) {
      return;
    }

    context.drawImage(source, 0, 0);

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const collisionData = new Uint8Array(canvas.width * canvas.height);
    const ladderData = new Uint8Array(canvas.width * canvas.height);

    for (let index = 0; index < collisionData.length; index += 1) {
      const pixelIndex = index * 4;
      const r = pixels[pixelIndex];
      const g = pixels[pixelIndex + 1];
      const b = pixels[pixelIndex + 2];
      const a = pixels[pixelIndex + 3];

      if (a < COLLISION_ALPHA_THRESHOLD) {
        continue;
      }

      collisionData[index] = r === 255 && g === 255 && b === 255 ? 1 : 0;
      ladderData[index] = r === 255 && g === 0 && b === 0 ? 1 : 0;
    }

    this.collisionData = collisionData;
    this.ladderData = ladderData;
    this.collisionWidth = canvas.width;
    this.collisionHeight = canvas.height;
  }

  private createCollisionDebugOverlay(scale: number) {
    if (!this.collisionData) {
      return undefined;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = this.collisionWidth;
    canvas.height = this.collisionHeight;

    if (!context) {
      return undefined;
    }

    const imageData = context.createImageData(canvas.width, canvas.height);

    for (let index = 0; index < this.collisionData.length; index += 1) {
      if (this.collisionData[index] !== 1 && this.ladderData?.[index] !== 1) {
        continue;
      }

      const pixelIndex = index * 4;

      imageData.data[pixelIndex] = this.ladderData?.[index] === 1 ? 255 : 255;
      imageData.data[pixelIndex + 1] = this.ladderData?.[index] === 1 ? 120 : 0;
      imageData.data[pixelIndex + 2] = 0;
      imageData.data[pixelIndex + 3] = 140;
    }

    context.putImageData(imageData, 0, 0);
    this.textures.addCanvas('collisionDebug', canvas);

    return this.add
      .image(this.scale.width / 2, this.scale.height / 2, 'collisionDebug')
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(false);
  }

  private collidesWithMap(x: number, y: number) {
    if (!this.collisionData) {
      return false;
    }

    const left = Math.floor(x - PLAYER_WIDTH / 2);
    const right = Math.ceil(x + PLAYER_WIDTH / 2);
    const top = Math.floor(y - PLAYER_HEIGHT / 2);
    const bottom = Math.ceil(y + PLAYER_HEIGHT / 2);
    const sampleStep = 4;

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
        if (this.isSolidPixel(sampleX, sampleY)) {
          return true;
        }
      }
    }

    for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
      if (this.isSolidPixel(sampleX, bottom) || this.isSolidPixel(sampleX, top)) {
        return true;
      }
    }

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      if (this.isSolidPixel(left, sampleY) || this.isSolidPixel(right, sampleY)) {
        return true;
      }
    }

    return false;
  }

  private tryStepUp(nextX: number, currentY: number) {
    if (!this.isWhiteCollisionEnabled || this.playerState !== 'Normal') {
      return undefined;
    }

    for (let step = 1; step <= PLAYER_STEP_HEIGHT; step += 1) {
      const testY = currentY - step;

      if (!this.collidesWithMap(this.player?.x ?? nextX, testY) && !this.collidesWithMap(nextX, testY)) {
        return testY;
      }
    }

    return undefined;
  }

  private isSolidPixel(x: number, y: number) {
    if (!this.collisionData) {
      return false;
    }

    const pixelX = Math.floor(x);
    const pixelY = Math.floor(y);

    if (pixelX < 0 || pixelX >= this.collisionWidth || pixelY < 0 || pixelY >= this.collisionHeight) {
      return true;
    }

    return this.collisionData[pixelY * this.collisionWidth + pixelX] === 1;
  }

  private updatePlayerState(isVerticalInputPressed: boolean) {
    if (!this.player || !this.stateText) {
      return;
    }

    const isTouchingLadder = this.overlapsLadder(this.player.x, this.player.y);
    const nextState: PlayerState =
      this.playerState === 'Normal' && (!isTouchingLadder || !isVerticalInputPressed) ? 'Normal' :
      isTouchingLadder ? 'Climbing' : 'Normal';

    if (nextState === this.playerState) {
      return;
    }

    if(this.playerState==='Climbing' && nextState==='Normal'){
      this.liftPlayerOutOfLadder();
    }

    this.playerState = nextState;
    this.applyPlayerState();
  }

  private applyPlayerState() {
    if (!this.stateText) {
      return;
    }

    if (this.playerState === 'Climbing') {
      this.isGravityEnabled = false;
      this.isWhiteCollisionEnabled = false;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setText('Climbing');
      this.stateText.setColor('#f97316');
      return;
    }

    this.isGravityEnabled = true;
    this.isWhiteCollisionEnabled = true;
    this.playerVelocityY = 0;
    this.updateGravityUi();
    this.stateText.setText('Normal');
    this.stateText.setColor('#ffffff');
  }

  private updateGravityUi() {
    if (!this.gravityButton || !this.gravityText) {
      return;
    }

    this.gravityButton.setFillStyle(this.isGravityEnabled ? 0x22c55e : 0x475569, 1);
    this.gravityText.setText(this.isGravityEnabled ? 'On' : 'Off');
    this.gravityText.setX(this.isGravityEnabled ? 133 : 132);
  }

  private liftPlayerOutOfLadder() {
    if (!this.player) {
      return;
    }
    console.log(`Attempting to lift player out of ladder from y=${this.player.y}`)

    for (let lift = 1; lift <= PLAYER_LADDER_EXIT_LIFT; lift += 1) {
      const testY = this.player.y - lift;

      if (!this.collidesWithMap(this.player.x, testY)) {
    console.log('Lifting player out of ladder');
        this.player.y = testY;
        this.playerVelocityY = 0;
    console.log(`Attempting to lift player out of ladder to y=${this.player.y}`)
        return;
      }
    }
  }

  private overlapsLadder(x: number, y: number) {
    if (!this.ladderData) {
      return false;
    }

    const left = Math.floor(x - PLAYER_WIDTH / 2);
    const right = Math.ceil(x + PLAYER_WIDTH / 2);
    const top = Math.floor(y - PLAYER_HEIGHT / 2);
    const bottom = Math.ceil(y + PLAYER_HEIGHT / 2);
    const sampleStep = 4;

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
        if (this.isLadderPixel(sampleX, sampleY)) {
          return true;
        }
      }
    }

    for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
      if (this.isLadderPixel(sampleX, bottom) || this.isLadderPixel(sampleX, top)) {
        return true;
      }
    }

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      if (this.isLadderPixel(left, sampleY) || this.isLadderPixel(right, sampleY)) {
        return true;
      }
    }

    return false;
  }

  private isLadderPixel(x: number, y: number) {
    if (!this.ladderData) {
      return false;
    }

    const pixelX = Math.floor(x);
    const pixelY = Math.floor(y);

    if (pixelX < 0 || pixelX >= this.collisionWidth || pixelY < 0 || pixelY >= this.collisionHeight) {
      return false;
    }

    return this.ladderData[pixelY * this.collisionWidth + pixelX] === 1;
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: SCENE_WIDTH,
  height: SCENE_HEIGHT,
  backgroundColor: '#111827',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: MainScene
};

new Phaser.Game(config);

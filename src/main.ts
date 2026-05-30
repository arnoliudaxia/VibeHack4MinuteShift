import Phaser from 'phaser';
import './style.css';

// 场景设置
const SCENE_WIDTH = 1672;
const SCENE_HEIGHT = 941;
const GITHUB_ICON_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96"><path fill="white" d="M49 0C21.9 0 0 22 0 49.1c0 21.7 14 40.1 33.5 46.6 2.5.5 3.3-1.1 3.3-2.4v-8.4c-13.6 3-16.5-6.6-16.5-6.6-2.2-5.7-5.4-7.2-5.4-7.2-4.5-3 .3-3 .3-3 4.9.4 7.5 5.1 7.5 5.1 4.4 7.5 11.5 5.3 14.3 4.1.4-3.2 1.7-5.3 3.1-6.6-10.9-1.2-22.3-5.4-22.3-24.2 0-5.3 1.9-9.7 5.1-13.1-.5-1.2-2.2-6.2.5-12.9 0 0 4.1-1.3 13.5 5 3.9-1.1 8.1-1.6 12.2-1.6s8.3.5 12.2 1.6c9.4-6.3 13.5-5 13.5-5 2.7 6.7 1 11.7.5 12.9 3.2 3.4 5.1 7.8 5.1 13.1 0 18.8-11.5 22.9-22.4 24.1 1.8 1.5 3.3 4.5 3.3 9.1v13.5c0 1.3.9 2.9 3.4 2.4C84 89.1 98 70.7 98 49.1 98 22 76.1 0 49 0Z"/></svg>'
  );

type CreatorProfile = {
  name: string;
  avatarKey: string;
  githubUrl: string;
};

const CREATOR_PROFILES: CreatorProfile[] = [
  {
    name: 'shirai90',
    avatarKey: 'creatorAvatarShirai90',
    githubUrl: 'https://github.com/shirai90'
  },
  {
    name: 'arnoliudaxia',
    avatarKey: 'creatorAvatarArnoliudaxia',
    githubUrl: 'https://github.com/arnoliudaxia'
  }
];

const XBOX_BUTTON_NAMES = [
  'A',
  'B',
  'X',
  'Y',
  'LB',
  'RB',
  'LT',
  'RT',
  'View',
  'Menu',
  'LS',
  'RS',
  'DPad Up',
  'DPad Down',
  'DPad Left',
  'DPad Right',
  'Xbox'
];

// player设置
const PLAYER_WIDTH = 38;
const PLAYER_HEIGHT = 72;
const PLAYER_MAX_HEALTH = 100;
const PLAYER_HEAL_PER_SECOND = 15;
const PLAYER_HEALTH_BAR_OFFSET_Y = -PLAYER_HEIGHT / 2 - 14;
const PLAYER_SPEED = 260;
const PLAYER_GRAVITY = 1100;
const PLAYER_MAX_FALL_SPEED = 900;
const PLAYER_STEP_HEIGHT = 24;
const GAMEPAD_DEAD_ZONE = 0.3;
const PLAYER_PROGRESS_OFFSET_X = PLAYER_WIDTH / 2 + 22;
const PLAYER_PROGRESS_OFFSET_Y = -PLAYER_HEIGHT / 2 - 16;
const PLAYER_PROGRESS_RADIUS = 14;
const PLAYER_PROGRESS_LINE_WIDTH = 4;
const PLAYER_REPAIR_PROGRESS_PER_SECOND = 0.2;
const PLAYER_REPO_PROGRESS_PER_SECOND = 0.5;
const PLAYER_WORKSHOP_PROGRESS_PER_SECOND = 0.2;
const PLAYER_FIRE_EXTINGUISH_PROGRESS_PER_SECOND = 0.2;
const PLAYER_SWAP_IMPULSE_SPEED = 500;
const PLAYER_SWAP_IMPULSE_DURATION = 1000;
const PLAYER_OUTER_REPAIR_PROGRESS_PER_SECOND = 0.1;
const PLAYER_ATTACK_DISTANCE = 130;
const DROPPED_EXTINGUISHER_WIDTH = 80;
const DROPPED_EXTINGUISHER_HEIGHT = 44;
const DROPPED_EXTINGUISHER_PICKUP_PROGRESS_PER_SECOND = 2;
const DROPPED_CLOTHING_PICKUP_PROGRESS_PER_SECOND = 2;
const DROPPED_CHEST_WIDTH = 72;
const DROPPED_CHEST_HEIGHT = 64;
const DROPPED_HAIR_WIDTH = 52;
const DROPPED_HAIR_HEIGHT = 52;
const ROOM_RANDOM_FIRE_MIN_DELAY = 10000;
const ROOM_RANDOM_FIRE_MAX_DELAY = 40000;

type FireRoomId = 'drive' | 'living' | 'plant';

const PLAYER_PREFAB_CHARACTER_SCALE = 2.0872;
const PLAYER_PREFAB_PIXELS_PER_UNIT = 30;
const PLAYER_PREFAB_ROOT_OFFSET_Y = PLAYER_HEIGHT / 2 - 8;
const PLAYER_PREFAB_SKIN_TINT = 0xfac9ac;
const PLAYER_PREFAB_HAIR_TINT = 0x7de8a7;
const COLLISION_ALPHA_THRESHOLD = 16;
// 传送设置
const PLAYER_OUTSIDE_SHIP_X = 900;
const PLAYER_OUTSIDE_SHIP_Y = 100;

// 音乐设置
const BGM_VOLUME = 0.95;
// UI 设置
const PANEL_CONTROL_X = 92;
const PANEL_CONTROL_WIDTH = 112;
const PANEL_SLIDER_WIDTH = 78;
const GAME_PROGRESS_MAX = 1000;
const GAME_PROGRESS_DECAY_PER_SECOND = 8;
const GAME_PROGRESS_BAR_HEIGHT = 18;
const GAME_PROGRESS_BAR_Y = 0;
const SECOND_CLOCK_OFFSET_X = 174;
const SECOND_CLOCK_OFFSET_Y = 40;
const SECOND_CLOCK_RADIUS = 24;
const SWAP_CLOCK_INTERVAL_SECONDS = [60, 45, 30];
const PLAYER_HEALTH_BAR_WIDTH = 44;
const PLAYER_HEALTH_BAR_HEIGHT = 7;

// VFX
const DRIVE_WARNING_SIGN_X = 1200;
const DRIVE_WARNING_SIGN_Y = 300;
const LIVING_WARNING_SIGN_X = 800;
const LIVING_WARNING_SIGN_Y = 280;
const PLANT_WARNING_SIGN_X = 850;
const PLANT_WARNING_SIGN_Y = 450;
const DRIVE_WARNING_SIGN_SIZE = 72;
const ROCK_WARNING_SIGN_SIZE = 72;
const ROCK_WARNING_SIGN_X = 1672-ROCK_WARNING_SIGN_SIZE;
const ROCK_WARNING_SIGN_Y = 140;
const WARNING_SIGN_BLINK_SPEED = 5;
const SWAP_WARNING_DURATION = 5000;
const SWAP_WARNING_ICON_SIZE = 180;
const SWAP_WARNING_Y = 80;
const SNOW_NOISE_TEXTURE_KEY = 'snow-noise-texture';
const SNOW_NOISE_TILE_SIZE = 256;
const SNOW_NOISE_DOTS = 5600;
const SNOW_NOISE_ALPHA = 0.72;
const SNOW_NOISE_BASE_BLUR_ALPHA = 0.36;
const SNOW_NOISE_FLICKER_INTERVAL = 135;
const SNOW_NOISE_RANDOM_JITTER = 180;

// 陨石设置
const ASTEROID_MIN_SPAWN_DELAY = 300;
const ASTEROID_MAX_SPAWN_DELAY = 1600;
const ASTEROID_MIN_SPEED = 80;
const ASTEROID_MAX_SPEED = 220;
const ASTEROID_MIN_SCALE = 0.7;
const ASTEROID_MAX_SCALE = 1.5;
// 上面的破坏性陨石轨道
const PIXEL_ASTEROID_LANE_MIN_Y = 100;
const PIXEL_ASTEROID_LANE_MAX_Y = 140;
const PIXEL_ASTEROID_LANE_MIN_SPAWN_DELAY = 13000;
const PIXEL_ASTEROID_LANE_MAX_SPAWN_DELAY = 24000;
const PIXEL_ASTEROID_WARNING_LEAD_TIME = 3000;
const PIXEL_ASTEROID_TRIGGER_X = 650;
const EXPLOSION_ANIMATION_KEY = 'explosion-test';
const POWER_CRYSTAL_ANIMATION_KEY = 'PowerCrystal';
const OUTER_WRONG_MASK_ID = 'outerWrong';
const POWER_CRYSTAL_WIDTH = 72;
const POWER_CRYSTAL_HEIGHT = 80;
const POWER_CRYSTAL_X = 814 + POWER_CRYSTAL_WIDTH / 2;
const POWER_CRYSTAL_Y = 645 + POWER_CRYSTAL_HEIGHT / 2;
const SHIP_MAX_ENERGY = 100;
const SHIP_ENERGY_DECAY_PER_SECOND = 1.5;
const RESOURCE_COUNTER_MAX = 3;
const RESOURCE_COUNTER_BOX_WIDTH = 72;
const RESOURCE_COUNTER_BOX_HEIGHT = 92;
const RESOURCE_COUNTER_ICON_SIZE = 42;
const RESOURCE_COUNTER_LEFT_X = 415;
const RESOURCE_COUNTER_RIGHT_X = 500;
const RESOURCE_COUNTER_Y = 655;

const EXPLOSION_FRAME_KEYS = [
  'explosion1',
  'explosion2',
  'explosion3',
  'explosion4',
  'explosion5',
  'explosion6',
  'explosion7',
  'explosion8'
];

const POWER_CRYSTAL_FRAME_KEYS = Array.from(
  { length: 16 },
  (_, index) => `powerCrystal${(index + 1).toString().padStart(3, '0')}`
);

const ASTEROID_ASSETS: AsteroidAsset[] = [
  { key: 'asteroidGreyTiny', path: '/assets/scene/SpcaeElements/asteroid_grey_tiny.png' },
  { key: 'asteroidTiny', path: '/assets/scene/SpcaeElements/asteroid_tiny.png' },
  { key: 'pixelAsteroid', path: '/assets/scene/SpcaeElements/pixel_asteroid.png' },
  { key: 'metalDebris', path: '/assets/scene/SpcaeElements/金属碎片.png', lockAlpha: true, collisionKind: 'metalDebris' },
  { key: 'iceCrystal', path: '/assets/scene/SpcaeElements/冰晶.png', lockAlpha: true, collisionKind: 'iceCrystal' }
];

const PLAYER_HAND_TOOL_ASSETS: PlayerHandToolAsset[] = [
  { key: null, label: 'None' },
  { key: 'playerHandToolBow', label: 'Bow', path: '/assets/player-prefab/handTool/bow.png' },
  { key: 'playerHandToolFireExtinguisher', label: 'Extinguisher', path: '/assets/player-prefab/handTool/fireExtinguisher.png' },
  {
    key: 'playerHandToolAxe',
    label: 'Axe',
    path: '/assets/player-prefab/handTool/FA_WP_Main_Axe_004_WoodGray.png'
  }
];

type AlienSprite = Phaser.GameObjects.Container & {
  velocityX: number;
  velocityY: number;
  speed: number;
  damageCooldown: number;
  hitRadius: number;
  knockbackX: number;
  knockbackY: number;
  repelledByHit: boolean;
  targetPlayer: PlayerId;
};

type PlayerId = 'player1' | 'player2';

const ALIEN_MAX_SPAWN_DELAY = 5200;
const ALIEN_MIN_SPAWN_DELAY = 2200;
const ALIEN_SPEED = 155;
const ALIEN_HIT_DISTANCE = 36;
const ALIEN_CONTACT_DAMAGE = 25;
const ALIEN_TARGET_RETICLE_SIZE = 30;
const ALIEN_KNOCKBACK_FORCE = 2400;
const ALIEN_OFFSCREEN_PADDING = 90;

// 操控

type PlayerKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  E: Phaser.Input.Keyboard.Key;
  H: Phaser.Input.Keyboard.Key;
};

type SecondPlayerKeys = {
  UP: Phaser.Input.Keyboard.Key;
  LEFT: Phaser.Input.Keyboard.Key;
  DOWN: Phaser.Input.Keyboard.Key;
  RIGHT: Phaser.Input.Keyboard.Key;
  L: Phaser.Input.Keyboard.Key;
};

type VolumeSound = Phaser.Sound.BaseSound & {
  setVolume?: (value: number) => Phaser.Sound.BaseSound;
  volume?: number;
};

type AsteroidSprite = Phaser.GameObjects.Image & {
  velocityX: number;
  rotationSpeed: number;
  collisionKind?: AsteroidCollisionKind;
  isPixelAsteroidLane?: boolean;
  hasTriggeredPixelAsteroidLaneAction?: boolean;
  hasTriggeredPlayerCollision?: boolean;
};

type AsteroidCollisionKind = 'metalDebris' | 'iceCrystal';
type ResourceCounterKind = AsteroidCollisionKind;

type ResourceCounterUi = {
  container: Phaser.GameObjects.Container;
  box: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
};

type AsteroidAsset = {
  key: string;
  path: string;
  lockAlpha?: boolean;
  collisionKind?: AsteroidCollisionKind;
};

type PlayerState = 'Normal' | 'Climbing' | 'Healing' | 'Driving' | 'Driving-Repairing' | 'Repoing' | 'Outer-Repairing' | 'Working' | 'Firefighting';

type PlayerStateTransitionContext = {
  isTouchingLadder: boolean;
  isInsideHealRoom: boolean;
  isInsideDriveRoom: boolean;
  isInsideWorkshopRoom: boolean;
  isInsideRepoFullRoom: boolean;
  isInsideOuterWrongRoom: boolean;
  isInsideBurningRoom: boolean;
  isVerticalInputPressed: boolean;
  isDriveRoomWrong: boolean;
  isOuterWrong: boolean;
  isRepairInputPressed: boolean;
  hasWorkshopResources: boolean;
};

type PlayerStateTransition = (context: PlayerStateTransitionContext) => PlayerState;

type PlayerHandToolAsset = {
  key: string | null;
  label: string;
  path?: string;
};

type SwapImpulseState = {
  x: number;
  y: number;
  remaining: number;
};

type PlayerPanelControls = {
  container: Phaser.GameObjects.Container;
  infoText: Phaser.GameObjects.Text;
  animationText: Phaser.GameObjects.Text;
  progressFill: Phaser.GameObjects.Rectangle;
  progressHandle: Phaser.GameObjects.Arc;
  progressText: Phaser.GameObjects.Text;
  handToolText: Phaser.GameObjects.Text;
};

type DroppedExtinguisher = {
  x: number;
  y: number;
  sprite: Phaser.GameObjects.Image;
};

type DroppedClothing = {
  playerId: PlayerId;
  x: number;
  y: number;
  chestSprite: Phaser.GameObjects.Image;
  hairSprite: Phaser.GameObjects.Image;
};

type RoomLayerOption = {
  label: string;
  textureKey: string | null;
  assetPath?: string;
};

type RoomConfig = {
  id: string;
  label: string;
  defaultTextureKey: string;
  maskTextureKey: string;
  layerOptions: RoomLayerOption[];
};

type RoomMaskData = {
  data: Uint8Array;
  width: number;
  height: number;
};

type PlayerPrefabAnimationName = 'Idle' | 'Walk' | 'Run' | 'Attack' | 'Jump' | 'Dance' | 'Stun' | 'Defeat';
type PrefabAnimationNodeKey = 'body' | 'head' | 'handLeft' | 'handRight' | 'bow' | 'stunEyeLeft' | 'stunEyeRight';
type PrefabAnimationAlphaKey = 'normalEye' | 'arrow' | 'stunEyeLeft' | 'stunEyeRight' | 'defeatEyeLeft' | 'defeatEyeRight';

type PrefabSpriteOptions = {
  alpha?: number;
  tint?: number;
};

type NumberKeyframe = {
  time: number;
  value: number;
};

type VectorKeyframe = {
  time: number;
  x: number;
  y: number;
};

type PrefabAnimationNode = Phaser.GameObjects.Container & {
  baseX: number;
  baseY: number;
  baseRotation: number;
  baseScaleX: number;
  baseScaleY: number;
};

type PrefabAnimationSprite = Phaser.GameObjects.Image & {
  baseAlpha: number;
};

type PrefabAnimationNodes = {
  [key in PrefabAnimationNodeKey]: PrefabAnimationNode;
};

type PrefabAnimationSprites = {
  [key in PrefabAnimationAlphaKey]: PrefabAnimationSprite;
};

type PrefabAnimationClip = {
  duration: number;
  loop: boolean;
  positions?: Partial<Record<PrefabAnimationNodeKey, VectorKeyframe[]>>;
  rotations?: Partial<Record<PrefabAnimationNodeKey, NumberKeyframe[]>>;
  scaleY?: Partial<Record<PrefabAnimationNodeKey, NumberKeyframe[]>>;
  alphas?: Partial<Record<PrefabAnimationAlphaKey, NumberKeyframe[]>>;
};

type PlayerAnimationWindow = Window & {
  playPlayerAnimation?: (animationName: PlayerPrefabAnimationName) => boolean;
  getPlayerAnimationState?: () => PlayerPrefabAnimationName;
};

const ROOM_CONFIGS: RoomConfig[] = [
  {
    id: 'drive',
    label: 'Drive',
    defaultTextureKey: 'drive',
    maskTextureKey: 'drive',
    layerOptions: [
      { label: 'None', textureKey: null },
      { label: 'Normal', textureKey: 'drive', assetPath: '/assets/scene/ShipRoom/drive.png' },
      { label: 'Wrong', textureKey: 'driveFire', assetPath: '/assets/scene/ShipRoom/driveFire.png' }
    ]
  },
  {
    id: 'heal',
    label: 'Heal',
    defaultTextureKey: 'heal',
    maskTextureKey: 'heal',
    layerOptions: [
      { label: 'Normal', textureKey: 'heal', assetPath: '/assets/scene/ShipRoom/heal.png' }
    ]
  },
  {
    id: 'leftUpRoom',
    label: 'LeftUpRoom',
    defaultTextureKey: 'leftUpRoom',
    maskTextureKey: 'leftUpRoom',
    layerOptions: [
      { label: 'Normal', textureKey: 'leftUpRoom', assetPath: '/assets/scene/ShipRoom/LeftUpRoom.png' }
    ]
  },
  {
    id: 'workshop',
    label: 'Workshop',
    defaultTextureKey: 'workshop',
    maskTextureKey: 'workshop',
    layerOptions: [
      { label: 'Normal', textureKey: 'workshop', assetPath: '/assets/scene/ShipRoom/workshop.png' }
    ]
  },
  {
    id: 'living',
    label: 'Living',
    defaultTextureKey: 'living',
    maskTextureKey: 'living',
    layerOptions: [
      { label: 'Normal', textureKey: 'living', assetPath: '/assets/scene/ShipRoom/living.png' },
      { label: 'Wrong', textureKey: 'livingFire', assetPath: '/assets/scene/ShipRoom/卧室着火遮罩.png' }
    ]
  },
  {
    id: 'plant',
    label: 'Plant',
    defaultTextureKey: 'plant',
    maskTextureKey: 'plant',
    layerOptions: [
      { label: 'Normal', textureKey: 'plant', assetPath: '/assets/scene/ShipRoom/plant.png' },
      { label: 'Wrong', textureKey: 'plantFire', assetPath: '/assets/scene/ShipRoom/植物仓着火遮罩.png' }
    ]
  },
  {
    id: 'tube',
    label: 'Tube',
    defaultTextureKey: 'tube',
    maskTextureKey: 'tube',
    layerOptions: [
      { label: 'Normal', textureKey: 'tube', assetPath: '/assets/scene/ShipRoom/Tube.png' }
    ]
  },
  {
    id: 'power',
    label: 'Power',
    defaultTextureKey: 'power',
    maskTextureKey: 'power',
    layerOptions: [
      { label: 'Normal', textureKey: 'power', assetPath: '/assets/scene/ShipRoom/Power.png' }
    ]
  },
  {
    id: 'repo',
    label: 'Repo',
    defaultTextureKey: 'repoFull',
    maskTextureKey: 'repoFull',
    layerOptions: [
      { label: 'Full', textureKey: 'repoFull', assetPath: '/assets/scene/ShipRoom/RepoFull.png' },
      { label: 'Empty', textureKey: 'repoEmpty', assetPath: '/assets/scene/ShipRoom/RepoEmpty.png' }
    ]
  }
];

const DRIVE_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'drive') ?? ROOM_CONFIGS[0];
const HEAL_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'heal') ?? ROOM_CONFIGS[0];
const LEFT_UP_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'leftUpRoom') ?? ROOM_CONFIGS[0];
const WORKSHOP_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'workshop') ?? ROOM_CONFIGS[0];
const LIVING_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'living') ?? ROOM_CONFIGS[0];
const PLANT_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'plant') ?? ROOM_CONFIGS[0];
const TUBE_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'tube') ?? ROOM_CONFIGS[0];
const POWER_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'power') ?? ROOM_CONFIGS[0];
const REPO_ROOM_CONFIG = ROOM_CONFIGS.find((room) => room.id === 'repo') ?? ROOM_CONFIGS[0];

const PLAYER_PREFAB_ANIMATION_NAMES: PlayerPrefabAnimationName[] = [
  'Idle',
  'Walk',
  'Run',
  'Attack',
  'Jump',
  'Dance',
  'Stun',
  'Defeat'
];

const PLAYER_PREFAB_ANIMATIONS: Record<PlayerPrefabAnimationName, PrefabAnimationClip> = {
  Idle: {
    duration: 1.8333334,
    loop: true,
    positions: {
      body: [
        { time: 0, x: 0.006000102, y: 0.1759999 },
        { time: 0.9166667, x: 0.006000102, y: 0.192 },
        { time: 1.8333334, x: 0.006000102, y: 0.1759999 }
      ],
      head: [
        { time: 0, x: -0.03000003, y: 0.315 },
        { time: 0.9166667, x: -0.04, y: 0.327 },
        { time: 1.8333334, x: -0.03000003, y: 0.315 }
      ],
      handRight: [
        { time: 0, x: 0, y: 0 },
        { time: 0.9166667, x: -0.008, y: 0.024 },
        { time: 1.8333334, x: 0, y: 0 }
      ],
      handLeft: [
        { time: 0, x: 0, y: 0 },
        { time: 0.9166667, x: -0.008, y: 0.024 },
        { time: 1.8333334, x: 0, y: 0 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 0 },
        { time: 0.9166667, value: -1.995 },
        { time: 1.8333334, value: 0 }
      ],
      head: [
        { time: 0, value: 0 },
        { time: 0.9166667, value: -0.041 },
        { time: 1.8333334, value: 0 }
      ]
    },
    scaleY: {
      body: [
        { time: 0, value: 1 },
        { time: 0.9166667, value: 1.060488 },
        { time: 1.8333334, value: 1 }
      ]
    }
  },
  Walk: {
    duration: 0.6666667,
    loop: true,
    positions: {
      body: [
        { time: 0, x: 0.006000102, y: 0.164 },
        { time: 0.31666666, x: 0.006000102, y: 0.17 },
        { time: 0.56666666, x: 0.006000102, y: 0.149 },
        { time: 0.6666667, x: 0.006000102, y: 0.164 }
      ],
      handRight: [
        { time: 0, x: 0, y: 0 },
        { time: 0.31666666, x: -0.038, y: 0.017 },
        { time: 0.56666666, x: 0, y: -0.011 },
        { time: 0.6666667, x: 0, y: 0 }
      ],
      handLeft: [
        { time: 0, x: 0, y: 0 },
        { time: 0.31666666, x: -0.027, y: -0.007 },
        { time: 0.6666667, x: 0, y: 0 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 0 },
        { time: 0.15, value: -2.701 },
        { time: 0.31666666, value: 0 },
        { time: 0.5, value: 4.199 },
        { time: 0.6666667, value: 0 }
      ],
      head: [
        { time: 0, value: 0 },
        { time: 0.15, value: 5.634 },
        { time: 0.31666666, value: 2.627 },
        { time: 0.5, value: -1.188 },
        { time: 0.6666667, value: 0 }
      ]
    },
    scaleY: {
      body: [
        { time: 0, value: 0.96 },
        { time: 0.31666666, value: 1 },
        { time: 0.53333336, value: 0.97823733 },
        { time: 0.6666667, value: 0.96 }
      ]
    }
  },
  Run: {
    duration: 0.33333334,
    loop: true,
    positions: {
      body: [
        { time: 0, x: 0.006000102, y: 0.164 },
        { time: 0.16666667, x: 0.006000102, y: 0.207 },
        { time: 0.28333333, x: 0.006000102, y: 0.149 },
        { time: 0.33333334, x: 0.006000102, y: 0.164 }
      ],
      handRight: [
        { time: 0, x: -0.09, y: 0.02 },
        { time: 0.16666667, x: -0.041, y: 0.075 },
        { time: 0.33333334, x: -0.09, y: 0.02 }
      ],
      handLeft: [
        { time: 0, x: -0.011, y: -0.022 },
        { time: 0.16666667, x: -0.01, y: 0.055 },
        { time: 0.33333334, x: -0.011, y: -0.022 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 0 },
        { time: 0.06666667, value: -2.701 },
        { time: 0.16666667, value: 0 },
        { time: 0.25, value: 4.199 },
        { time: 0.33333334, value: 0 }
      ],
      head: [
        { time: 0, value: 0 },
        { time: 0.06666667, value: 5.634 },
        { time: 0.16666667, value: 2.627 },
        { time: 0.25, value: -1.188 },
        { time: 0.33333334, value: 0 }
      ],
      bow: [
        { time: 0, value: -19.281 },
        { time: 0.16666667, value: -9.409 },
        { time: 0.33333334, value: -19.281 }
      ]
    },
    scaleY: {
      body: [
        { time: 0, value: 0.96 },
        { time: 0.16666667, value: 1 },
        { time: 0.26666668, value: 0.97823733 },
        { time: 0.33333334, value: 0.96 }
      ]
    }
  },
  Attack: {
    duration: 1.8333334,
    loop: false,
    positions: {
      body: [
        { time: 0, x: 0.006000102, y: 0.1759999 },
        { time: 0.5, x: -0.007, y: 0.17599994 },
        { time: 0.9166667, x: 0.008, y: 0.179 },
        { time: 1.0833334, x: 0.074, y: 0.176 },
        { time: 1.5, x: 0.08, y: 0.17 },
        { time: 1.8333334, x: 0.006000102, y: 0.1759999 }
      ],
      head: [
        { time: 0, x: -0.03000003, y: 0.315 },
        { time: 0.5, x: -0.023, y: 0.325 },
        { time: 0.9166667, x: -0.01, y: 0.32 },
        { time: 1.0833334, x: -0.008, y: 0.322 },
        { time: 1.5, x: -0.005, y: 0.32 },
        { time: 1.8333334, x: -0.03000003, y: 0.315 }
      ],
      bow: [
        { time: 0, x: -0.04399988, y: 0.08099997 },
        { time: 0.5, x: 0.31, y: 0.41 },
        { time: 0.75, x: 0.177, y: 0.412 },
        { time: 0.9166667, x: 0.177, y: 0.412 },
        { time: 1, x: 0.38, y: 0.44 },
        { time: 1.1666666, x: 0.51, y: 0.41 },
        { time: 1.5, x: 0.34, y: 0.03 },
        { time: 1.8333334, x: -0.04399988, y: 0.08099997 }
      ],
      handLeft: [
        { time: 0, x: 0, y: 0 },
        { time: 0.5, x: 0.036, y: 0.006 },
        { time: 0.9166667, x: 0.042, y: 0.012 },
        { time: 1, x: -0.005, y: 0.015 },
        { time: 1.1666666, x: 0.042, y: 0.023 },
        { time: 1.5, x: 0.07, y: 0.011 },
        { time: 1.8333334, x: 0, y: 0 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 0 },
        { time: 0.5, value: 3.858 },
        { time: 0.9166667, value: 4.691 },
        { time: 1.0833334, value: -5.592 },
        { time: 1.5, value: -6.895 },
        { time: 1.8333334, value: 0 }
      ],
      head: [
        { time: 0, value: 0 },
        { time: 0.5, value: 4.128 },
        { time: 0.9166667, value: 2.896 },
        { time: 1.0833334, value: 2.489 },
        { time: 1.5, value: 4.791 },
        { time: 1.8333334, value: 0 }
      ],
      bow: [
        { time: 0, value: 0 },
        { time: 0.5, value: 100.285 },
        { time: 0.75, value: 107.885 },
        { time: 0.9166667, value: 107.885 },
        { time: 1, value: 98.377 },
        { time: 1.1666666, value: 89.084 },
        { time: 1.5, value: 9.523 },
        { time: 1.8333334, value: 0 }
      ]
    },
    alphas: {
      arrow: [
        { time: 0.3, value: 0 },
        { time: 0.36666667, value: 1 },
        { time: 0.9166667, value: 1 },
        { time: 0.96666664, value: 0 }
      ]
    }
  },
  Jump: {
    duration: 0.9166667,
    loop: true,
    positions: {
      body: [
        { time: 0, x: 0.006000102, y: 0.1759999 },
        { time: 0.083333336, x: 0.006000102, y: 0.152 },
        { time: 0.33333334, x: 0.006000102, y: 0.472 },
        { time: 0.65, x: 0.006000102, y: 0.446 },
        { time: 0.81666666, x: 0.006000102, y: 0.152 },
        { time: 0.9166667, x: 0.006000102, y: 0.1759999 }
      ],
      head: [
        { time: 0, x: -0.03000003, y: 0.315 },
        { time: 0.083333336, x: -0.006, y: 0.252 },
        { time: 0.16666667, x: -0.006, y: 0.323 },
        { time: 0.73333335, x: -0.001, y: 0.294 },
        { time: 0.8666667, x: 0.018, y: 0.296 },
        { time: 0.9166667, x: -0.03000003, y: 0.315 }
      ],
      handRight: [
        { time: 0, x: 0, y: 0 },
        { time: 0.06666667, x: 0.015, y: -0.015 },
        { time: 0.15, x: 0.122, y: 0.277 },
        { time: 0.31666666, x: 0.044, y: 0.352 },
        { time: 0.6166667, x: 0.005, y: 0.333 },
        { time: 0.71666664, x: 0.002, y: 0.163 },
        { time: 0.8333333, x: 0, y: 0 }
      ],
      handLeft: [
        { time: 0, x: 0, y: 0 },
        { time: 0.06666667, x: -0.06, y: -0.029 },
        { time: 0.15, x: -0.017, y: 0.072 },
        { time: 0.31666666, x: -0.057, y: 0.322 },
        { time: 0.6166667, x: -0.035, y: 0.233 },
        { time: 0.75, x: 0.011, y: 0.051 },
        { time: 0.8333333, x: 0, y: 0 }
      ]
    },
    rotations: {
      head: [
        { time: 0, value: 0 },
        { time: 0.16666667, value: 8.705 },
        { time: 0.73333335, value: -1.063 },
        { time: 0.9166667, value: 0 }
      ],
      handRight: [
        { time: 0, value: 0 },
        { time: 0.06666667, value: -8.132 },
        { time: 0.15, value: 31.375 },
        { time: 0.31666666, value: 15.915 },
        { time: 0.6166667, value: -1.707 },
        { time: 0.71666664, value: -11.474 },
        { time: 0.8333333, value: 0 }
      ],
      handLeft: [
        { time: 0, value: 0 },
        { time: 0.06666667, value: 0.106 },
        { time: 0.15, value: -2.2 },
        { time: 0.31666666, value: -16.7 },
        { time: 0.6166667, value: -3.592 },
        { time: 0.75, value: 4.449 },
        { time: 0.8333333, value: 0 }
      ]
    },
    scaleY: {
      body: [
        { time: 0, value: 1 },
        { time: 0.083333336, value: 0.93 },
        { time: 0.33333334, value: 1.03 },
        { time: 0.65, value: 1 },
        { time: 0.81666666, value: 0.93 },
        { time: 0.9166667, value: 1 }
      ]
    }
  },
  Dance: {
    duration: 0.6666667,
    loop: true,
    positions: {
      body: [
        { time: 0, x: 0.006000102, y: 0.1759999 },
        { time: 0.16666667, x: 0.006000102, y: 0.154 },
        { time: 0.33333334, x: 0.006000102, y: 0.1759999 },
        { time: 0.5, x: 0.006000102, y: 0.154 },
        { time: 0.6666667, x: 0.006000102, y: 0.1759999 }
      ],
      head: [
        { time: 0, x: -0.03000003, y: 0.315 },
        { time: 0.16666667, x: 0.01, y: 0.277 },
        { time: 0.33333334, x: -0.03000003, y: 0.315 },
        { time: 0.5, x: -0.07, y: 0.286 },
        { time: 0.6666667, x: -0.03000003, y: 0.315 }
      ],
      handLeft: [
        { time: 0, x: 0, y: 0 },
        { time: 0.16666667, x: 0.027, y: -0.001 },
        { time: 0.33333334, x: 0, y: 0 },
        { time: 0.5, x: 0.004, y: -0.02 },
        { time: 0.6666667, x: 0, y: 0 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 8.182 },
        { time: 0.33333334, value: -9.011 },
        { time: 0.6666667, value: 8.182 }
      ],
      handRight: [
        { time: 0, value: -1.3430009 },
        { time: 0.16666667, value: -8.448 },
        { time: 0.5, value: 5.762 },
        { time: 0.6666667, value: -1.3430009 }
      ]
    },
    scaleY: {
      body: [
        { time: 0, value: 1 },
        { time: 0.16666667, value: 0.91 },
        { time: 0.33333334, value: 1 },
        { time: 0.5, value: 0.91 },
        { time: 0.6666667, value: 1 }
      ]
    }
  },
  Stun: {
    duration: 2,
    loop: true,
    positions: {
      body: [
        { time: 0, x: -0.009, y: 0.1759999 },
        { time: 1, x: 0.04, y: 0.1759999 },
        { time: 2, x: -0.009, y: 0.1759999 }
      ],
      head: [
        { time: 0, x: -0.050295997, y: 0.308112 },
        { time: 0.4, x: -0.095, y: 0.306 },
        { time: 1.4, x: 0.032, y: 0.312 },
        { time: 2, x: -0.050295997, y: 0.308112 }
      ],
      handRight: [
        { time: 0, x: 0.02, y: 0.02 },
        { time: 1, x: -0.044, y: -0.014 },
        { time: 2, x: 0.02, y: 0.02 }
      ],
      handLeft: [
        { time: 0, x: -0.028, y: 0.01 },
        { time: 1, x: 0.014, y: 0.005 },
        { time: 2, x: -0.028, y: 0.01 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 5.591 },
        { time: 1, value: -7.127 },
        { time: 2, value: 5.591 }
      ],
      head: [
        { time: 0, value: 10.945526 },
        { time: 0.4, value: 22.099 },
        { time: 1.4, value: -9.587 },
        { time: 2, value: 10.945526 }
      ],
      handLeft: [{ time: 0, value: -4.525 }],
      stunEyeLeft: [
        { time: 0, value: 0 },
        { time: 2, value: -360 }
      ],
      stunEyeRight: [
        { time: 0, value: 0 },
        { time: 2, value: -360 }
      ]
    },
    alphas: {
      normalEye: [{ time: 0, value: 0 }],
      stunEyeLeft: [{ time: 0, value: 1 }],
      stunEyeRight: [{ time: 0, value: 1 }]
    }
  },
  Defeat: {
    duration: 3,
    loop: true,
    positions: {
      body: [
        { time: 0, x: -0.016, y: 0.1759999 },
        { time: 1.5, x: 0.028, y: 0.17 },
        { time: 3, x: -0.016, y: 0.1759999 }
      ],
      head: [
        { time: 0, x: 0.071, y: 0.213 },
        { time: 1.5, x: 0.034, y: 0.212 },
        { time: 3, x: 0.071, y: 0.213 }
      ],
      handRight: [
        { time: 0, x: 0, y: -0.056 },
        { time: 1.5, x: 0.014, y: -0.059 },
        { time: 3, x: 0, y: -0.056 }
      ],
      handLeft: [
        { time: 0, x: -0.05, y: -0.014 },
        { time: 1.5, x: -0.008, y: -0.08 },
        { time: 3, x: -0.05, y: -0.014 }
      ]
    },
    rotations: {
      body: [
        { time: 0, value: 16.021 },
        { time: 1.5, value: -4.583 },
        { time: 3, value: 16.021 }
      ],
      head: [
        { time: 0, value: -20.658 },
        { time: 1.5, value: -8.335 },
        { time: 3, value: -20.658 }
      ],
      handRight: [
        { time: 0, value: -9.96 },
        { time: 1.5, value: -6.79 },
        { time: 3, value: -9.96 }
      ],
      handLeft: [
        { time: 0, value: -20.233 },
        { time: 1.5, value: -8.575 },
        { time: 3, value: -20.233 }
      ]
    },
    alphas: {
      normalEye: [{ time: 0, value: 0 }],
      defeatEyeLeft: [{ time: 0, value: 1 }],
      defeatEyeRight: [{ time: 0, value: 1 }]
    }
  }
};

class MainScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Graphics;
  private playerHealthBar?: Phaser.GameObjects.Graphics;
  private playerHealth = PLAYER_MAX_HEALTH;
  private playerProgressBar?: Phaser.GameObjects.Graphics;
  private secondPlayer?: Phaser.GameObjects.Graphics;
  private secondPlayerHealthBar?: Phaser.GameObjects.Graphics;
  private secondPlayerHealth = PLAYER_MAX_HEALTH;
  private secondPlayerVisual?: Phaser.GameObjects.Container;
  private secondPlayerKeys?: SecondPlayerKeys;
  private secondPlayerProgressBar?: Phaser.GameObjects.Graphics;
  private progressSliderFill?: Phaser.GameObjects.Rectangle;
  private progressSliderHandle?: Phaser.GameObjects.Arc;
  private progressSliderText?: Phaser.GameObjects.Text;
  private playerProgress = 0;
  private playerPrefabVisual?: Phaser.GameObjects.Container;
  private playerPrefabAnimationNodes?: PrefabAnimationNodes;
  private playerPrefabAnimationSprites?: PrefabAnimationSprites;
  private secondPlayerPrefabAnimationNodes?: PrefabAnimationNodes;
  private secondPlayerPrefabAnimationSprites?: PrefabAnimationSprites;
  private playerChestSprite?: PrefabAnimationSprite;
  private playerHairSprite?: PrefabAnimationSprite;
  private secondPlayerChestSprite?: PrefabAnimationSprite;
  private secondPlayerHairSprite?: PrefabAnimationSprite;
  private playerHandToolSprite?: PrefabAnimationSprite;
  private secondPlayerHandToolSprite?: PrefabAnimationSprite;
  private isPlayerWearingClothing = true;
  private isSecondPlayerWearingClothing = true;
  private currentHandToolIndex = 0;
  private handToolSelectedText?: Phaser.GameObjects.Text;
  private teleportButton?: Phaser.GameObjects.Rectangle;
  private teleportText?: Phaser.GameObjects.Text;
  private playerPrefabAnimationState: PlayerPrefabAnimationName = 'Idle';
  private playerPrefabAnimationTime = 0;
  private secondPlayerAnimationState: PlayerPrefabAnimationName = 'Idle';
  private secondPlayerPrefabAnimationTime = 0;
  private secondPlayerProgress = 0;
  private playerWorkshopProgress = 0;
  private secondPlayerWorkshopProgress = 0;
  private playerFirefightingRoom?: FireRoomId;
  private secondPlayerFirefightingRoom?: FireRoomId;
  private playerExtinguisherPickupProgress = 0;
  private secondPlayerExtinguisherPickupProgress = 0;
  private playerClothingPickupProgress = 0;
  private secondPlayerClothingPickupProgress = 0;
  private playerPickupExtinguisher?: DroppedExtinguisher;
  private secondPlayerPickupExtinguisher?: DroppedExtinguisher;
  private playerPickupClothing?: DroppedClothing;
  private secondPlayerPickupClothing?: DroppedClothing;
  private secondPlayerState: PlayerState = 'Normal';
  private secondPlayerHandToolIndex = 0;
  private keys?: PlayerKeys;
  private uiPanel?: Phaser.GameObjects.Container;
  private isUiPanelVisible = false;
  private controlsHelpPanel?: Phaser.GameObjects.Container;
  private driveOverlay?: Phaser.GameObjects.Image;
  private livingOverlay?: Phaser.GameObjects.Image;
  private plantOverlay?: Phaser.GameObjects.Image;
  private repoOverlay?: Phaser.GameObjects.Image;
  private outerWrongOverlay?: Phaser.GameObjects.Image;
  private isOuterWrong = false;
  private wasPlayerInsideOuterWrong = false;
  private wasSecondPlayerInsideOuterWrong = false;
  private outerRepairButton?: Phaser.GameObjects.Rectangle;
  private outerRepairText?: Phaser.GameObjects.Text;
  private driveWarningSign?: Phaser.GameObjects.Image;
  private livingWarningSign?: Phaser.GameObjects.Image;
  private plantWarningSign?: Phaser.GameObjects.Image;
  private rockWarningSign?: Phaser.GameObjects.Image;
  private swapWarningSign?: Phaser.GameObjects.Image;
  private swapWarningText?: Phaser.GameObjects.Text;
  private swapWarningRemaining = 0;
  private energyWarningSign?: Phaser.GameObjects.Image;
  private gameProgress = GAME_PROGRESS_MAX;
  private gameProgressTrack?: Phaser.GameObjects.Rectangle;
  private gameProgressFill?: Phaser.GameObjects.Rectangle;
  private snowNoiseOverlay?: Phaser.GameObjects.TileSprite;
  private snowNoiseBaseLayer?: Phaser.GameObjects.TileSprite;
  private snowNoiseFlickerTimer = 0;
  private snowNoisePulseState = false;
  private driveWarningBlinkTime = 0;
  private driveStateButton?: Phaser.GameObjects.Rectangle;
  private driveSelectedText?: Phaser.GameObjects.Text;
  private currentDriveRoomOption = 'Normal';
  private livingStateButton?: Phaser.GameObjects.Rectangle;
  private livingSelectedText?: Phaser.GameObjects.Text;
  private currentLivingRoomOption = 'Normal';
  private plantStateButton?: Phaser.GameObjects.Rectangle;
  private plantSelectedText?: Phaser.GameObjects.Text;
  private currentPlantRoomOption = 'Normal';
  private repoStateButton?: Phaser.GameObjects.Rectangle;
  private repoSelectedText?: Phaser.GameObjects.Text;
  private currentRepoRoomOption = 'Full';
  private powerCrystalSprite?: Phaser.GameObjects.Sprite;
  private droppedExtinguishers: DroppedExtinguisher[] = [];
  private droppedClothingItems: DroppedClothing[] = [];
  private resourceCounters = new Map<ResourceCounterKind, ResourceCounterUi>();
  private resourceCounts: Record<ResourceCounterKind, number> = {
    metalDebris: 0,
    iceCrystal: 0
  };
  private bgm?: VolumeSound;
  private alarmSound?: Phaser.Sound.BaseSound;
  private isBgmMuted = false;
  private isGravityEnabled = true;
  private playerVelocityY = 0;
  private playerSwapImpulse: SwapImpulseState = { x: 0, y: 0, remaining: 0 };
  private isSecondPlayerGravityEnabled = false;
  private isSecondPlayerWhiteCollisionEnabled = true;
  private secondPlayerVelocityY = 0;
  private secondPlayerSwapImpulse: SwapImpulseState = { x: 0, y: 0, remaining: 0 };
  private isPlayerInsideShip = true;
  private isSecondPlayerInsideShip = false;
  private playerState: PlayerState = 'Normal';
  private readonly playerStateTransitions: Record<PlayerState, PlayerStateTransition> = {
    Normal: (context) => {
      if (context.isTouchingLadder && context.isVerticalInputPressed) {
        return 'Climbing';
      }

      if (context.isInsideHealRoom) {
        return 'Healing';
      }

      if (context.isOuterWrong && context.isInsideOuterWrongRoom) {
        return 'Outer-Repairing';
      }

      if (context.isInsideDriveRoom) {
        return 'Driving';
      }

      if (context.isInsideRepoFullRoom) {
        return 'Repoing';
      }

      if (context.isInsideWorkshopRoom) {
        return 'Working';
      }

      return 'Normal';
    },
    Climbing: (context) => {
      if (context.isTouchingLadder) {
        return 'Climbing';
      }

      return 'Normal';
    },
    Healing: (context) => {
      if (context.isTouchingLadder && context.isVerticalInputPressed) {
        return 'Climbing';
      }

      return context.isInsideHealRoom ? 'Healing' : 'Normal';
    },
    Driving: (context) => {
      if (context.isTouchingLadder && context.isVerticalInputPressed) {
        return 'Climbing';
      }

      if (context.isInsideDriveRoom && context.isDriveRoomWrong && context.isRepairInputPressed) {
        return 'Driving-Repairing';
      }

      if (context.isInsideDriveRoom) {
        return 'Driving';
      }

      return 'Normal';
    },
    'Driving-Repairing': (context) => {
      if (context.isTouchingLadder && context.isVerticalInputPressed) {
        return 'Climbing';
      }

      if (context.isInsideDriveRoom) {
        return 'Driving-Repairing';
      }

      return 'Normal';
    },
    Repoing: (context) => context.isInsideRepoFullRoom ? 'Repoing' : 'Normal',
    'Outer-Repairing': (context) => context.isOuterWrong && context.isInsideOuterWrongRoom ? 'Outer-Repairing' : 'Normal',
    Working: (context) => context.isInsideWorkshopRoom ? 'Working' : 'Normal',
    Firefighting: (context) => context.isInsideBurningRoom ? 'Firefighting' : 'Normal'
  };
  private isWhiteCollisionEnabled = true;
  private isCollisionDebugVisible = false;
  private collisionBodyDebug?: Phaser.GameObjects.Graphics;
  private collisionData?: Uint8Array;
  private ladderData?: Uint8Array;
  private outsideCollisionData?: Uint8Array;
  private outsideCollisionWidth = 0;
  private outsideCollisionHeight = 0;
  private roomMasks = new Map<string, RoomMaskData>();
  private collisionWidth = 0;
  private collisionHeight = 0;
  private gravityButton?: Phaser.GameObjects.Rectangle;
  private gravityText?: Phaser.GameObjects.Text;
  private stateText?: Phaser.GameObjects.Text;
  private coordinateText?: Phaser.GameObjects.Text;
  private playerInfoText?: Phaser.GameObjects.Text;
  private secondPlayerInfoText?: Phaser.GameObjects.Text;
  private playerPanelControls?: PlayerPanelControls;
  private secondPlayerPanelControls?: PlayerPanelControls;
  private secondClock?: Phaser.GameObjects.Graphics;
  private swapClockSeconds = 0;
  private swapClockCompletedLaps = 0;
  private asteroids: AsteroidSprite[] = [];
  private alienSprites: AlienSprite[] = [];
  private alienSpawnTimer = 0;
  private nextAlienSpawnDelay = 0;
  private alienReticle?: Phaser.GameObjects.Image;
  private alienDamageStates = new WeakMap<AlienSprite, boolean>();
  private shipEnergy = SHIP_MAX_ENERGY;
  private shipEnergyText?: Phaser.GameObjects.Text;
  private metalDebrisCount = 0;
  private iceCrystalCount = 0;
  private resourcesText?: Phaser.GameObjects.Text;
  private asteroidSpawnTimer = 0;
  private nextAsteroidSpawnDelay = 0;
  private pixelAsteroidLaneSpawnTimer = 0;
  private nextPixelAsteroidLaneSpawnDelay = 0;
  private pixelAsteroidLaneWarningAsteroid?: AsteroidSprite;
  private gameStartTime = 0;
  private displayedGameSeconds = -1;
  private randomRoomFireEvent?: Phaser.Time.TimerEvent;
  private isGameStarted = false;
  private menuContainer?: Phaser.GameObjects.Container;
  private aboutContainer?: Phaser.GameObjects.Container;
  private menuShip?: Phaser.GameObjects.Image;
  private menuShipBaseX = 0;
  private menuShipBaseY = 0;
  private lastGamepadButtonStates = new Map<string, boolean>();
  private lastGamepadAxisSnapshot = new Map<string, string>();
  private hasLoggedNoGamepad = false;
  private wasSecondPlayerGamepadActionPressed = false;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('menuSpace', '/assets/scene/space.png');
    this.load.image('menuShip', '/assets/scene/spaceShip.png');
    this.load.image('githubIcon', GITHUB_ICON_SVG);
    this.load.image('creatorAvatarShirai90', 'https://avatars.githubusercontent.com/u/178642437?v=4');
    this.load.image('creatorAvatarArnoliudaxia', 'https://avatars.githubusercontent.com/u/21056014?v=4');
    this.load.image('spaceBg1', '/assets/scene/spaceBg/星空1.png');
    this.load.image('spaceBg2', '/assets/scene/spaceBg/星空2.png');
    this.load.image('spaceE', '/assets/scene/spaceBg/spaceE.png');
    this.load.image('spaceShipFire', '/assets/VFX/fireV.png');
    this.load.image('background', '/assets/scene/spaceShip.png');
    this.load.image('collision', '/assets/scene/physic.png');
    this.load.image('collisionOut', '/assets/scene/physicOut.png');
    this.load.image('outerWrong', '/assets/scene/ShipRoom/OuterWrong.png');
    this.load.image('alien', '/assets/scene/Alien/外星人.png');
    this.load.image('alienReticle', '/assets/scene/Alien/瞄准.png');
    this.load.image('warningSign', '/assets/VFX/warningSign.png');
    this.load.image('warningSignRock', '/assets/VFX/warningSignRock.png');
    EXPLOSION_FRAME_KEYS.forEach((key, index) => {
      this.load.image(key, `/assets/Sprite/explosion/explosion${index + 1}.png`);
    });
    POWER_CRYSTAL_FRAME_KEYS.forEach((key, index) => {
      const frameNumber = (index + 1).toString().padStart(3, '0');

      this.load.image(key, `/assets/Sprite/Crystal Drain-cached-frames/frame_${frameNumber}.png`);
    });
    ASTEROID_ASSETS.forEach((asset) => {
      this.load.image(asset.key, asset.path);
    });
    PLAYER_HAND_TOOL_ASSETS.forEach((asset) => {
      if (asset.key && asset.path) {
        this.load.image(asset.key, asset.path);
      }
    });
    ROOM_CONFIGS.forEach((room) => {
      room.layerOptions.forEach((option) => {
        if (option.textureKey && option.assetPath) {
          this.load.image(option.textureKey, option.assetPath);
        }
      });
    });
    this.load.image('playerPrefabBody', '/assets/player-prefab/body.png');
    this.load.image('playerPrefabChest1', '/assets/player-prefab/chest/cheat-1.png');
    this.load.image('playerPrefabChest2', '/assets/player-prefab/chest/chest-2.png');
    this.load.image('playerPrefabChestOuter', '/assets/player-prefab/chest/chest-outer.png');
    this.load.image('playerPrefabHead', '/assets/player-prefab/head.png');
    this.load.image('playerPrefabHair1', '/assets/player-prefab/hair/hair-1.png');
    this.load.image('playerPrefabHair2', '/assets/player-prefab/hair/hair-2.png');
    this.load.image('playerPrefabEye', '/assets/player-prefab/eye.png');
    // this.load.image('playerPrefabShield', '/assets/player-prefab/shield.png');
    this.load.image('playerPrefabBowLineDown', '/assets/player-prefab/bow-line-down.png');
    this.load.image('playerPrefabBow', '/assets/player-prefab/bow.png');
    this.load.image('playerPrefabBowLineUp', '/assets/player-prefab/bow-line-up.png');
    this.load.image('playerPrefabEyeStun', '/assets/player-prefab/eye-stun.png');
    this.load.image('playerPrefabEyeDefeat', '/assets/player-prefab/eye-defeat.png');
    this.load.audio('bgm', '/assets/Sound/BGM/HOYO-MiX - 危机预知 Crises.mp3');
    this.load.audio('alarmLoop', '/assets/Sound/警报长循环.mp3');
  }

  create() {
    const { width, height } = this.scale;
    this.gameStartTime = 0;
    this.displayedGameSeconds = -1;

    const spaceBg2 = this.add.image(width / 2, height / 2, 'spaceBg2');
    const spaceBg2Scale = Math.max(width / spaceBg2.width, height / spaceBg2.height);
    spaceBg2.setScale(spaceBg2Scale).setScrollFactor(0);
    const spaceBg1 = this.add.image(width / 2, height / 2, 'spaceBg1');
    const spaceBg1Scale = Math.max(width / spaceBg1.width, height / spaceBg1.height);
    spaceBg1.setScale(spaceBg1Scale).setScrollFactor(0).setVisible(false);
    this.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        spaceBg1.setVisible(!spaceBg1.visible);
      }
    });
    const spaceE = this.add.image(width / 2, height / 2, 'spaceE');
    const spaceEScale = Math.max(width / spaceE.width, height / spaceE.height);
    spaceE.setScale(spaceEScale).setScrollFactor(0);
    this.nextAlienSpawnDelay = Phaser.Math.Between(ALIEN_MIN_SPAWN_DELAY, ALIEN_MAX_SPAWN_DELAY);
    this.nextAsteroidSpawnDelay = Phaser.Math.Between(ASTEROID_MIN_SPAWN_DELAY, ASTEROID_MAX_SPAWN_DELAY);
    this.nextPixelAsteroidLaneSpawnDelay = Phaser.Math.Between(
      PIXEL_ASTEROID_LANE_MIN_SPAWN_DELAY,
      PIXEL_ASTEROID_LANE_MAX_SPAWN_DELAY
    );

    const spaceShipFire = this.add.image(width / 2, height / 2, 'spaceShipFire');
    const fireScale = Math.max(width / spaceShipFire.width, height / spaceShipFire.height);
    spaceShipFire.setScale(fireScale).setScrollFactor(0).setVisible(false);
    this.tweens.add({
      targets: spaceShipFire,
      x: width / 2 + 50,
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const background = this.add.image(width / 2, height / 2, 'background');
    const scale = Math.max(width / background.width, height / background.height);
    background.setScale(scale).setScrollFactor(0);

    this.createSnowNoiseOverlay(width, height);

    this.add
      .image(width / 2, height / 2, HEAL_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
      .image(width / 2, height / 2, LEFT_UP_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
      .image(width / 2, height / 2, WORKSHOP_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.livingOverlay = this.add
      .image(width / 2, height / 2, LIVING_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.plantOverlay = this.add
      .image(width / 2, height / 2, PLANT_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
      .image(width / 2, height / 2, TUBE_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
      .image(width / 2, height / 2, POWER_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.repoOverlay = this.add
      .image(width / 2, height / 2, REPO_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    const driveOverlay = this.add
      .image(width / 2, height / 2, DRIVE_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);
    this.driveOverlay = driveOverlay;
    this.outerWrongOverlay = this.add
      .image(width / 2, height / 2, 'outerWrong')
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(false);
    this.driveWarningSign = this.add
      .image(DRIVE_WARNING_SIGN_X, DRIVE_WARNING_SIGN_Y, 'warningSign')
      .setDisplaySize(DRIVE_WARNING_SIGN_SIZE, DRIVE_WARNING_SIGN_SIZE)
      .setVisible(false);
    this.livingWarningSign = this.add
      .image(LIVING_WARNING_SIGN_X, LIVING_WARNING_SIGN_Y, 'warningSign')
      .setDisplaySize(DRIVE_WARNING_SIGN_SIZE, DRIVE_WARNING_SIGN_SIZE)
      .setVisible(false);
    this.plantWarningSign = this.add
      .image(PLANT_WARNING_SIGN_X, PLANT_WARNING_SIGN_Y, 'warningSign')
      .setDisplaySize(DRIVE_WARNING_SIGN_SIZE, DRIVE_WARNING_SIGN_SIZE)
      .setVisible(false);
    this.rockWarningSign = this.add
      .image(ROCK_WARNING_SIGN_X, ROCK_WARNING_SIGN_Y, 'warningSignRock')
      .setDisplaySize(ROCK_WARNING_SIGN_SIZE*2, ROCK_WARNING_SIGN_SIZE)
      .setVisible(false);
    this.swapWarningSign = this.add
      .image(width /2, SWAP_WARNING_Y, 'warningSignRock')
      .setDisplaySize(SWAP_WARNING_ICON_SIZE*2, SWAP_WARNING_ICON_SIZE)
      .setDepth(10020)
      .setScrollFactor(0)
      .setVisible(false);
    this.swapWarningText = this.add
      .text(width / 2, SWAP_WARNING_Y + SWAP_WARNING_ICON_SIZE / 2 + 18, '', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#020617',
        strokeThickness: 5
      })
      .setOrigin(0.5, 0)
      .setDepth(10020)
      .setScrollFactor(0)
      .setVisible(false);

    this.createGameProgressUi(width);

    this.createCollisionMask();
    this.createRoomMasks();
    this.anims.create({
      key: EXPLOSION_ANIMATION_KEY,
      frames: EXPLOSION_FRAME_KEYS.map((key) => ({ key })),
      frameRate: 16,
      repeat: 0
    });
    this.anims.create({
      key: POWER_CRYSTAL_ANIMATION_KEY,
      frames: POWER_CRYSTAL_FRAME_KEYS.map((key) => ({ key })),
      frameRate: 16,
      repeat: 0
    });
    this.powerCrystalSprite = this.add
      .sprite(POWER_CRYSTAL_X, POWER_CRYSTAL_Y, POWER_CRYSTAL_FRAME_KEYS[0])
      .setDisplaySize(POWER_CRYSTAL_WIDTH, POWER_CRYSTAL_HEIGHT);
    this.energyWarningSign = this.add
      .image(POWER_CRYSTAL_X, POWER_CRYSTAL_Y - POWER_CRYSTAL_HEIGHT / 2 - 36, 'warningSign')
      .setDisplaySize(DRIVE_WARNING_SIGN_SIZE, DRIVE_WARNING_SIGN_SIZE)
      .setVisible(false);
    this.powerCrystalSprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.powerCrystalSprite?.setTexture(POWER_CRYSTAL_FRAME_KEYS[0]);
    });

    this.createResourceCounters();

    const collisionOverlay = this.createCollisionDebugOverlay(scale);

    this.bgm = this.sound.add('bgm', { loop: true, volume: BGM_VOLUME }) as VolumeSound;
    this.bgm.play();
    this.alarmSound = this.sound.add('alarmLoop', { loop: true, volume: 0.62 });

    this.player = this.add.graphics({ x: width / 2, y: height / 2 });
    this.player
      .fillStyle(0x38bdf8, 1)
      .fillRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .lineStyle(3, 0xe0f2fe, 1)
      .strokeRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .setVisible(false);
    this.playerPrefabVisual = this.createPlayerPrefabVisual(this.player.x, this.player.y);
    this.secondPlayer = this.add.graphics({ x: PLAYER_OUTSIDE_SHIP_X, y: PLAYER_OUTSIDE_SHIP_Y });
    this.secondPlayer
      .fillStyle(0xa78bfa, 1)
      .fillRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .lineStyle(3, 0xede9fe, 1)
      .strokeRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .setVisible(false);
    this.secondPlayerVisual = this.createSecondPlayerPrefabVisual(this.secondPlayer.x, this.secondPlayer.y);
    this.secondPlayerHealthBar = this.add.graphics();
    this.updateSecondPlayerHealthBar();
    this.secondPlayerProgressBar = this.add.graphics();
    this.secondPlayerProgressBar.setVisible(false);
    this.updateSecondPlayerProgressBar();
    this.playerHealthBar = this.add.graphics();
    this.updatePlayerHealthBar();
    this.updatePlayerSpeedUi();
    this.playerProgressBar = this.add.graphics();
    this.playerProgressBar.setVisible(false);
    this.updatePlayerProgressBar();
    this.collisionBodyDebug = this.add.graphics().setVisible(false).setDepth(1000);
    this.exposePlayerAnimationInterface();

    this.keys = this.input.keyboard?.addKeys('W,A,S,D,E,H') as PlayerKeys | undefined;
    this.secondPlayerKeys = this.input.keyboard?.addKeys({
      UP: Phaser.Input.Keyboard.KeyCodes.UP,
      LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
      DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
      RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      L: Phaser.Input.Keyboard.KeyCodes.L
    }) as SecondPlayerKeys | undefined;
    this.initializeGamepadLogging();

    this.secondClock = this.add.graphics().setScrollFactor(0);
    this.drawSecondClock(0);

    const controlsPanel = this.add.container(width - 16, height - 16).setScrollFactor(0).setDepth(30001);
    this.controlsHelpPanel = controlsPanel;
    const controlsBackground = this.add
      .rectangle(0, 0, 346, 184, 0x0f172a, 0.82)
      .setOrigin(1, 1);
    const controlsTitle = this.add.text(-330, -170, '操作说明', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });

    const createKeycap = (label: string, x: number, y: number) => {
      const keycap = this.add.container(x, y);
      const keyBackground = this.add
        .rectangle(0, 0, 32, 30, 0x1e293b, 1)
        .setStrokeStyle(2, 0xcbd5e1, 1);
      const keyText = this.add
        .text(0, 0, label, {
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '16px',
          color: '#ffffff'
        })
        .setOrigin(0.5);

      keycap.add([keyBackground, keyText]);

      return keycap;
    };

    const createGamepadButton = (label: string, x: number, y: number, color = 0x1e293b) => {
      const button = this.add.container(x, y);
      const background = this.add.circle(0, 0, 16, color, 1).setStrokeStyle(2, 0xcbd5e1, 1);
      const text = this.add
        .text(0, 0, label, {
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '15px',
          color: '#ffffff'
        })
        .setOrigin(0.5);

      button.add([background, text]);

      return button;
    };

    const createStickIcon = (x: number, y: number) => {
      const stick = this.add.container(x, y);
      const outer = this.add.circle(0, 0, 16, 0x1e293b, 1).setStrokeStyle(2, 0xcbd5e1, 1);
      const inner = this.add.circle(0, 0, 7, 0x94a3b8, 1);
      const label = this.add
        .text(24, -8, 'LS', {
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '13px',
          color: '#cbd5e1'
        })
        .setOrigin(0, 0);

      stick.add([outer, inner, label]);

      return stick;
    };

    const createDpadIcon = (x: number, y: number) => {
      const dpad = this.add.container(x, y);
      const vertical = this.add.rectangle(0, 0, 18, 46, 0x1e293b, 1).setStrokeStyle(2, 0xcbd5e1, 1);
      const horizontal = this.add.rectangle(0, 0, 46, 18, 0x1e293b, 1).setStrokeStyle(2, 0xcbd5e1, 1);
      const label = this.add
        .text(30, -10, 'D-Pad', {
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '13px',
          color: '#cbd5e1'
        })
        .setOrigin(0, 0);

      dpad.add([vertical, horizontal, label]);

      return dpad;
    };

    const playerColumnLabel = this.add.text(-330, -138, 'Player', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#93c5fd'
    });
    const moveColumnLabel = this.add.text(-246, -138, '移动', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#93c5fd'
    });
    const interactColumnLabel = this.add.text(-74, -138, '互动', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#93c5fd'
    });
    const playerOneLabel = this.add.text(-330, -110, 'P1', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#cbd5e1'
    });
    const keyW = createKeycap('W', -246, -102);
    const keyA = createKeycap('A', -208, -102);
    const keyS = createKeycap('S', -170, -102);
    const keyD = createKeycap('D', -132, -102);
    const keyE = createKeycap('E', -64, -102);
    const playerTwoLabel = this.add.text(-330, -68, 'P2', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#cbd5e1'
    });
    const keyLeft = createKeycap('←', -246, -60);
    const keyUp = createKeycap('↑', -208, -60);
    const keyDown = createKeycap('↓', -170, -60);
    const keyRight = createKeycap('→', -132, -60);
    const keyL = createKeycap('L', -64, -60);
    const playerTwoGamepadLabel = this.add.text(-330, -26, 'P2 Pad', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#cbd5e1'
    });
    const dpadIcon = createDpadIcon(-238, -18);
    const stickIcon = createStickIcon(-190, -18);
    const gamepadA = createGamepadButton('A', -64, -18, 0x16a34a);

    controlsPanel.add([
      controlsBackground,
      controlsTitle,
      playerColumnLabel,
      moveColumnLabel,
      interactColumnLabel,
      playerOneLabel,
      keyW,
      keyA,
      keyS,
      keyD,
      keyE,
      playerTwoLabel,
      keyLeft,
      keyUp,
      keyDown,
      keyRight,
      keyL,
      playerTwoGamepadLabel,
      dpadIcon,
      stickIcon,
      gamepadA
    ]);

    const panel = this.add.container(16, 16).setScrollFactor(0);
    this.uiPanel = panel;
    panel.setVisible(this.isUiPanelVisible);
    const panelBackground = this.add
      .rectangle(0, 0, 220, 752, 0x0f172a, 0.82)
      .setOrigin(0);
    const playerGroupLabel = this.add.text(14, 16, 'Controls', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });
    const soundLabel = this.add.text(14, 286, 'BGM', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const muteButton = this.add
      .rectangle(PANEL_CONTROL_X, 281, PANEL_CONTROL_WIDTH, 28, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const muteText = this.add.text(109, 287, 'Sound On', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });

    const collisionLabel = this.add.text(14, 330, 'Collision', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const collisionButton = this.add
      .rectangle(PANEL_CONTROL_X, 325, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const collisionText = this.add.text(127, 331, 'Hidden', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });

    const gravityLabel = this.add.text(14, 142, 'Gravity', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const gravityButton = this.add
      .rectangle(PANEL_CONTROL_X, 137, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const gravityText = this.add.text(133, 143, 'On', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });
    this.gravityButton = gravityButton;
    this.gravityText = gravityText;
    gravityButton.setFillStyle(0x22c55e, 1);

    const stateLabel = this.add.text(14, 98, 'Player State', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.stateText = this.add.text(116, 98, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const animationLabel = this.add.text(14, 186, 'Animation', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const animationButton = this.add
      .rectangle(PANEL_CONTROL_X, 181, PANEL_CONTROL_WIDTH, 32, 0x7c3aed, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const animationText = this.add.text(132, 188, this.playerPrefabAnimationState, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const shipFireLabel = this.add.text(14, 374, 'Ship Fire', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const shipFireButton = this.add
      .rectangle(PANEL_CONTROL_X, 369, PANEL_CONTROL_WIDTH, 32, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const shipFireText = this.add.text(127, 376, 'Hidden', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const progressLabel = this.add.text(14, 230, 'Progress', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const progressSliderTrack = this.add
      .rectangle(PANEL_CONTROL_X, 241, PANEL_SLIDER_WIDTH, 6, 0x334155, 1)
      .setOrigin(0, 0.5)
      .setInteractive(new Phaser.Geom.Rectangle(0, 0, PANEL_SLIDER_WIDTH, 16), Phaser.Geom.Rectangle.Contains);
    this.progressSliderFill = this.add
      .rectangle(PANEL_CONTROL_X, 241, 0, 6, 0x22c55e, 1)
      .setOrigin(0, 0.5);
    this.progressSliderHandle = this.add
      .circle(PANEL_CONTROL_X, 241, 8, 0xffffff, 1)
      .setStrokeStyle(2, 0x22c55e)
      .setInteractive(new Phaser.Geom.Circle(8, 8, 10), Phaser.Geom.Circle.Contains);
    this.progressSliderText = this.add.text(178, 232, '0%', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });
    this.input.setDraggable(this.progressSliderHandle);
    this.updateProgressSlider(0);

    const sceneGroupLabel = this.add.text(14, 248, 'Scene', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });

    const label = this.add.text(14, 418, DRIVE_ROOM_CONFIG.label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });

    const selectedBackground = this.add
      .rectangle(PANEL_CONTROL_X, 413, PANEL_CONTROL_WIDTH, 32, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.driveStateButton = selectedBackground;
    const selectedText = this.add.text(104, 420, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.driveSelectedText = selectedText;

    const coordinateLabel = this.add.text(14, 54, 'Position', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.coordinateText = this.add.text(96, 54, 'X: 0 Y: 0', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.updatePlayerCoordinateUi();

    const outerLabel = this.add.text(14, 462, 'Outer', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.outerRepairButton = this.add
      .rectangle(PANEL_CONTROL_X, 457, PANEL_CONTROL_WIDTH, 32, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.outerRepairText = this.add.text(126, 464, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.updateOuterWrongUi();

    const livingLabel = this.add.text(14, 506, LIVING_ROOM_CONFIG.label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.livingStateButton = this.add
      .rectangle(PANEL_CONTROL_X, 501, PANEL_CONTROL_WIDTH, 32, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.livingSelectedText = this.add.text(104, 508, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const plantLabel = this.add.text(14, 550, PLANT_ROOM_CONFIG.label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.plantStateButton = this.add
      .rectangle(PANEL_CONTROL_X, 545, PANEL_CONTROL_WIDTH, 32, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.plantSelectedText = this.add.text(104, 552, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const repoLabel = this.add.text(14, 594, REPO_ROOM_CONFIG.label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.repoStateButton = this.add
      .rectangle(PANEL_CONTROL_X, 589, PANEL_CONTROL_WIDTH, 32, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.repoSelectedText = this.add.text(126, 596, 'Full', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const powerCrystalLabel = this.add.text(14, 638, 'Crystal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const powerCrystalButton = this.add
      .rectangle(PANEL_CONTROL_X, 633, PANEL_CONTROL_WIDTH, 32, 0x2563eb, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const powerCrystalText = this.add.text(126, 640, 'Energy', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const utilityGroupLabel = this.add.text(14, 682, 'Utility', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });
    const screenshotLabel = this.add.text(14, 720, 'Screenshot', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    const screenshotButton = this.add
      .rectangle(PANEL_CONTROL_X, 715, PANEL_CONTROL_WIDTH, 32, 0x0ea5e9, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const screenshotText = this.add.text(133, 722, 'Save', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    const handToolLabel = this.add.text(14, 274, 'Hand Tool', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    const handToolButton = this.add
      .rectangle(PANEL_CONTROL_X, 269, PANEL_CONTROL_WIDTH, 32, 0x7c3aed, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.handToolSelectedText = this.add.text(132, 276, PLAYER_HAND_TOOL_ASSETS[this.currentHandToolIndex].label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const teleportLabel = this.add.text(14, 54, 'Teleport', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.teleportButton = this.add
      .rectangle(PANEL_CONTROL_X, 49, PANEL_CONTROL_WIDTH, 32, 0x0ea5e9, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.teleportText = this.add.text(132, 56, 'Swap', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    const shipEnergyLabel = this.add.text(14, 98, 'Ship Energy', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });
    this.shipEnergyText = this.add.text(14, 128, `${this.shipEnergy}`, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
    });

    const resourcesLabel = this.add.text(14, 160, 'Resources', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });
    this.resourcesText = this.add.text(14, 190, '', {
      fontFamily: 'Arial, Helvetica, sans-serif',
    });
    this.updateResourcesUi();

    const createPlayerInfoPanel = (
      x: number,
      title: string,
      titleColor: string,
      onAnimation: () => void,
      onProgress: (progress: number) => void,
      onHandTool: () => void
    ): PlayerPanelControls => {
      const playerInfoPanel = this.add.container(x, 16).setScrollFactor(0);
      const playerInfoBackground = this.add
        .rectangle(0, 0, 220, 304, 0x0f172a, 0.82)
        .setOrigin(0);
      const playerInfoTitle = this.add.text(14, 16, title, {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '18px',
        color: titleColor
      });
      const playerInfoText = this.add.text(14, 48, '', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        color: '#ffffff',
        lineSpacing: 4
      });
      const panelAnimationLabel = this.add.text(14, 146, 'Animation', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
        color: '#ffffff'
      });
      const panelAnimationButton = this.add
        .rectangle(PANEL_CONTROL_X, 141, PANEL_CONTROL_WIDTH, 32, 0x7c3aed, 1)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
      const panelAnimationText = this.add.text(132, 148, 'Idle', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
        color: '#ffffff'
      });
      const panelProgressLabel = this.add.text(14, 190, 'Progress', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
        color: '#ffffff'
      });
      const panelProgressTrack = this.add
        .rectangle(PANEL_CONTROL_X, 201, PANEL_SLIDER_WIDTH, 6, 0x334155, 1)
        .setOrigin(0, 0.5)
        .setInteractive(new Phaser.Geom.Rectangle(0, 0, PANEL_SLIDER_WIDTH, 16), Phaser.Geom.Rectangle.Contains);
      const panelProgressFill = this.add
        .rectangle(PANEL_CONTROL_X, 201, 0, 6, 0x22c55e, 1)
        .setOrigin(0, 0.5);
      const panelProgressHandle = this.add
        .circle(PANEL_CONTROL_X, 201, 8, 0xffffff, 1)
        .setStrokeStyle(2, 0x22c55e)
        .setInteractive(new Phaser.Geom.Circle(8, 8, 10), Phaser.Geom.Circle.Contains);
      const panelProgressText = this.add.text(178, 192, '0%', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        color: '#ffffff'
      });
      const panelHandToolLabel = this.add.text(14, 238, 'Hand Tool', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
        color: '#ffffff'
      });
      const panelHandToolButton = this.add
        .rectangle(PANEL_CONTROL_X, 233, PANEL_CONTROL_WIDTH, 32, 0x7c3aed, 1)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
      const panelHandToolText = this.add.text(132, 240, 'None', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
        color: '#ffffff'
      });

      const setPanelProgressFromPointer = (pointer: Phaser.Input.Pointer) => {
        const progress = Phaser.Math.Clamp((pointer.x - (playerInfoPanel.x + PANEL_CONTROL_X)) / PANEL_SLIDER_WIDTH, 0, 1);

        onProgress(progress);
      };

      panelAnimationButton.on('pointerdown', onAnimation);
      panelProgressTrack.on('pointerdown', setPanelProgressFromPointer);
      panelProgressHandle.on('pointerdown', setPanelProgressFromPointer);
      panelProgressHandle.on('drag', setPanelProgressFromPointer);
      this.input.setDraggable(panelProgressHandle);
      panelHandToolButton.on('pointerdown', onHandTool);

      playerInfoPanel.add([
        playerInfoBackground,
        playerInfoTitle,
        playerInfoText,
        panelAnimationLabel,
        panelAnimationButton,
        panelAnimationText,
        panelProgressLabel,
        panelProgressTrack,
        panelProgressFill,
        panelProgressHandle,
        panelProgressText,
        panelHandToolLabel,
        panelHandToolButton,
        panelHandToolText
      ]);

      return {
        container: playerInfoPanel,
        infoText: playerInfoText,
        animationText: panelAnimationText,
        progressFill: panelProgressFill,
        progressHandle: panelProgressHandle,
        progressText: panelProgressText,
        handToolText: panelHandToolText
      };
    };
    this.playerPanelControls = createPlayerInfoPanel(
      252,
      'Player1',
      '#93c5fd',
      () => this.cyclePlayerPrefabAnimation(),
      (progress) => this.setPlayerProgress(progress),
      () => this.cyclePlayerHandTool()
    );
    this.secondPlayerPanelControls = createPlayerInfoPanel(
      488,
      'Player2',
      '#c4b5fd',
      () => this.cycleSecondPlayerAnimation(),
      (progress) => this.setSecondPlayerProgress(progress),
      () => this.cycleSecondPlayerHandTool()
    );
    this.playerPanelControls.container.setVisible(this.isUiPanelVisible);
    this.secondPlayerPanelControls.container.setVisible(this.isUiPanelVisible);
    this.playerInfoText = this.playerPanelControls.infoText;
    this.secondPlayerInfoText = this.secondPlayerPanelControls.infoText;
    this.updatePlayerInfoUi();
    this.updateSecondPlayerInfoUi();

    const playerTwoPanelLabel = this.add.text(14, 362, 'Player2', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#c4b5fd'
    }).setVisible(false);
    const legacySecondPlayerInfoText = this.add.text(14, 394, '', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      lineSpacing: 4
    }).setVisible(false);

    [
      gravityLabel,
      gravityButton,
      gravityText,
      stateLabel,
      this.stateText,
      animationLabel,
      animationButton,
      animationText,
      progressLabel,
      progressSliderTrack,
      this.progressSliderFill,
      this.progressSliderHandle,
      this.progressSliderText,
      handToolLabel,
      handToolButton,
      this.handToolSelectedText,
      coordinateLabel,
      this.coordinateText
    ].forEach((gameObject) => gameObject.setVisible(false));
    gravityButton.disableInteractive();
    animationButton.disableInteractive();
    progressSliderTrack.disableInteractive();
    this.progressSliderHandle.disableInteractive();
    handToolButton.disableInteractive();

    panel.add([
      panelBackground,
      playerGroupLabel,
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
      animationLabel,
      animationButton,
      animationText,
      shipFireLabel,
      shipFireButton,
      shipFireText,
      progressLabel,
      progressSliderTrack,
      this.progressSliderFill,
      this.progressSliderHandle,
      this.progressSliderText,
      handToolLabel,
      handToolButton,
      this.handToolSelectedText,
      teleportLabel,
      this.teleportButton,
      this.teleportText,
      shipEnergyLabel,
      this.shipEnergyText,
      resourcesLabel,
      this.resourcesText,
      playerTwoPanelLabel,
      legacySecondPlayerInfoText,
      sceneGroupLabel,
      label,
      selectedBackground,
      selectedText,
      coordinateLabel,
      this.coordinateText,
      outerLabel,
      this.outerRepairButton,
      this.outerRepairText,
      livingLabel,
      this.livingStateButton,
      this.livingSelectedText,
      plantLabel,
      this.plantStateButton,
      this.plantSelectedText,
      repoLabel,
      this.repoStateButton,
      this.repoSelectedText,
      powerCrystalLabel,
      powerCrystalButton,
      powerCrystalText,
      utilityGroupLabel,
      screenshotLabel,
      screenshotButton,
      screenshotText
    ]);

    selectedBackground.on('pointerdown', () => {
      this.setDriveRoomOption(this.currentDriveRoomOption === 'Wrong' ? 'Normal' : 'Wrong');
    });

    this.livingStateButton.on('pointerdown', () => {
      this.setLivingRoomOption(this.currentLivingRoomOption === 'Wrong' ? 'Normal' : 'Wrong');
    });

    this.plantStateButton.on('pointerdown', () => {
      this.setPlantRoomOption(this.currentPlantRoomOption === 'Wrong' ? 'Normal' : 'Wrong');
    });

    this.repoStateButton.on('pointerdown', () => {
      this.setRepoRoomOption(this.currentRepoRoomOption === 'Full' ? 'Empty' : 'Full');
    });

    powerCrystalButton.disableInteractive();

    screenshotButton.on('pointerdown', () => {
      this.captureScreenshot();
    });

    handToolButton.on('pointerdown', () => {
      this.cyclePlayerHandTool();
    });

    this.teleportButton.on('pointerdown', () => {
      this.swapPlayerPositions();
    });

    animationButton.on('pointerdown', () => {
      const currentIndex = PLAYER_PREFAB_ANIMATION_NAMES.indexOf(this.playerPrefabAnimationState);
      const nextAnimation = PLAYER_PREFAB_ANIMATION_NAMES[(currentIndex + 1) % PLAYER_PREFAB_ANIMATION_NAMES.length];

      this.playPlayerPrefabAnimation(nextAnimation);
      animationText.setText(nextAnimation);
      animationText.setX(nextAnimation.length > 5 ? 116 : 132);
    });

    shipFireButton.on('pointerdown', () => {
      const isVisible = !spaceShipFire.visible;

      spaceShipFire.setVisible(isVisible);
      shipFireButton.setFillStyle(isVisible ? 0xdc2626 : 0x475569, 1);
      shipFireText.setText(isVisible ? 'Visible' : 'Hidden');
      shipFireText.setX(isVisible ? 130 : 127);
    });

    this.outerRepairButton.on('pointerdown', () => {
      if (!this.isOuterWrong) {
        return;
      }

      this.setOuterWrong(false);
    });

    const setProgressFromPointer = (pointer: Phaser.Input.Pointer) => {
      const sliderStartX = panel.x + PANEL_CONTROL_X;
      const progress = Phaser.Math.Clamp((pointer.x - sliderStartX) / PANEL_SLIDER_WIDTH, 0, 1);

      this.setPlayerProgress(progress);
    };

    progressSliderTrack.on('pointerdown', setProgressFromPointer);
    this.progressSliderHandle.on('pointerdown', setProgressFromPointer);
    this.progressSliderHandle.on('drag', setProgressFromPointer);

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

      this.isCollisionDebugVisible = isVisible;
      collisionOverlay.setVisible(isVisible);
      this.collisionBodyDebug?.setVisible(isVisible);
      this.updateCollisionBodyDebug();
      collisionButton.setFillStyle(isVisible ? 0xdc2626 : 0x475569, 1);
      collisionText.setText(isVisible ? 'Visible' : 'Hidden');
      collisionText.setX(isVisible ? 130 : 127);
    });

    gravityButton.on('pointerdown', () => {
      this.syncGravityWithShipArea();
      this.updateGravityUi();
    });

    this.createMainMenu();
  }

  private scheduleNextRandomRoomFire() {
    this.randomRoomFireEvent?.remove(false);
    this.randomRoomFireEvent = this.time.delayedCall(
      Phaser.Math.Between(ROOM_RANDOM_FIRE_MIN_DELAY, ROOM_RANDOM_FIRE_MAX_DELAY),
      () => {
        this.igniteRandomRoom();
        this.scheduleNextRandomRoomFire();
      }
    );
  }

  private createMainMenu() {
    const { width, height } = this.scale;
    const menuDepth = 30000;
    const menu = this.add.container(0, 0).setDepth(menuDepth).setScrollFactor(0);
    const space = this.add.image(width / 2, height / 2, 'menuSpace');
    const spaceScale = Math.max(width / space.width, height / space.height);

    space.setScale(spaceScale).setScrollFactor(0);
    this.menuShipBaseX = width / 2 + 250;
    this.menuShipBaseY = height / 2 + 40;
    this.menuShip = this.add
      .image(this.menuShipBaseX, this.menuShipBaseY, 'menuShip')
      .setScale(0.54)
      .setAlpha(0.82)
      .setScrollFactor(0);

    const shade = this.add.rectangle(0, 0, width, height, 0x020617, 0.42).setOrigin(0).setScrollFactor(0).setInteractive();
    const title = this.add
      .text(width / 2, 110, 'Minute Shift:\nSpace Ops', {
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        fontSize: '48px',
        align: 'center',
        color: '#dbeafe',
        stroke: '#1e1b4b',
        strokeThickness: 8,
        shadow: { offsetX: 0, offsetY: 4, color: '#38bdf8', blur: 12, fill: true }
      })
      .setOrigin(0.5, 0);

    const startButton = this.createMenuButton(width / 2, 330, '开始游戏', 0x22c55e, () => this.startGameFromMenu());
    const aboutButton = this.createMenuButton(width / 2, 394, '关于', 0x3b82f6, () => this.showAboutPage());
    menu.add([space, this.menuShip, shade, title, ...startButton, ...aboutButton]);
    this.menuContainer = menu;
    this.aboutContainer = this.createAboutPage(menuDepth + 1).setVisible(false);
  }

  private createMenuButton(x: number, y: number, label: string, color: number, onClick: () => void) {
    const button = this.add
      .rectangle(x, y, 260, 46, color, 0.92)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    const text = this.add
      .text(x, y, label, {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '22px',
        color: '#ffffff',
        stroke: '#020617',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    button.on('pointerover', () => button.setScale(1.04));
    button.on('pointerout', () => button.setScale(1));
    button.on('pointerdown', onClick);

    return [button, text];
  }

  private createAboutPage(depth: number) {
    const { width, height } = this.scale;
    const about = this.add.container(0, 0).setDepth(depth).setScrollFactor(0);
    const background = this.add.rectangle(0, 0, width, height, 0x020617, 0.92).setOrigin(0).setInteractive();
    const title = this.add
      .text(width / 2, 96, '关于', {
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        fontSize: '42px',
        color: '#dbeafe',
        stroke: '#1e1b4b',
        strokeThickness: 7
      })
      .setOrigin(0.5, 0);
    const subtitle = this.add
      .text(width / 2, 178, '游戏制作人', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '30px',
        color: '#93c5fd'
      })
      .setOrigin(0.5, 0);
    const children: Phaser.GameObjects.GameObject[] = [background, title, subtitle];

    CREATOR_PROFILES.forEach((creator, index) => {
      children.push(...this.createCreatorRow(width / 2 - 220, 270 + index * 130, creator));
    });

    const backButton = this.createMenuButton(width / 2, height - 105, '返回', 0x475569, () => this.showMainMenuPage());

    about.add([...children, ...backButton]);
    return about;
  }

  private createCreatorRow(x: number, y: number, creator: CreatorProfile) {
    const avatarSize = 86;
    const rowBackground = this.add
      .rectangle(x - 34, y - 14, 508, 108, 0x0f172a, 0.88)
      .setOrigin(0, 0)
      .setStrokeStyle(1, 0x334155, 1);
    const avatar = this.add.image(x + avatarSize / 2, y + avatarSize / 2, creator.avatarKey).setDisplaySize(avatarSize, avatarSize);
    const avatarMaskShape = this.add.graphics().fillStyle(0xffffff, 1).fillCircle(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2);
    const avatarRing = this.add.graphics().lineStyle(3, 0x93c5fd, 1).strokeCircle(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2);
    const nameText = this.add
      .text(x + 118, y + 16, creator.name, {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '26px',
        color: '#ffffff'
      })
      .setInteractive({ useHandCursor: true });
    const githubIcon = this.add
      .image(x + 132, y + 62, 'githubIcon')
      .setDisplaySize(28, 28)
      .setInteractive({ useHandCursor: true });
    const githubText = this.add
      .text(x + 154, y + 49, creator.githubUrl, {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '16px',
        color: '#93c5fd'
      })
      .setInteractive({ useHandCursor: true });
    const openGithub = () => window.open(creator.githubUrl, '_blank', 'noopener,noreferrer');

    avatar.setMask(avatarMaskShape.createGeometryMask());
    avatarMaskShape.setVisible(false);
    [nameText, githubIcon, githubText].forEach((gameObject) => gameObject.on('pointerdown', openGithub));

    return [rowBackground, avatarMaskShape, avatar, avatarRing, nameText, githubIcon, githubText];
  }

  private showAboutPage() {
    this.menuContainer?.setVisible(false);
    this.controlsHelpPanel?.setVisible(false);
    this.aboutContainer?.setVisible(true);
  }

  private showMainMenuPage() {
    this.aboutContainer?.setVisible(false);
    this.menuContainer?.setVisible(true);
    this.controlsHelpPanel?.setVisible(true);
  }

  private startGameFromMenu() {
    if (this.isGameStarted) {
      return;
    }

    this.isGameStarted = true;
    this.gameStartTime = this.time.now;
    this.displayedGameSeconds = -1;
    this.alienSpawnTimer = 0;
    this.asteroidSpawnTimer = 0;
    this.pixelAsteroidLaneSpawnTimer = 0;
    this.swapClockSeconds = 0;
    this.swapClockCompletedLaps = 0;
    this.nextAlienSpawnDelay = Phaser.Math.Between(ALIEN_MIN_SPAWN_DELAY, ALIEN_MAX_SPAWN_DELAY);
    this.nextAsteroidSpawnDelay = Phaser.Math.Between(ASTEROID_MIN_SPAWN_DELAY, ASTEROID_MAX_SPAWN_DELAY);
    this.nextPixelAsteroidLaneSpawnDelay = Phaser.Math.Between(
      PIXEL_ASTEROID_LANE_MIN_SPAWN_DELAY,
      PIXEL_ASTEROID_LANE_MAX_SPAWN_DELAY
    );
    this.menuContainer?.setVisible(false);
    this.aboutContainer?.setVisible(false);
    this.controlsHelpPanel?.setVisible(false);
    this.scheduleNextRandomRoomFire();
  }

  private updateMenuShipParallax() {
    if (!this.menuShip || !this.menuContainer?.visible) {
      return;
    }

    const pointer = this.input.activePointer;
    const offsetX = (pointer.x / this.scale.width - 0.5) * 42;
    const offsetY = (pointer.y / this.scale.height - 0.5) * 30;

    this.menuShip.setPosition(this.menuShipBaseX + offsetX, this.menuShipBaseY + offsetY);
  }

  private initializeGamepadLogging() {
    const gamepadPlugin = this.input.gamepad as unknown as Phaser.Input.Gamepad.GamepadPlugin | undefined;

    if (gamepadPlugin) {
      gamepadPlugin.on('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
        console.log(`[Gamepad] connected: index=${pad.index} id=${pad.id}`);
      });
      gamepadPlugin.on('disconnected', (pad: Phaser.Input.Gamepad.Gamepad) => {
        console.log(`[Gamepad] disconnected: index=${pad.index} id=${pad.id}`);
      });
    }

    console.log('[Gamepad] Xbox controller logging enabled. Press any controller button if the browser has not exposed it yet.');
  }

  private updateGamepadLogging() {
    const getGamepads = navigator.getGamepads?.bind(navigator);

    if (!getGamepads) {
      if (!this.hasLoggedNoGamepad) {
        this.hasLoggedNoGamepad = true;
        console.log('[Gamepad] navigator.getGamepads is not available in this browser.');
      }

      return;
    }

    const gamepads = Array.from(getGamepads()).filter((gamepad): gamepad is Gamepad => gamepad !== null);

    if (gamepads.length === 0) {
      if (!this.hasLoggedNoGamepad) {
        this.hasLoggedNoGamepad = true;
        console.log('[Gamepad] no controller detected yet. Press an Xbox controller button to activate it.');
      }

      return;
    }

    this.hasLoggedNoGamepad = false;

    gamepads.forEach((gamepad) => {
      gamepad.buttons.forEach((button, buttonIndex) => {
        const key = `${gamepad.index}:${buttonIndex}`;
        const wasPressed = this.lastGamepadButtonStates.get(key) === true;

        if (button.pressed === wasPressed) {
          return;
        }

        this.lastGamepadButtonStates.set(key, button.pressed);
        console.log(
          `[Gamepad] ${button.pressed ? 'down' : 'up'} pad=${gamepad.index} button=${XBOX_BUTTON_NAMES[buttonIndex] ?? buttonIndex} value=${button.value.toFixed(2)}`
        );
      });

      const axisSnapshot = gamepad.axes
        .map((axis) => Math.round(axis * 100) / 100)
        .map((axis) => Math.abs(axis) < 0.12 ? 0 : axis)
        .join(',');
      const previousAxisSnapshot = this.lastGamepadAxisSnapshot.get(`${gamepad.index}`);

      if (axisSnapshot !== previousAxisSnapshot) {
        this.lastGamepadAxisSnapshot.set(`${gamepad.index}`, axisSnapshot);
        console.log(`[Gamepad] axes pad=${gamepad.index} values=[${axisSnapshot}]`);
      }
    });
  }

  private getPrimaryGamepad() {
    return Array.from(navigator.getGamepads?.() ?? []).find((gamepad): gamepad is Gamepad => gamepad !== null);
  }

  private getSecondPlayerGamepadDirection() {
    const direction = new Phaser.Math.Vector2(0, 0);
    const gamepad = this.getPrimaryGamepad();

    if (!gamepad) {
      return direction;
    }

    const axisX = Math.abs(gamepad.axes[0] ?? 0) > GAMEPAD_DEAD_ZONE ? gamepad.axes[0] : 0;
    const axisY = Math.abs(gamepad.axes[1] ?? 0) > GAMEPAD_DEAD_ZONE ? gamepad.axes[1] : 0;

    direction.x += axisX;
    direction.y += axisY;

    if (gamepad.buttons[14]?.pressed) {
      direction.x -= 1;
    }

    if (gamepad.buttons[15]?.pressed) {
      direction.x += 1;
    }

    if (gamepad.buttons[12]?.pressed) {
      direction.y -= 1;
    }

    if (gamepad.buttons[13]?.pressed) {
      direction.y += 1;
    }

    return direction.lengthSq() > 1 ? direction.normalize() : direction;
  }

  private isSecondPlayerGamepadActionPressed() {
    return this.getPrimaryGamepad()?.buttons[0]?.pressed === true;
  }

  private isSecondPlayerInteractInputDown() {
    return this.secondPlayerKeys?.L.isDown === true || this.isSecondPlayerGamepadActionPressed();
  }

  private isSecondPlayerVerticalInputDown() {
    const gamepadDirection = this.getSecondPlayerGamepadDirection();

    return this.secondPlayerKeys?.UP.isDown === true ||
      this.secondPlayerKeys?.DOWN.isDown === true ||
      Math.abs(gamepadDirection.y) > 0;
  }

  private igniteRandomRoom() {
    const availableRooms = this.getNormalFireRooms();
    const fallbackRooms: FireRoomId[] = ['drive', 'living', 'plant'];
    const targetRoom = Phaser.Utils.Array.GetRandom(availableRooms.length > 0 ? availableRooms : fallbackRooms) as FireRoomId;

    this.setFireRoomWrong(targetRoom);
  }

  private getNormalFireRooms(): FireRoomId[] {
    const rooms: FireRoomId[] = [];

    if (this.currentDriveRoomOption !== 'Wrong') {
      rooms.push('drive');
    }

    if (this.currentLivingRoomOption !== 'Wrong') {
      rooms.push('living');
    }

    if (this.currentPlantRoomOption !== 'Wrong') {
      rooms.push('plant');
    }

    return rooms;
  }

  private setFireRoomWrong(roomId: FireRoomId) {
    if (roomId === 'drive') {
      this.setDriveRoomOption('Wrong');
      return;
    }

    if (roomId === 'living') {
      this.setLivingRoomOption('Wrong');
      return;
    }

    this.setPlantRoomOption('Wrong');
  }

  private toggleUiPanelVisibility() {
    if (!this.uiPanel) {
      return;
    }

    this.isUiPanelVisible = !this.isUiPanelVisible;
    this.uiPanel.setVisible(this.isUiPanelVisible);
    this.playerPanelControls?.container.setVisible(this.isUiPanelVisible);
    this.secondPlayerPanelControls?.container.setVisible(this.isUiPanelVisible);
  }

  private createGameProgressUi(width: number) {
    this.gameProgressTrack = this.add
      .rectangle(0, GAME_PROGRESS_BAR_Y, width, GAME_PROGRESS_BAR_HEIGHT, 0x0f172a, 0.86)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(10010);
    this.gameProgressFill = this.add
      .rectangle(0, GAME_PROGRESS_BAR_Y, width, GAME_PROGRESS_BAR_HEIGHT, 0x22c55e, 1)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(10011);
  }

  private updateGameProgress(delta: number) {
    if (this.shipEnergy <= 0) {
      this.updateEnergyWarningVisibility();
      return;
    }

    this.gameProgress = Math.max(this.gameProgress - GAME_PROGRESS_DECAY_PER_SECOND * (delta / 1000), 0);
    this.updateGameProgressUi();
    this.updateEnergyWarningVisibility();
  }

  private updateGameProgressUi() {
    const ratio = Phaser.Math.Clamp(this.gameProgress / GAME_PROGRESS_MAX, 0, 1);

    this.gameProgressFill?.setDisplaySize(this.scale.width * ratio, GAME_PROGRESS_BAR_HEIGHT);
  }

  private updateEnergyWarningVisibility() {
    const isVisible = this.shipEnergy <= 0;

    if (this.energyWarningSign?.visible !== isVisible) {
      this.driveWarningBlinkTime = 0;
    }

    this.energyWarningSign?.setVisible(isVisible).setAlpha(isVisible ? 1 : 0);
  }

  private updateShipEnergy(delta: number) {
    this.shipEnergy = Math.max(this.shipEnergy - SHIP_ENERGY_DECAY_PER_SECOND * (delta / 1000), 0);
    this.shipEnergyText?.setText(`${Math.round(this.shipEnergy)}`);
    this.updateShipEnergyCrystalFrame();
    this.updateEnergyWarningVisibility();
  }

  private updateShipEnergyCrystalFrame() {
    if (!this.powerCrystalSprite) {
      return;
    }

    const frameIndex = Math.round(((SHIP_MAX_ENERGY - this.shipEnergy) / SHIP_MAX_ENERGY) * (POWER_CRYSTAL_FRAME_KEYS.length - 1));

    this.powerCrystalSprite.setTexture(POWER_CRYSTAL_FRAME_KEYS[Math.min(frameIndex, POWER_CRYSTAL_FRAME_KEYS.length - 1)]);
  }

  private captureScreenshot() {
    window.requestAnimationFrame(() => {
      const dataUrl = this.game.canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      link.href = dataUrl;
      link.download = `gamejam-screenshot-${timestamp}.png`;
      link.click();
    });
  }

  private cyclePlayerHandTool() {
    this.setPlayerHandTool((this.currentHandToolIndex + 1) % PLAYER_HAND_TOOL_ASSETS.length);
  }

  private cyclePlayerPrefabAnimation() {
    const currentIndex = PLAYER_PREFAB_ANIMATION_NAMES.indexOf(this.playerPrefabAnimationState);
    const nextAnimation = PLAYER_PREFAB_ANIMATION_NAMES[(currentIndex + 1) % PLAYER_PREFAB_ANIMATION_NAMES.length];

    this.playPlayerPrefabAnimation(nextAnimation);
  }

  private cycleSecondPlayerAnimation() {
    const currentIndex = PLAYER_PREFAB_ANIMATION_NAMES.indexOf(this.secondPlayerAnimationState);
    const nextAnimation = PLAYER_PREFAB_ANIMATION_NAMES[(currentIndex + 1) % PLAYER_PREFAB_ANIMATION_NAMES.length];

    this.playSecondPlayerPrefabAnimation(nextAnimation);
  }

  private setSecondPlayerProgress(progress: number) {
    this.secondPlayerProgress = Phaser.Math.Clamp(progress, 0, 1);
    this.updateSecondPlayerProgressBar();
    this.updateSecondPlayerInfoUi();
  }

  private cycleSecondPlayerHandTool() {
    this.setSecondPlayerHandTool(this.secondPlayerHandToolIndex + 1);
  }

  private setSecondPlayerHandTool(index: number) {
    if (!this.secondPlayerHandToolSprite) {
      return;
    }

    const nextIndex = Phaser.Math.Wrap(index, 0, PLAYER_HAND_TOOL_ASSETS.length);
    const asset = PLAYER_HAND_TOOL_ASSETS[nextIndex];

    this.secondPlayerHandToolIndex = nextIndex;
    if (asset.key) {
      this.secondPlayerHandToolSprite.setTexture(asset.key).setDisplaySize(1.32, 0.73).setVisible(true);
    } else {
      this.secondPlayerHandToolSprite.setVisible(false);
    }
    this.updateSecondPlayerInfoUi();
  }

  private setSecondPlayerHandToolByLabel(label: string) {
    const index = PLAYER_HAND_TOOL_ASSETS.findIndex((asset) => asset.label === label);

    if (index === -1) {
      return;
    }

    this.setSecondPlayerHandTool(index);
  }

  private setPlayerHandTool(index: number) {
    if (!this.playerHandToolSprite) {
      return;
    }

    const nextIndex = Phaser.Math.Wrap(index, 0, PLAYER_HAND_TOOL_ASSETS.length);
    const asset = PLAYER_HAND_TOOL_ASSETS[nextIndex];

    this.currentHandToolIndex = nextIndex;
    if (asset.key) {
      this.playerHandToolSprite.setTexture(asset.key).setDisplaySize(1.32, 0.73).setVisible(true);
    } else {
      this.playerHandToolSprite.setVisible(false);
    }
    this.handToolSelectedText?.setText(asset.label);
    this.handToolSelectedText?.setX(asset.label.length > 6 ? 103 : 132);
    this.updatePlayerInfoUi();
  }

  private setPlayerHandToolByLabel(label: string) {
    const index = PLAYER_HAND_TOOL_ASSETS.findIndex((asset) => asset.label === label);

    if (index === -1) {
      return;
    }

    this.setPlayerHandTool(index);
  }

  private createSnowNoiseOverlay(width: number, height: number) {
    if (this.snowNoiseBaseLayer && this.snowNoiseOverlay) {
      this.setSnowNoiseOverlayVisible(false);
      return;
    }

    if (!this.textures.exists(SNOW_NOISE_TEXTURE_KEY)) {
      const noiseGraphics = this.add.graphics({ x: 0, y: 0 }).setVisible(false);
      noiseGraphics.fillStyle(0x020617, 0.52);
      noiseGraphics.fillRect(0, 0, SNOW_NOISE_TILE_SIZE, SNOW_NOISE_TILE_SIZE);

      for (let index = 0; index < SNOW_NOISE_DOTS; index += 1) {
        const x = Phaser.Math.Between(0, SNOW_NOISE_TILE_SIZE - 1);
        const y = Phaser.Math.Between(0, SNOW_NOISE_TILE_SIZE - 1);
        const size = Phaser.Math.FloatBetween(0.8, 3.2);
        const isBrightSpeck = Phaser.Math.Between(0, 100) > 18;
        const alpha = isBrightSpeck ? Phaser.Math.FloatBetween(0.55, 1) : Phaser.Math.FloatBetween(0.3, 0.82);
        const shade = isBrightSpeck
          ? Phaser.Display.Color.GetColor(
              Phaser.Math.Between(235, 255),
              Phaser.Math.Between(240, 255),
              Phaser.Math.Between(245, 255)
            )
          : Phaser.Display.Color.GetColor(
              Phaser.Math.Between(6, 26),
              Phaser.Math.Between(8, 34),
              Phaser.Math.Between(14, 48)
            );

        noiseGraphics.fillStyle(shade, alpha);
        noiseGraphics.fillRect(x, y, size, size);
      }

      for (let index = 0; index < 780; index += 1) {
        const x = Phaser.Math.Between(0, SNOW_NOISE_TILE_SIZE - 1);
        const y = Phaser.Math.Between(0, SNOW_NOISE_TILE_SIZE - 1);
        const width = Phaser.Math.Between(6, 48);
        const alpha = Phaser.Math.FloatBetween(0.08, 0.42);

        noiseGraphics.fillStyle(Phaser.Display.Color.GetColor(245, 248, 255), alpha);
        noiseGraphics.fillRect(x, y, width, 1);
      }

      noiseGraphics.generateTexture(SNOW_NOISE_TEXTURE_KEY, SNOW_NOISE_TILE_SIZE, SNOW_NOISE_TILE_SIZE);
      noiseGraphics.destroy();
    }

    this.snowNoiseBaseLayer = this.add
      .tileSprite(0, 0, width, height, SNOW_NOISE_TEXTURE_KEY)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(9990)
      .setAlpha(SNOW_NOISE_BASE_BLUR_ALPHA)
      .setTint(0x1e3a5f)
      .setBlendMode(Phaser.BlendModes.MULTIPLY);

    this.snowNoiseOverlay = this.add
      .tileSprite(0, 0, width, height, SNOW_NOISE_TEXTURE_KEY)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(9991)
      .setAlpha(SNOW_NOISE_ALPHA)
      .setTint(0x9fb2ca)
      .setBlendMode(Phaser.BlendModes.NORMAL);

    this.setSnowNoiseOverlayVisible(false);
  }

  private setSnowNoiseOverlayVisible(isVisible: boolean) {
    this.snowNoiseBaseLayer?.setVisible(isVisible);
    this.snowNoiseOverlay?.setVisible(isVisible);
    this.snowNoiseFlickerTimer = 0;
  }

  private createResourceCounters() {
    this.createResourceCounter('iceCrystal', RESOURCE_COUNTER_LEFT_X, RESOURCE_COUNTER_Y);
    this.createResourceCounter('metalDebris', RESOURCE_COUNTER_RIGHT_X, RESOURCE_COUNTER_Y);
  }

  private createResourceCounter(kind: ResourceCounterKind, x: number, y: number) {
    const container = this.add.container(x, y).setDepth(160);
    const box = this.add
      .rectangle(0, 0, RESOURCE_COUNTER_BOX_WIDTH, RESOURCE_COUNTER_BOX_HEIGHT, 0x07111f, 0.78)
      .setStrokeStyle(3, 0x93c5fd, 0.92);
    const divider = this.add
      .rectangle(0, 18, RESOURCE_COUNTER_BOX_WIDTH - 12, 2, 0x93c5fd, 0.45)
      .setOrigin(0.5, 0.5);
    const icon = this.add
      .image(0, -20, kind)
      .setDisplaySize(RESOURCE_COUNTER_ICON_SIZE, RESOURCE_COUNTER_ICON_SIZE);
    const text = this.add
      .text(0, 28, '0/3', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '22px',
        color: '#f8fafc',
        stroke: '#020617',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    container.add([box, divider, icon, text]);
    this.resourceCounters.set(kind, { container, box, text });
    this.updateResourceCounterUi(kind);
  }

  private collectResource(kind: ResourceCounterKind) {
    this.incrementResourceCount(kind);
  }

  private incrementResourceCount(kind: ResourceCounterKind) {
    if (kind === 'metalDebris') {
      this.metalDebrisCount += 1;
    } else {
      this.iceCrystalCount += 1;
    }

    this.resourceCounts[kind] = Math.min(this.getResourceCount(kind), RESOURCE_COUNTER_MAX);
    this.updateResourceCounterUi(kind);
    this.updateResourcesUi();
  }

  private getResourceCount(kind: ResourceCounterKind) {
    return kind === 'metalDebris' ? this.metalDebrisCount : this.iceCrystalCount;
  }

  private updateResourceCounterUi(kind: ResourceCounterKind) {
    const counter = this.resourceCounters.get(kind);

    if (!counter) {
      return;
    }

    const count = this.getResourceCount(kind);
    const displayCount = Math.min(count, RESOURCE_COUNTER_MAX);
    const isComplete = count >= RESOURCE_COUNTER_MAX;

    counter.text.setText(`${displayCount}/${RESOURCE_COUNTER_MAX}`);
    counter.box.setStrokeStyle(3, isComplete ? 0x22c55e : 0x93c5fd, isComplete ? 1 : 0.92);
  }

  private updateSnowNoiseOverlay(delta: number) {
    if (!this.snowNoiseOverlay || !this.snowNoiseBaseLayer) {
      return;
    }

    this.snowNoiseFlickerTimer += delta;

    if (this.snowNoiseFlickerTimer < SNOW_NOISE_FLICKER_INTERVAL) {
      return;
    }

    this.snowNoiseFlickerTimer = 0;

    this.snowNoisePulseState = !this.snowNoisePulseState;

    const overlayJitterX = Phaser.Math.Between(-SNOW_NOISE_RANDOM_JITTER, SNOW_NOISE_RANDOM_JITTER);
    const overlayJitterY = Phaser.Math.Between(-SNOW_NOISE_RANDOM_JITTER, SNOW_NOISE_RANDOM_JITTER);
    const baseJitterX = Phaser.Math.Between(-SNOW_NOISE_RANDOM_JITTER, SNOW_NOISE_RANDOM_JITTER);
    const baseJitterY = Phaser.Math.Between(-SNOW_NOISE_RANDOM_JITTER, SNOW_NOISE_RANDOM_JITTER);
    const overlayAlpha = this.snowNoisePulseState ? SNOW_NOISE_ALPHA + 0.04 : SNOW_NOISE_ALPHA - 0.06;
    const baseAlpha = this.snowNoisePulseState ? SNOW_NOISE_BASE_BLUR_ALPHA + 0.05 : SNOW_NOISE_BASE_BLUR_ALPHA - 0.05;

    this.snowNoiseOverlay
      .setTilePosition(overlayJitterX, overlayJitterY)
      .setAlpha(overlayAlpha)
      .setScale(1, 1)
      .setAngle(0);

    this.snowNoiseBaseLayer
      .setTilePosition(baseJitterX, baseJitterY)
      .setAlpha(baseAlpha)
      .setScale(1, 1)
      .setAngle(0);
  }

  private swapPlayerPositions() {
    if (!this.player || !this.secondPlayer) {
      return;
    }

    const playerX = this.player.x;
    const playerY = this.player.y;
    const wasPlayerInsideShip = this.isPlayerInsideShip;
    const playerImpulseDirection = this.getPlayerMovementInputDirection();
    const secondPlayerImpulseDirection = this.getSecondPlayerMovementInputDirection();

    this.player.setPosition(this.secondPlayer.x, this.secondPlayer.y);
    this.secondPlayer.setPosition(playerX, playerY);
    this.isPlayerInsideShip = this.isSecondPlayerInsideShip;
    this.isSecondPlayerInsideShip = wasPlayerInsideShip;
    this.syncGravityWithShipArea();
    this.playerVelocityY = 0;
    this.secondPlayerVelocityY = 0;
    this.applySwapImpulse(this.playerSwapImpulse, playerImpulseDirection);
    this.applySwapImpulse(this.secondPlayerSwapImpulse, secondPlayerImpulseDirection);
    this.updateSecondPlayerState();
    this.updateGravityUi();
    this.syncPlayerPrefabVisual();
    this.syncSecondPlayerPrefabVisual();
    this.updatePlayerHealthBar();
    this.updateSecondPlayerHealthBar();
    this.updatePlayerProgressBar();
    this.updatePlayerCoordinateUi();
    this.updatePlayerInfoUi();
    this.updateSecondPlayerInfoUi();
    this.updateCollisionBodyDebug();
  }

  private updateSecondPlayerInfoUi() {
    if (!this.secondPlayer || !this.secondPlayerInfoText) {
      return;
    }

    const area = this.isSecondPlayerInsideShip ? 'Inside' : 'Outside';
    const gravity = this.isSecondPlayerGravityEnabled ? 'On' : 'Off';
    const handTool = PLAYER_HAND_TOOL_ASSETS[this.secondPlayerHandToolIndex].label;
    const speedPercent = Math.round(this.getSecondPlayerHealthSpeedMultiplier() * 100);

    this.secondPlayerInfoText.setText(
      `Position: X ${Math.round(this.secondPlayer.x)} Y ${Math.round(this.secondPlayer.y)}\nArea: ${area}\nGravity: ${gravity}\nState: ${this.secondPlayerState}${this.secondPlayerHealth < PLAYER_MAX_HEALTH ? ` · ${speedPercent}%` : ''}`
    );
    this.updatePlayerPanelControls(
      this.secondPlayerPanelControls,
      this.secondPlayerAnimationState,
      this.secondPlayerProgress,
      handTool
    );
  }

  private updateSecondPlayer(delta: number) {
    if (!this.secondPlayer) {
      return;
    }

    const isGamepadActionPressed = this.isSecondPlayerGamepadActionPressed();

    if (
      (this.secondPlayerKeys && Phaser.Input.Keyboard.JustDown(this.secondPlayerKeys.L)) ||
      (isGamepadActionPressed && !this.wasSecondPlayerGamepadActionPressed)
    ) {
      this.handlePlayerAction('player2');
    }

    this.wasSecondPlayerGamepadActionPressed = isGamepadActionPressed;

    this.updateSecondPlayerState();

    const direction = this.getSecondPlayerMovementInputDirection();
    const healthSpeedMultiplier = this.getSecondPlayerHealthSpeedMultiplier();

    if (direction.x !== 0) {
      this.setSecondPlayerPrefabFacing(direction.x < 0 ? -1 : 1);
    }

    if (direction.lengthSq() > 0) {
      direction.normalize().scale(PLAYER_SPEED * healthSpeedMultiplier * (delta / 1000));
    }

    if (this.shouldApplySecondPlayerGravity()) {
      this.secondPlayerVelocityY = Math.min(
        this.secondPlayerVelocityY + PLAYER_GRAVITY * (delta / 1000),
        PLAYER_MAX_FALL_SPEED
      );
      direction.y += this.secondPlayerVelocityY * (delta / 1000);
    } else {
      this.secondPlayerVelocityY = 0;
    }

    const impulseDelta = this.consumeSwapImpulse(this.secondPlayerSwapImpulse, delta);
    direction.x += impulseDelta.x;
    direction.y += impulseDelta.y;
    this.updateSecondPlayerProgressBar();

    if (direction.x === 0 && direction.y === 0) {
      this.syncSecondPlayerPrefabVisual();
      this.updateSecondPlayerHealthBar();
      this.updateSecondPlayerInfoUi();
      return;
    }

    const nextX = Phaser.Math.Clamp(
      this.secondPlayer.x + direction.x,
      PLAYER_WIDTH / 2,
      this.scale.width - PLAYER_WIDTH / 2
    );

    if (
      !this.isSecondPlayerWhiteCollisionEnabled ||
      !this.collidesWithMap(nextX, this.secondPlayer.y, this.isSecondPlayerInsideShip)
    ) {
      this.secondPlayer.x = nextX;
    }

    const nextY = Phaser.Math.Clamp(
      this.secondPlayer.y + direction.y,
      PLAYER_HEIGHT / 2,
      this.scale.height - PLAYER_HEIGHT / 2
    );

    if (
      !this.isSecondPlayerWhiteCollisionEnabled ||
      !this.collidesWithMap(this.secondPlayer.x, nextY, this.isSecondPlayerInsideShip)
    ) {
      this.secondPlayer.y = nextY;
    } else if (this.shouldApplySecondPlayerGravity() && direction.y > 0) {
      this.secondPlayerVelocityY = 0;
    }

    if (this.secondPlayer.y === this.scale.height - PLAYER_HEIGHT / 2) {
      this.secondPlayerVelocityY = 0;
    }
    this.syncSecondPlayerPrefabVisual();
    this.updateSecondPlayerHealthBar();
    this.updateSecondPlayerInfoUi();
    this.updateCollisionBodyDebug();
  }

  private getPlayerMovementInputDirection() {
    const direction = new Phaser.Math.Vector2(0, 0);

    if (!this.keys) {
      return direction;
    }

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

    return direction.lengthSq() > 0 ? direction.normalize() : direction;
  }

  private shouldApplyPlayerGravity() {
    return this.isGravityEnabled && this.playerState !== 'Climbing';
  }

  private shouldApplySecondPlayerGravity() {
    return this.isSecondPlayerGravityEnabled && this.secondPlayerState !== 'Climbing';
  }

  private getSecondPlayerMovementInputDirection() {
    const direction = this.getSecondPlayerGamepadDirection();

    if (!this.secondPlayerKeys) {
      return direction.lengthSq() > 0 ? direction.normalize() : direction;
    }

    if (this.secondPlayerKeys.LEFT.isDown) {
      direction.x -= 1;
    }

    if (this.secondPlayerKeys.RIGHT.isDown) {
      direction.x += 1;
    }

    if (this.secondPlayerKeys.UP.isDown) {
      direction.y -= 1;
    }

    if (this.secondPlayerKeys.DOWN.isDown) {
      direction.y += 1;
    }

    return direction.lengthSq() > 0 ? direction.normalize() : direction;
  }

  private applySwapImpulse(impulse: SwapImpulseState, inputDirection: Phaser.Math.Vector2) {
    if (inputDirection.lengthSq() === 0) {
      impulse.x = 0;
      impulse.y = 0;
      impulse.remaining = 0;
      return;
    }

    impulse.x = inputDirection.x * PLAYER_SWAP_IMPULSE_SPEED;
    impulse.y = inputDirection.y * PLAYER_SWAP_IMPULSE_SPEED;
    impulse.remaining = PLAYER_SWAP_IMPULSE_DURATION;
  }

  private consumeSwapImpulse(impulse: SwapImpulseState, delta: number) {
    if (impulse.remaining <= 0) {
      return new Phaser.Math.Vector2(0, 0);
    }

    const deltaSeconds = delta / 1000;
    const progress = impulse.remaining / PLAYER_SWAP_IMPULSE_DURATION;
    const movement = new Phaser.Math.Vector2(impulse.x * progress * deltaSeconds, impulse.y * progress * deltaSeconds);

    impulse.remaining = Math.max(impulse.remaining - delta, 0);

    if (impulse.remaining === 0) {
      impulse.x = 0;
      impulse.y = 0;
    }

    return movement;
  }

  private updateSecondPlayerState() {
    if (!this.secondPlayer) {
      return;
    }

    const context = this.createPlayerStateTransitionContextFor(
      this.secondPlayer,
      this.isSecondPlayerVerticalInputDown(),
      this.isSecondPlayerInteractInputDown()
    );
    const nextState = this.playerStateTransitions[this.secondPlayerState](context);

    if (this.secondPlayerState === nextState) {
      return;
    }

    this.transitionSecondPlayerState(nextState);
  }

  update(time: number, delta: number) {
    this.updateGamepadLogging();

    if (!this.isGameStarted) {
      this.updateMenuShipParallax();
      return;
    }

    this.updateAsteroids(delta);
    this.updateAliens(delta);
    this.updateSnowNoiseOverlay(delta);
    this.updateDriveWarningSign(delta);
    this.updateShipEnergy(delta);
    this.updateGameProgress(delta);
    this.updateSwapWarningCountdown(delta);

    if (this.keys && Phaser.Input.Keyboard.JustDown(this.keys.H)) {
      this.toggleUiPanelVisibility();
    }

    if (this.keys && Phaser.Input.Keyboard.JustDown(this.keys.E)) {
      this.handlePlayerAction('player1');
    }

    if (!this.player || !this.keys) {
      this.updateCollisionBodyDebug();
      return;
    }

    this.updateSwapClock(delta);
    this.updatePlayerPrefabAnimation(delta);
    this.updateSecondPlayerPrefabAnimation(delta);
    this.updatePlayerState(this.keys.W.isDown || this.keys.S.isDown);
    this.updateRepairProgress(delta);
    this.updateRepoProgress(delta);
    this.updateOuterRepairProgress(delta);
    this.updateFirefightingProgress(delta);
    this.updateHealing(delta);
    this.updateSecondPlayer(delta);
    this.updateSecondPlayerRepairProgress(delta);
    this.updateSecondPlayerRepoProgress(delta);
    this.updateSecondPlayerOuterRepairProgress(delta);
    this.updateSecondPlayerFirefightingProgress(delta);
    this.updateWorkshopProgress(delta);
    this.updateSecondPlayerWorkshopProgress(delta);
    this.updateSecondHealing(delta);
    this.updateOuterWrongEntryDetection();

    const direction = new Phaser.Math.Vector2(0, 0);
    const healthSpeedMultiplier = this.getPlayerHealthSpeedMultiplier();

    if (this.keys.A.isDown) {
      direction.x -= 1;
    }

    if (this.keys.D.isDown) {
      direction.x += 1;
    }

    if (direction.x !== 0) {
      this.setPlayerPrefabFacing(direction.x < 0 ? -1 : 1);
    }

    if (this.keys.W.isDown) {
      direction.y -= 1;
    }

    if (this.keys.S.isDown) {
      direction.y += 1;
    }

    if (direction.lengthSq() > 0) {
      direction.normalize().scale(PLAYER_SPEED * healthSpeedMultiplier * (delta / 1000));
    }

    if (this.shouldApplyPlayerGravity()) {
      this.playerVelocityY = Math.min(
        this.playerVelocityY + PLAYER_GRAVITY * (delta / 1000),
        PLAYER_MAX_FALL_SPEED
      );
      direction.y += this.playerVelocityY * (delta / 1000);
    } else {
      this.playerVelocityY = 0;
    }

    const impulseDelta = this.consumeSwapImpulse(this.playerSwapImpulse, delta);
    direction.x += impulseDelta.x;
    direction.y += impulseDelta.y;

    if (direction.x === 0 && direction.y === 0) {
      this.syncPlayerPrefabVisual();
      this.updatePlayerHealthBar();
      this.updatePlayerProgressBar();
      this.updatePlayerCoordinateUi();
      this.updateCollisionBodyDebug();
      this.updateDroppedExtinguisherPickups(delta);
      return;
    }

    const nextX = Phaser.Math.Clamp(
      this.player.x + direction.x,
      PLAYER_WIDTH / 2,
      this.scale.width - PLAYER_WIDTH / 2
    );

    if (!this.isWhiteCollisionEnabled || !this.collidesWithMap(nextX, this.player.y, this.isPlayerInsideShip)) {
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

    if (!this.isWhiteCollisionEnabled || !this.collidesWithMap(this.player.x, nextY, this.isPlayerInsideShip)) {
      this.player.y = nextY;
    } else if (this.shouldApplyPlayerGravity() && direction.y > 0) {
      this.playerVelocityY = 0;
    }

    this.updatePlayerState(this.keys.W.isDown || this.keys.S.isDown);
    this.syncPlayerPrefabVisual();
    this.updatePlayerHealthBar();
    this.updatePlayerProgressBar();
    this.updatePlayerCoordinateUi();
    this.updateOuterWrongEntryDetection();
    this.updateCollisionBodyDebug();
    this.updateDroppedExtinguisherPickups(delta);
  }

  private createPlayerPrefabVisual(x: number, y: number) {
    const visual = this.add.container(x, y);
    const root = this.createPrefabNode(visual, 0, 0);

    root.setPosition(0, PLAYER_PREFAB_ROOT_OFFSET_Y);
    root.setScale(PLAYER_PREFAB_PIXELS_PER_UNIT * PLAYER_PREFAB_CHARACTER_SCALE);

    const body = this.createPrefabNode(root, 0.006000102, 0.19145268, -1.9272974, 1, 1.0584189);
    this.addPrefabSprite(body, 'playerPrefabBody', 0, 0, 0.41, 0.45, { tint: PLAYER_PREFAB_SKIN_TINT }); 
    this.playerChestSprite = this.addPrefabSprite(body, 'playerPrefabChestOuter', 0, 0, 0.78, 0.7);

    const head = this.createPrefabNode(body, -0.039657928, 0.3265895, -0.0395905);
    this.addPrefabSprite(head, 'playerPrefabHead', 0, 0, 0.65, 0.5, { tint: PLAYER_PREFAB_SKIN_TINT });
    const normalEye = this.addPrefabSprite(head, 'playerPrefabEye', 0.13499999, -0.054999948, 0.55, 0.32);
    this.playerHairSprite = this.addPrefabSprite(head, 'playerPrefabHair1', 0.025000036, 0.024999976, 0.98, 1);
    // this.addPrefabSprite(head, 'playerPrefabHair', 0.025000036, 0.024999976, 0.98, 1, {
    //   tint: PLAYER_PREFAB_HAIR_TINT
    // });

    const animatedEye = this.createPrefabNode(head, 0.13399993, -0.058999896);
    const stunEyeLeft = this.createPrefabNode(animatedEye, -0.082, 0.010999978);
    const stunEyeRight = this.createPrefabNode(animatedEye, 0.09200001, 0);
    const stunEyeLeftSprite = this.addPrefabSprite(stunEyeLeft, 'playerPrefabEyeStun', 0, 0, 0.24, 0.22, { alpha: 0 });
    const stunEyeRightSprite = this.addPrefabSprite(stunEyeRight, 'playerPrefabEyeStun', 0, 0, 0.24, 0.22, { alpha: 0 });
    const defeatEyeLeft = this.addPrefabSprite(animatedEye, 'playerPrefabEyeDefeat', -0.065, 0.012, 0.19, 0.15, {
      alpha: 0
    });
    const defeatEyeRight = this.addPrefabSprite(animatedEye, 'playerPrefabEyeDefeat', 0.079, 0.006, 0.19, 0.15, {
      alpha: 0
    });

    const handLeft = this.createPrefabNode(root, -0.0077263433, 0.023179028);
    
    const handRight = this.createPrefabNode(root, -0.0077263433, 0.023179028);
    const bow = this.createPrefabNode(handRight, -0.04399988, 0.08099997);
    
    // this.addPrefabSprite(bow, 'playerPrefabBowLineDown', -0.16500005, 0.100000024, 0.36, 0.06);
    // this.addPrefabSprite(bow, 'playerPrefabBowLineUp', 0.13999996, 0.100000024, 0.37, 0.06);


    // this.addPrefabSprite(handLeft, 'playerPrefabShield', 0.29100013, 0.13100004, 0.52, 0.58); // TODO 右手暂时隐藏
    this.playerHandToolSprite = this.addPrefabSprite(
      bow,
      PLAYER_HAND_TOOL_ASSETS[1].key!,
      0,
      0,
      1.32,
      0.73
    );
    this.setPlayerHandTool(this.currentHandToolIndex);
    const arrow = this.createPrefabNode(bow, 0.005, -0.211, -90);

    this.playerPrefabAnimationNodes = { body, head, handLeft, handRight, bow, stunEyeLeft, stunEyeRight };
    this.playerPrefabAnimationSprites = {
      normalEye,
      arrow: this.addPrefabSprite(arrow, '', 0, 0, 0, 0, { alpha: 0 }),
      stunEyeLeft: stunEyeLeftSprite,
      stunEyeRight: stunEyeRightSprite,
      defeatEyeLeft,
      defeatEyeRight
    };
    this.playPlayerPrefabAnimation('Idle');

    return visual;
  }

  private createSecondPlayerPrefabVisual(x: number, y: number) {
    const visual = this.add.container(x, y);
    const root = this.createPrefabNode(visual, 0, 0);

    root.setPosition(0, PLAYER_PREFAB_ROOT_OFFSET_Y);
    root.setScale(PLAYER_PREFAB_PIXELS_PER_UNIT * PLAYER_PREFAB_CHARACTER_SCALE);

    const body = this.createPrefabNode(root, 0.006000102, 0.19145268, -1.9272974, 1, 1.0584189);
    this.addPrefabSprite(body, 'playerPrefabBody', 0, 0, 0.41, 0.45, { tint: 0xd8b4fe });
    this.secondPlayerChestSprite = this.addPrefabSprite(body, 'playerPrefabChestOuter', 0, 0, 0.78, 0.7);

    const head = this.createPrefabNode(body, -0.039657928, 0.3265895, -0.0395905);
    this.addPrefabSprite(head, 'playerPrefabHead', 0, 0, 0.65, 0.5, { tint: 0xd8b4fe });
    const normalEye = this.addPrefabSprite(head, 'playerPrefabEye', 0.13499999, -0.054999948, 0.55, 0.32);
    this.secondPlayerHairSprite = this.addPrefabSprite(head, 'playerPrefabHair2', 0.025000036, 0.024999976, 0.98, 1);

    const animatedEye = this.createPrefabNode(head, 0.13399993, -0.058999896);
    const stunEyeLeft = this.createPrefabNode(animatedEye, -0.082, 0.010999978);
    const stunEyeRight = this.createPrefabNode(animatedEye, 0.09200001, 0);
    const stunEyeLeftSprite = this.addPrefabSprite(stunEyeLeft, 'playerPrefabEyeStun', 0, 0, 0.24, 0.22, { alpha: 0 });
    const stunEyeRightSprite = this.addPrefabSprite(stunEyeRight, 'playerPrefabEyeStun', 0, 0, 0.24, 0.22, { alpha: 0 });
    const defeatEyeLeft = this.addPrefabSprite(animatedEye, 'playerPrefabEyeDefeat', -0.065, 0.012, 0.19, 0.15, {
      alpha: 0
    });
    const defeatEyeRight = this.addPrefabSprite(animatedEye, 'playerPrefabEyeDefeat', 0.079, 0.006, 0.19, 0.15, {
      alpha: 0
    });

    const handLeft = this.createPrefabNode(root, -0.0077263433, 0.023179028);
    const handRight = this.createPrefabNode(root, -0.0077263433, 0.023179028);
    const bow = this.createPrefabNode(handRight, -0.04399988, 0.08099997);

    this.secondPlayerHandToolSprite = this.addPrefabSprite(
      bow,
      PLAYER_HAND_TOOL_ASSETS[1].key!,
      0,
      0,
      1.32,
      0.73
    );
    this.setSecondPlayerHandTool(this.secondPlayerHandToolIndex);
    const arrow = this.createPrefabNode(bow, 0.005, -0.211, -90);

    this.secondPlayerPrefabAnimationNodes = { body, head, handLeft, handRight, bow, stunEyeLeft, stunEyeRight };
    this.secondPlayerPrefabAnimationSprites = {
      normalEye,
      arrow: this.addPrefabSprite(arrow, '', 0, 0, 0, 0, { alpha: 0 }),
      stunEyeLeft: stunEyeLeftSprite,
      stunEyeRight: stunEyeRightSprite,
      defeatEyeLeft,
      defeatEyeRight
    };
    this.playSecondPlayerPrefabAnimation('Idle');

    return visual;
  }

  private createPrefabNode(
    parent: Phaser.GameObjects.Container,
    x: number,
    y: number,
    unityRotationDegrees = 0,
    scaleX = 1,
    scaleY = 1
  ) {
    const node = this.add.container(x, -y) as PrefabAnimationNode;
    const rotation = Phaser.Math.DegToRad(-unityRotationDegrees);

    node.baseX = x;
    node.baseY = -y;
    node.baseRotation = rotation;
    node.baseScaleX = scaleX;
    node.baseScaleY = scaleY;
    node.setRotation(rotation);
    node.setScale(scaleX, scaleY);
    parent.add(node);

    return node;
  }

  private addPrefabSprite(
    parent: Phaser.GameObjects.Container,
    texture: string,
    x: number,
    y: number,
    width: number,
    height: number,
    options: PrefabSpriteOptions = {}
  ) {
    const sprite = texture
      ? this.add.image(x, -y, texture).setDisplaySize(width, height)
      : this.add.image(x, -y, '__MISSING').setDisplaySize(width, height).setVisible(false);
    const prefabSprite = sprite as PrefabAnimationSprite;

    prefabSprite.baseAlpha = options.alpha ?? 1;

    if (options.alpha !== undefined) {
      prefabSprite.setAlpha(options.alpha);
    }

    if (options.tint !== undefined) {
      prefabSprite.setTint(options.tint);
    }

    parent.add(prefabSprite);

    return prefabSprite;
  }

  private syncPlayerPrefabVisual() {
    if (!this.player || !this.playerPrefabVisual) {
      return;
    }

    this.playerPrefabVisual.setPosition(this.player.x, this.player.y);
  }

  private updateAliens(delta: number) {
    if (!this.player) {
      return;
    }

    this.alienSpawnTimer += delta;

    if (this.alienSpawnTimer >= this.nextAlienSpawnDelay && this.alienSprites.length === 0) {
      this.spawnAlien();
      this.alienSpawnTimer = 0;
      this.nextAlienSpawnDelay = Phaser.Math.Between(ALIEN_MIN_SPAWN_DELAY, ALIEN_MAX_SPAWN_DELAY);
    }

    const deltaSeconds = delta / 1000;

    for (let index = this.alienSprites.length - 1; index >= 0; index -= 1) {
      const alien = this.alienSprites[index];
      const target = this.getAlienTarget(alien);

      if (!target) {
        continue;
      }

      const dx = target.x - alien.x;
      const dy = target.y - alien.y;
      const distance = Math.max(Math.hypot(dx, dy), 0.001);
      const isColliding = distance <= ALIEN_HIT_DISTANCE + alien.hitRadius;
      const approachSpeed = alien.repelledByHit ? alien.speed * 1.65 : alien.speed;
      const moveX = (dx / distance) * approachSpeed * deltaSeconds;
      const moveY = (dy / distance) * approachSpeed * deltaSeconds;

      alien.velocityX = moveX / deltaSeconds;
      alien.velocityY = moveY / deltaSeconds;

      if (alien.repelledByHit) {
        this.moveAlienWithOutsideCollision(alien, alien.knockbackX * deltaSeconds, alien.knockbackY * deltaSeconds);
        alien.knockbackX *= 0.9;
        alien.knockbackY *= 0.9;

        if (Math.hypot(alien.knockbackX, alien.knockbackY) < 20) {
          alien.repelledByHit = false;
          alien.knockbackX = 0;
          alien.knockbackY = 0;
        }
      } else {
        this.moveAlienWithOutsideCollision(alien, moveX, moveY);
      }

      alien.rotation = Phaser.Math.Angle.Between(alien.x, alien.y, target.x, target.y) + Math.PI / 2;

      if (this.alienReticle) {
        this.alienReticle.setVisible(this.alienSprites.length > 0);
        this.alienReticle.setPosition(target.x, target.y);
      }

      if (isColliding) {
        const wasHitRecently = this.alienDamageStates.get(alien) === true;

        if (!wasHitRecently) {
          this.damageAlienTarget(alien.targetPlayer, ALIEN_CONTACT_DAMAGE);
          this.alienDamageStates.set(alien, true);
        }

        const pushDirection = new Phaser.Math.Vector2(alien.x - target.x, alien.y - target.y).normalize();
        alien.repelledByHit = true;
        alien.knockbackX = pushDirection.x * ALIEN_KNOCKBACK_FORCE;
        alien.knockbackY = pushDirection.y * ALIEN_KNOCKBACK_FORCE;
      } else {
        this.alienDamageStates.set(alien, false);
      }

      if (
        alien.x < -ALIEN_OFFSCREEN_PADDING ||
        alien.x > this.scale.width + ALIEN_OFFSCREEN_PADDING ||
        alien.y < -ALIEN_OFFSCREEN_PADDING ||
        alien.y > this.scale.height + ALIEN_OFFSCREEN_PADDING
      ) {
        this.destroyAlien(alien);
        this.alienSprites.splice(index, 1);
      }
    }

  }

  private getAlienTarget(alien: AlienSprite) {
    return alien.targetPlayer === 'player1' ? this.player : this.secondPlayer;
  }

  private moveAlienWithOutsideCollision(alien: AlienSprite, moveX: number, moveY: number) {
    const nextX = alien.x + moveX;

    if (
      this.isAlienOutsideScene(nextX, alien.y, alien.hitRadius) ||
      !this.collidesWithMap(nextX, alien.y, false, alien.hitRadius * 2, alien.hitRadius * 2)
    ) {
      alien.x = nextX;
    }

    const nextY = alien.y + moveY;

    if (
      this.isAlienOutsideScene(alien.x, nextY, alien.hitRadius) ||
      !this.collidesWithMap(alien.x, nextY, false, alien.hitRadius * 2, alien.hitRadius * 2)
    ) {
      alien.y = nextY;
    }
  }

  private isAlienOutsideScene(x: number, y: number, radius: number) {
    return x - radius < 0 || x + radius > this.scale.width || y - radius < 0 || y + radius > this.scale.height;
  }

  private damageAlienTarget(targetPlayer: PlayerId, amount: number) {
    if (targetPlayer === 'player1') {
      this.damagePlayer(amount);
      return;
    }

    this.onSecondPlayerAlienContact(amount);
  }

  private onSecondPlayerAlienContact(_amount: number) {
    this.damageSecondPlayer(_amount);
  }

  private performPlayerAttack(playerId: PlayerId) {
    const player = this.getPlayerById(playerId);

    if (!player) {
      return;
    }

    if (!this.isPlayerHandEmpty(playerId)) {
      return;
    }

    if (playerId === 'player1') {
      this.setPlayerHandToolByLabel('Axe');
      this.playPlayerPrefabAnimation('Attack');
    } else {
      this.setSecondPlayerHandToolByLabel('Axe');
      this.playSecondPlayerPrefabAnimation('Attack');
    }

    const alien = this.findClosestAlien(player, PLAYER_ATTACK_DISTANCE);

    if (alien) {
      this.explodeAlien(alien);
      return;
    }

    const asteroid = this.findClosestAsteroid(player, PLAYER_ATTACK_DISTANCE);

    if (asteroid) {
      this.destroyAsteroidByAttack(asteroid);
    }
  }

  private isPlayerHandEmpty(playerId: PlayerId) {
    const handToolIndex = playerId === 'player1' ? this.currentHandToolIndex : this.secondPlayerHandToolIndex;

    return PLAYER_HAND_TOOL_ASSETS[handToolIndex]?.label === 'None';
  }

  private isPlayerHoldingTool(playerId: PlayerId, label: string) {
    const handToolIndex = playerId === 'player1' ? this.currentHandToolIndex : this.secondPlayerHandToolIndex;

    return PLAYER_HAND_TOOL_ASSETS[handToolIndex]?.label === label;
  }

  private handlePlayerAction(playerId: PlayerId) {
    if (this.isAnyActiveSceneInteractionInProgress() && !this.isPlayerActiveSceneInteraction(playerId)) {
      return;
    }

    if (this.isPlayerActiveSceneInteraction(playerId)) {
      return;
    }

    if (this.isPlayerHoldingTool(playerId, 'Extinguisher') && this.tryStartFirefighting(playerId)) {
      return;
    }

    if (this.tryStartPlayerInteraction(playerId)) {
      return;
    }

    if (this.isPlayerHoldingTool(playerId, 'Extinguisher')) {
      this.dropPlayerExtinguisher(playerId);
      return;
    }

    if (this.canDropPlayerClothing(playerId)) {
      this.dropPlayerClothing(playerId);
      return;
    }

    this.performPlayerAttack(playerId);
  }

  private tryStartPlayerInteraction(playerId: PlayerId) {
    if (playerId === 'player1') {
      return this.tryStartPrimaryPlayerInteraction();
    }

    return this.tryStartSecondPlayerInteraction();
  }

  private tryStartPrimaryPlayerInteraction() {
    if (!this.player) {
      return false;
    }

    const context = this.createPlayerStateTransitionContextFor(
      this.player,
      this.keys?.W.isDown === true || this.keys?.S.isDown === true,
      true
    );
    const nextState = this.playerStateTransitions[this.playerState](context);

    if (!this.isInteractionState(nextState)) {
      return false;
    }

    this.transitionPlayerState(nextState);
    return true;
  }

  private tryStartSecondPlayerInteraction() {
    if (!this.secondPlayer) {
      return false;
    }

    const context = this.createPlayerStateTransitionContextFor(
      this.secondPlayer,
      this.isSecondPlayerVerticalInputDown(),
      true
    );
    const nextState = this.playerStateTransitions[this.secondPlayerState](context);

    if (!this.isInteractionState(nextState)) {
      return false;
    }

    this.transitionSecondPlayerState(nextState);
    return true;
  }

  private isInteractionState(state: PlayerState) {
    return state !== 'Normal' && state !== 'Climbing';
  }

  private isPlayerActiveSceneInteraction(playerId: PlayerId) {
    const state = playerId === 'player1' ? this.playerState : this.secondPlayerState;

    return this.isRepairingState(state);
  }

  private isAnyActiveSceneInteractionInProgress() {
    return this.isPlayerActiveSceneInteraction('player1') || this.isPlayerActiveSceneInteraction('player2');
  }

  private tryStartFirefighting(playerId: PlayerId) {
    const player = this.getPlayerById(playerId);

    if (!player) {
      return false;
    }

    const fireRoom = this.getOverlappingBurningRoom(player.x, player.y);

    if (!fireRoom) {
      return false;
    }

    if (playerId === 'player1') {
      this.playerFirefightingRoom = fireRoom;
      this.setPlayerProgress(0);
      this.transitionPlayerState('Firefighting');
    } else {
      this.secondPlayerFirefightingRoom = fireRoom;
      this.setSecondPlayerProgress(0);
      this.transitionSecondPlayerState('Firefighting');
    }

    return true;
  }

  private getOverlappingBurningRoom(x: number, y: number): FireRoomId | undefined {
    if (this.currentDriveRoomOption === 'Wrong' && this.overlapsRoom(DRIVE_ROOM_CONFIG, x, y)) {
      return 'drive';
    }

    if (this.currentLivingRoomOption === 'Wrong' && this.overlapsRoom(LIVING_ROOM_CONFIG, x, y)) {
      return 'living';
    }

    if (this.currentPlantRoomOption === 'Wrong' && this.overlapsRoom(PLANT_ROOM_CONFIG, x, y)) {
      return 'plant';
    }

    return undefined;
  }

  private setFireRoomNormal(roomId: FireRoomId) {
    if (roomId === 'drive') {
      this.setDriveRoomOption('Normal');
      return;
    }

    if (roomId === 'living') {
      this.setLivingRoomOption('Normal');
      return;
    }

    this.setPlantRoomOption('Normal');
  }

  private dropPlayerExtinguisher(playerId: PlayerId) {
    const player = this.getPlayerById(playerId);

    if (!player) {
      return;
    }

    const sprite = this.add
      .image(player.x, player.y, 'playerHandToolFireExtinguisher')
      .setDisplaySize(DROPPED_EXTINGUISHER_WIDTH, DROPPED_EXTINGUISHER_HEIGHT);
    const droppedExtinguisher = { x: player.x, y: player.y, sprite };

    this.droppedExtinguishers.push(droppedExtinguisher);

    if (playerId === 'player1') {
      this.setPlayerHandToolByLabel('None');
    } else {
      this.setSecondPlayerHandToolByLabel('None');
    }
  }

  private updateDroppedExtinguisherPickups(delta: number) {
    this.updateDroppedExtinguisherPickupForPlayer('player1', delta);
    this.updateDroppedExtinguisherPickupForPlayer('player2', delta);
    this.updateDroppedClothingPickups(delta);
  }

  private updateDroppedExtinguisherPickupForPlayer(playerId: PlayerId, delta: number) {
    const player = this.getPlayerById(playerId);

    if (!player || !this.isPlayerHandEmpty(playerId)) {
      this.resetExtinguisherPickup(playerId);
      return;
    }

    const droppedExtinguisher = this.findOverlappingDroppedExtinguisher(player);

    if (!droppedExtinguisher) {
      this.resetExtinguisherPickup(playerId);
      return;
    }

    const currentTarget = playerId === 'player1' ? this.playerPickupExtinguisher : this.secondPlayerPickupExtinguisher;
    const nextProgress = (currentTarget === droppedExtinguisher ? this.getExtinguisherPickupProgress(playerId) : 0) +
      DROPPED_EXTINGUISHER_PICKUP_PROGRESS_PER_SECOND * (delta / 1000);

    this.setExtinguisherPickupTarget(playerId, droppedExtinguisher, nextProgress);

    if (nextProgress < 1) {
      return;
    }

    this.pickUpDroppedExtinguisher(playerId, droppedExtinguisher);
  }

  private findOverlappingDroppedExtinguisher(player: Phaser.GameObjects.Graphics) {
    return this.droppedExtinguishers.find((droppedExtinguisher) =>
      Math.abs(player.x - droppedExtinguisher.x) <= (PLAYER_WIDTH + DROPPED_EXTINGUISHER_WIDTH) / 2 &&
      Math.abs(player.y - droppedExtinguisher.y) <= (PLAYER_HEIGHT + DROPPED_EXTINGUISHER_HEIGHT) / 2
    );
  }

  private getExtinguisherPickupProgress(playerId: PlayerId) {
    return playerId === 'player1' ? this.playerExtinguisherPickupProgress : this.secondPlayerExtinguisherPickupProgress;
  }

  private setExtinguisherPickupTarget(playerId: PlayerId, droppedExtinguisher: DroppedExtinguisher, progress: number) {
    if (playerId === 'player1') {
      this.playerPickupExtinguisher = droppedExtinguisher;
      this.playerExtinguisherPickupProgress = Phaser.Math.Clamp(progress, 0, 1);
      this.updatePlayerProgressBar();
      return;
    }

    this.secondPlayerPickupExtinguisher = droppedExtinguisher;
    this.secondPlayerExtinguisherPickupProgress = Phaser.Math.Clamp(progress, 0, 1);
    this.updateSecondPlayerProgressBar();
  }

  private resetExtinguisherPickup(playerId: PlayerId) {
    if (playerId === 'player1') {
      if (this.playerExtinguisherPickupProgress === 0 && !this.playerPickupExtinguisher) {
        return;
      }

      this.playerPickupExtinguisher = undefined;
      this.playerExtinguisherPickupProgress = 0;
      this.updatePlayerProgressBar();
      return;
    }

    if (this.secondPlayerExtinguisherPickupProgress === 0 && !this.secondPlayerPickupExtinguisher) {
      return;
    }

    this.secondPlayerPickupExtinguisher = undefined;
    this.secondPlayerExtinguisherPickupProgress = 0;
    this.updateSecondPlayerProgressBar();
  }

  private pickUpDroppedExtinguisher(playerId: PlayerId, droppedExtinguisher: DroppedExtinguisher) {
    const index = this.droppedExtinguishers.indexOf(droppedExtinguisher);

    if (index !== -1) {
      this.droppedExtinguishers.splice(index, 1);
    }

    droppedExtinguisher.sprite.destroy();

    if (this.playerPickupExtinguisher === droppedExtinguisher) {
      this.resetExtinguisherPickup('player1');
    }

    if (this.secondPlayerPickupExtinguisher === droppedExtinguisher) {
      this.resetExtinguisherPickup('player2');
    }

    if (playerId === 'player1') {
      this.setPlayerHandToolByLabel('Extinguisher');
    } else {
      this.setSecondPlayerHandToolByLabel('Extinguisher');
    }
  }

  private canDropPlayerClothing(playerId: PlayerId) {
    return this.isPlayerInsideShipById(playerId) && this.isPlayerHandEmpty(playerId) && this.isPlayerWearingOwnClothing(playerId);
  }

  private isPlayerInsideShipById(playerId: PlayerId) {
    return playerId === 'player1' ? this.isPlayerInsideShip : this.isSecondPlayerInsideShip;
  }

  private isPlayerWearingOwnClothing(playerId: PlayerId) {
    return playerId === 'player1' ? this.isPlayerWearingClothing : this.isSecondPlayerWearingClothing;
  }

  private dropPlayerClothing(playerId: PlayerId) {
    const player = this.getPlayerById(playerId);

    if (!player) {
      return;
    }

    const chestKey = 'playerPrefabChestOuter';
    const hairKey = playerId === 'player1' ? 'playerPrefabHair1' : 'playerPrefabHair2';
    const chestSprite = this.add
      .image(player.x - 18, player.y + 10, chestKey)
      .setDisplaySize(DROPPED_CHEST_WIDTH, DROPPED_CHEST_HEIGHT);
    const hairSprite = this.add
      .image(player.x + 24, player.y - 18, hairKey)
      .setDisplaySize(DROPPED_HAIR_WIDTH, DROPPED_HAIR_HEIGHT);

    this.droppedClothingItems.push({ playerId, x: player.x, y: player.y, chestSprite, hairSprite });
    this.setPlayerClothingWorn(playerId, false);
  }

  private updateDroppedClothingPickups(delta: number) {
    this.updateDroppedClothingPickupForPlayer('player1', delta);
    this.updateDroppedClothingPickupForPlayer('player2', delta);
  }

  private updateDroppedClothingPickupForPlayer(playerId: PlayerId, delta: number) {
    const player = this.getPlayerById(playerId);

    if (!player || this.isPlayerWearingOwnClothing(playerId)) {
      this.resetClothingPickup(playerId);
      return;
    }

    const droppedClothing = this.findOverlappingDroppedClothing(playerId, player);

    if (!droppedClothing) {
      this.resetClothingPickup(playerId);
      return;
    }

    const currentTarget = playerId === 'player1' ? this.playerPickupClothing : this.secondPlayerPickupClothing;
    const nextProgress = (currentTarget === droppedClothing ? this.getClothingPickupProgress(playerId) : 0) +
      DROPPED_CLOTHING_PICKUP_PROGRESS_PER_SECOND * (delta / 1000);

    this.setClothingPickupTarget(playerId, droppedClothing, nextProgress);

    if (nextProgress < 1) {
      return;
    }

    this.pickUpDroppedClothing(playerId, droppedClothing);
  }

  private findOverlappingDroppedClothing(playerId: PlayerId, player: Phaser.GameObjects.Graphics) {
    return this.droppedClothingItems.find((droppedClothing) =>
      droppedClothing.playerId === playerId &&
      Math.abs(player.x - droppedClothing.x) <= (PLAYER_WIDTH + DROPPED_CHEST_WIDTH) / 2 &&
      Math.abs(player.y - droppedClothing.y) <= (PLAYER_HEIGHT + DROPPED_CHEST_HEIGHT) / 2
    );
  }

  private getClothingPickupProgress(playerId: PlayerId) {
    return playerId === 'player1' ? this.playerClothingPickupProgress : this.secondPlayerClothingPickupProgress;
  }

  private setClothingPickupTarget(playerId: PlayerId, droppedClothing: DroppedClothing, progress: number) {
    if (playerId === 'player1') {
      this.playerPickupClothing = droppedClothing;
      this.playerClothingPickupProgress = Phaser.Math.Clamp(progress, 0, 1);
      this.updatePlayerProgressBar();
      return;
    }

    this.secondPlayerPickupClothing = droppedClothing;
    this.secondPlayerClothingPickupProgress = Phaser.Math.Clamp(progress, 0, 1);
    this.updateSecondPlayerProgressBar();
  }

  private resetClothingPickup(playerId: PlayerId) {
    if (playerId === 'player1') {
      if (this.playerClothingPickupProgress === 0 && !this.playerPickupClothing) {
        return;
      }

      this.playerPickupClothing = undefined;
      this.playerClothingPickupProgress = 0;
      this.updatePlayerProgressBar();
      return;
    }

    if (this.secondPlayerClothingPickupProgress === 0 && !this.secondPlayerPickupClothing) {
      return;
    }

    this.secondPlayerPickupClothing = undefined;
    this.secondPlayerClothingPickupProgress = 0;
    this.updateSecondPlayerProgressBar();
  }

  private pickUpDroppedClothing(playerId: PlayerId, droppedClothing: DroppedClothing) {
    const index = this.droppedClothingItems.indexOf(droppedClothing);

    if (index !== -1) {
      this.droppedClothingItems.splice(index, 1);
    }

    droppedClothing.chestSprite.destroy();
    droppedClothing.hairSprite.destroy();
    this.resetClothingPickup(playerId);
    this.setPlayerClothingWorn(playerId, true);
  }

  private setPlayerClothingWorn(playerId: PlayerId, isWearing: boolean) {
    const chestKey = isWearing
      ? 'playerPrefabChestOuter'
      : playerId === 'player1' ? 'playerPrefabChest1' : 'playerPrefabChest2';
    const hairKey = playerId === 'player1' ? 'playerPrefabHair1' : 'playerPrefabHair2';

    if (playerId === 'player1') {
      this.isPlayerWearingClothing = isWearing;
      this.playerChestSprite?.setTexture(chestKey).setDisplaySize(0.78, 0.7);
      this.playerHairSprite?.setVisible(isWearing).setTexture(hairKey).setDisplaySize(0.98, 1);
      return;
    }

    this.isSecondPlayerWearingClothing = isWearing;
    this.secondPlayerChestSprite?.setTexture(chestKey).setDisplaySize(0.78, 0.7);
    this.secondPlayerHairSprite?.setVisible(isWearing).setTexture(hairKey).setDisplaySize(0.98, 1);
  }

  private findClosestAlien(player: Phaser.GameObjects.Graphics, maxDistance: number) {
    let closestAlien: AlienSprite | undefined;
    let closestDistance = maxDistance;

    this.alienSprites.forEach((alien) => {
      const distance = Phaser.Math.Distance.Between(player.x, player.y, alien.x, alien.y);

      if (distance <= closestDistance) {
        closestAlien = alien;
        closestDistance = distance;
      }
    });

    return closestAlien;
  }

  private findClosestAsteroid(player: Phaser.GameObjects.Graphics, maxDistance: number) {
    let closestAsteroid: AsteroidSprite | undefined;
    let closestDistance = maxDistance;

    this.asteroids.forEach((asteroid) => {
      const distance = Phaser.Math.Distance.Between(player.x, player.y, asteroid.x, asteroid.y);

      if (distance <= closestDistance) {
        closestAsteroid = asteroid;
        closestDistance = distance;
      }
    });

    return closestAsteroid;
  }

  private explodeAlien(alien: AlienSprite) {
    const index = this.alienSprites.indexOf(alien);

    if (index !== -1) {
      this.alienSprites.splice(index, 1);
    }

    this.alienDamageStates.delete(alien);
    this.playExplosionTest(alien.x, alien.y);
    alien.destroy();

    if (this.alienSprites.length === 0) {
      this.alienReticle?.setVisible(false);
      this.alienSpawnTimer = 0;
      this.nextAlienSpawnDelay = Phaser.Math.Between(ALIEN_MIN_SPAWN_DELAY, ALIEN_MAX_SPAWN_DELAY);
    }
  }

  private destroyAsteroidByAttack(asteroid: AsteroidSprite) {
    const index = this.asteroids.indexOf(asteroid);

    if (index !== -1) {
      this.asteroids.splice(index, 1);
    }

    if (asteroid === this.pixelAsteroidLaneWarningAsteroid) {
      this.hideRockWarningSign();
      this.pixelAsteroidLaneWarningAsteroid = undefined;
    }

    asteroid.destroy();
  }

  private syncSecondPlayerPrefabVisual() {
    if (!this.secondPlayer || !this.secondPlayerVisual) {
      return;
    }

    this.secondPlayerVisual.setPosition(this.secondPlayer.x, this.secondPlayer.y);
  }

  private updateAsteroids(delta: number) {
    this.asteroidSpawnTimer += delta;
    this.pixelAsteroidLaneSpawnTimer += delta;

    if (this.asteroidSpawnTimer >= this.nextAsteroidSpawnDelay) {
      this.spawnAsteroid();
      this.asteroidSpawnTimer = 0;
      this.nextAsteroidSpawnDelay = Phaser.Math.Between(ASTEROID_MIN_SPAWN_DELAY, ASTEROID_MAX_SPAWN_DELAY);
    }

    if (
      !this.pixelAsteroidLaneWarningAsteroid &&
      this.pixelAsteroidLaneSpawnTimer >= this.nextPixelAsteroidLaneSpawnDelay - PIXEL_ASTEROID_WARNING_LEAD_TIME
    ) {
      this.showRockWarningSign();
    }

    if (this.pixelAsteroidLaneSpawnTimer >= this.nextPixelAsteroidLaneSpawnDelay) {
      this.spawnPixelAsteroidLaneAsteroid();
      this.pixelAsteroidLaneSpawnTimer = 0;
      this.nextPixelAsteroidLaneSpawnDelay = Phaser.Math.Between(
        PIXEL_ASTEROID_LANE_MIN_SPAWN_DELAY,
        PIXEL_ASTEROID_LANE_MAX_SPAWN_DELAY
      );
    }

    const deltaSeconds = delta / 1000;

    for (let index = this.asteroids.length - 1; index >= 0; index -= 1) {
      const asteroid = this.asteroids[index];

      asteroid.x += asteroid.velocityX * deltaSeconds;
      asteroid.rotation += asteroid.rotationSpeed * deltaSeconds;

      if (
        asteroid === this.pixelAsteroidLaneWarningAsteroid &&
        asteroid.x - asteroid.displayWidth / 2 <= this.scale.width
      ) {
        this.hideRockWarningSign();
        this.pixelAsteroidLaneWarningAsteroid = undefined;
      }

      if (
        asteroid.isPixelAsteroidLane &&
        !asteroid.hasTriggeredPixelAsteroidLaneAction &&
        asteroid.x <= PIXEL_ASTEROID_TRIGGER_X
      ) {
        asteroid.hasTriggeredPixelAsteroidLaneAction = true;
        this.onPixelAsteroidLaneReachedTriggerX(asteroid.x, asteroid.y);
        asteroid.destroy();
        this.asteroids.splice(index, 1);
        continue;
      }

      if (asteroid.collisionKind && !asteroid.hasTriggeredPlayerCollision && this.overlapsAnyPlayer(asteroid)) {
        asteroid.hasTriggeredPlayerCollision = true;
        this.onResourceAsteroidHitPlayer(asteroid.collisionKind);
        asteroid.destroy();
        this.asteroids.splice(index, 1);
        continue;
      }

      if (asteroid.x + asteroid.displayWidth / 2 >= -40) {
        continue;
      }

      asteroid.destroy();
      this.asteroids.splice(index, 1);
    }
  }

  private spawnAsteroid() {
    const asteroidAsset = Phaser.Utils.Array.GetRandom(ASTEROID_ASSETS);
    this.createAsteroid(
      asteroidAsset.key,
      Phaser.Math.Between(840, 1000),
      false,
      asteroidAsset.lockAlpha === true,
      asteroidAsset.collisionKind
    );
  }

  private spawnPixelAsteroidLaneAsteroid() {
    this.pixelAsteroidLaneWarningAsteroid = this.createAsteroid(
      'pixelAsteroid',
      Phaser.Math.Between(PIXEL_ASTEROID_LANE_MIN_Y, PIXEL_ASTEROID_LANE_MAX_Y),
      true
    );
  }

  private spawnAlien() {
    const targetPlayer = this.getOutsidePlayerId();

    if (!this.getPlayerById(targetPlayer)) {
      return;
    }

    const spawnSide = Phaser.Utils.Array.GetRandom(['top', 'left', 'right'] as const);
    const alien = this.add.container(0, 0) as AlienSprite;
    const alienSprite = this.add.image(0, 0, 'alien').setDisplaySize(70, 70);

    alien.add(alienSprite);
    alien.setDepth(20);
    alien.speed = ALIEN_SPEED;
    alien.damageCooldown = 0;
    alien.hitRadius = 22;
    alien.knockbackX = 0;
    alien.knockbackY = 0;
    alien.repelledByHit = false;
    alien.targetPlayer = targetPlayer;
    this.alienDamageStates.set(alien, false);
    if (!this.alienReticle) {
      this.alienReticle = this.add.image(0, 0, 'alienReticle').setDisplaySize(40, 40).setDepth(21).setVisible(false);
    }

    const margin = ALIEN_OFFSCREEN_PADDING;

    if (spawnSide === 'top') {
      alien.setPosition(Phaser.Math.Between(margin, this.scale.width - margin), -margin);
    } else if (spawnSide === 'left') {
      alien.setPosition(-margin, Phaser.Math.Between(margin, this.scale.height - margin));
    } else {
      alien.setPosition(this.scale.width + margin, Phaser.Math.Between(margin, this.scale.height - margin));
    }

    this.alienSprites.push(alien);
    return alien;
  }

  private getOutsidePlayerId(): PlayerId {
    return !this.isPlayerInsideShip ? 'player1' : 'player2';
  }

  private getPlayerById(playerId: PlayerId) {
    return playerId === 'player1' ? this.player : this.secondPlayer;
  }

  private createAsteroid(
    textureKey: string,
    y: number,
    isPixelAsteroidLane = false,
    lockAlpha = false,
    collisionKind?: AsteroidCollisionKind
  ) {
    const asteroid = this.add.image(
      this.scale.width + 80,
      y,
      textureKey
    ) as AsteroidSprite;

    asteroid
      .setScale(Phaser.Math.FloatBetween(ASTEROID_MIN_SCALE, ASTEROID_MAX_SCALE))
      .setAlpha(lockAlpha ? 1 : Phaser.Math.FloatBetween(0.65, 1));
    asteroid.velocityX = -Phaser.Math.Between(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED);
    asteroid.rotationSpeed = Phaser.Math.FloatBetween(-1.2, 1.2);
    asteroid.collisionKind = collisionKind;
    asteroid.isPixelAsteroidLane = isPixelAsteroidLane;
    asteroid.hasTriggeredPixelAsteroidLaneAction = false;
    asteroid.hasTriggeredPlayerCollision = false;

    this.asteroids.push(asteroid);

    return asteroid;
  }

  private overlapsAnyPlayer(asteroid: AsteroidSprite) {
    return this.overlapsPlayerBody(asteroid, this.player) || this.overlapsPlayerBody(asteroid, this.secondPlayer);
  }

  private overlapsPlayerBody(asteroid: AsteroidSprite, player?: Phaser.GameObjects.Graphics) {
    if (!player) {
      return false;
    }

    const playerLeft = player.x - PLAYER_WIDTH / 2;
    const playerRight = player.x + PLAYER_WIDTH / 2;
    const playerTop = player.y - PLAYER_HEIGHT / 2;
    const playerBottom = player.y + PLAYER_HEIGHT / 2;
    const asteroidLeft = asteroid.x - asteroid.displayWidth / 2;
    const asteroidRight = asteroid.x + asteroid.displayWidth / 2;
    const asteroidTop = asteroid.y - asteroid.displayHeight / 2;
    const asteroidBottom = asteroid.y + asteroid.displayHeight / 2;

    return asteroidRight >= playerLeft && asteroidLeft <= playerRight && asteroidBottom >= playerTop && asteroidTop <= playerBottom;
  }

  private updateCollisionBodyDebug() {
    if (!this.collisionBodyDebug) {
      return;
    }

    this.collisionBodyDebug.clear();

    if (!this.isCollisionDebugVisible || !this.player) {
      this.collisionBodyDebug.setVisible(false);
      return;
    }

    this.collisionBodyDebug
      .setVisible(true)
      .lineStyle(2, 0x38bdf8, 1)
      .strokeRect(
        this.player.x - PLAYER_WIDTH / 2,
        this.player.y - PLAYER_HEIGHT / 2,
        PLAYER_WIDTH,
        PLAYER_HEIGHT
      );

    if (this.secondPlayer) {
      this.collisionBodyDebug
        .lineStyle(2, 0xc084fc, 1)
        .strokeRect(
          this.secondPlayer.x - PLAYER_WIDTH / 2,
          this.secondPlayer.y - PLAYER_HEIGHT / 2,
          PLAYER_WIDTH,
          PLAYER_HEIGHT
        );
    }

    this.asteroids.forEach((asteroid) => {
      if (!asteroid.collisionKind) {
        return;
      }

      const color = asteroid.collisionKind === 'metalDebris' ? 0xfacc15 : 0x67e8f9;

      this.collisionBodyDebug!
        .lineStyle(2, color, 1)
        .strokeRect(
          asteroid.x - asteroid.displayWidth / 2,
          asteroid.y - asteroid.displayHeight / 2,
          asteroid.displayWidth,
          asteroid.displayHeight
        );
    });
  }

  private damagePlayer(amount: number) {
    if (!this.player) {
      return;
    }

    this.setPlayerHealth(this.playerHealth - amount);
    this.updatePlayerSpeedUi();

    this.player?.clear();
    this.player
      .fillStyle(this.playerHealth <= 0 ? 0xff6b6b : 0x38bdf8, 1)
      .fillRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .lineStyle(3, this.playerHealth <= 0 ? 0xffd1d1 : 0xe0f2fe, 1)
      .strokeRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2);
  }

  private damageSecondPlayer(amount: number) {
    if (!this.secondPlayer) {
      return;
    }

    this.setSecondPlayerHealth(this.secondPlayerHealth - amount);

    this.secondPlayer.clear();
    this.secondPlayer
      .fillStyle(this.secondPlayerHealth <= 0 ? 0xff6b6b : 0xa78bfa, 1)
      .fillRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .lineStyle(3, this.secondPlayerHealth <= 0 ? 0xffd1d1 : 0xede9fe, 1)
      .strokeRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .setVisible(false);
  }

  private destroyAlien(alien: AlienSprite) {
    this.alienDamageStates.delete(alien);
    alien.destroy();

    if (this.alienSprites.length === 0) {
      this.alienReticle?.setVisible(false);
      this.alienSpawnTimer = 0;
      this.nextAlienSpawnDelay = Phaser.Math.Between(ALIEN_MIN_SPAWN_DELAY, ALIEN_MAX_SPAWN_DELAY);
    }
  }

  private onMetalDebrisHitPlayer() {
    this.collectResource('metalDebris');
    this.damagePlayer(10);
  }

  private onIceCrystalHitPlayer() {
    this.collectResource('iceCrystal');
    this.damagePlayer(7);
  }
  
  private onResourceAsteroidHitPlayer(collisionKind: AsteroidCollisionKind) {
    const resourceName = collisionKind === 'metalDebris' ? '金属碎片' : '冰晶';

    this.incrementResourceCount(collisionKind);
    console.log(`获取到${resourceName}资源`);
  }

  private updateResourcesUi() {
    this.resourcesText?.setText(`金属碎片: ${this.metalDebrisCount}\n冰晶: ${this.iceCrystalCount}`);
  }

  private onPixelAsteroidLaneReachedTriggerX(x: number, y: number) {
    console.log('上面陨石撞到了飞船');
    this.setOuterWrong(true);
    this.playExplosionTest(x, y);
  }

  private setOuterWrong(isWrong: boolean) {
    if (this.isOuterWrong === isWrong) {
      return;
    }

    this.isOuterWrong = isWrong;
    this.outerWrongOverlay?.setVisible(isWrong);
    this.setSnowNoiseOverlayVisible(isWrong);
    this.updateOuterWrongUi();

    if (!isWrong) {
      if (this.secondPlayerState === 'Outer-Repairing') {
        this.secondPlayerState = 'Normal';
      }

      this.setSecondPlayerProgress(0);
    }
  }

  private updateOuterWrongUi() {
    if (!this.outerRepairButton || !this.outerRepairText) {
      return;
    }

    this.outerRepairButton.setFillStyle(this.isOuterWrong ? 0xdc2626 : 0x475569, 1);
    this.outerRepairText.setText(this.isOuterWrong ? 'Repair' : 'Normal');
    this.outerRepairText.setX(this.isOuterWrong ? 125 : 126);
  }

  private updateOuterWrongEntryDetection() {
    const isPlayerInside = this.player ? this.overlapsMask(OUTER_WRONG_MASK_ID, this.player.x, this.player.y) : false;
    const isSecondPlayerInside = this.secondPlayer
      ? this.overlapsMask(OUTER_WRONG_MASK_ID, this.secondPlayer.x, this.secondPlayer.y)
      : false;

    if (isPlayerInside && !this.wasPlayerInsideOuterWrong) {
      console.log('Player1进入OuterWrong区域');
    }

    if (isSecondPlayerInside && !this.wasSecondPlayerInsideOuterWrong) {
      console.log('Player2进入OuterWrong区域');
    }

    this.wasPlayerInsideOuterWrong = isPlayerInside;
    this.wasSecondPlayerInsideOuterWrong = isSecondPlayerInside;
  }

  private playExplosionTest(x: number, y: number) {
    const explosion = this.add.sprite(x, y, EXPLOSION_FRAME_KEYS[0]).setScale(4);

    explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      explosion.destroy();
    });
    explosion.play(EXPLOSION_ANIMATION_KEY);
  }

  private updatePlayerHealthBar() {
    if (!this.player || !this.playerHealthBar) {
      return;
    }

    const healthRatio = Phaser.Math.Clamp(this.playerHealth / PLAYER_MAX_HEALTH, 0, 1);
    const x = this.player.x - PLAYER_HEALTH_BAR_WIDTH / 2;
    const y = this.player.y + PLAYER_HEALTH_BAR_OFFSET_Y;

    this.playerHealthBar
      .clear()
      .fillStyle(0x000000, 0.8)
      .fillRoundedRect(x - 2, y - 2, PLAYER_HEALTH_BAR_WIDTH + 4, PLAYER_HEALTH_BAR_HEIGHT + 4, 3)
      .fillStyle(0x7f1d1d, 1)
      .fillRoundedRect(x, y, PLAYER_HEALTH_BAR_WIDTH, PLAYER_HEALTH_BAR_HEIGHT, 2)
      .fillStyle(0x22c55e, 1)
      .fillRoundedRect(x, y, PLAYER_HEALTH_BAR_WIDTH * healthRatio, PLAYER_HEALTH_BAR_HEIGHT, 2)
      .lineStyle(1, 0xffffff, 0.8)
      .strokeRoundedRect(x, y, PLAYER_HEALTH_BAR_WIDTH, PLAYER_HEALTH_BAR_HEIGHT, 2);
  }

  private updateSecondPlayerHealthBar() {
    if (!this.secondPlayer || !this.secondPlayerHealthBar) {
      return;
    }

    const healthRatio = Phaser.Math.Clamp(this.secondPlayerHealth / PLAYER_MAX_HEALTH, 0, 1);
    const x = this.secondPlayer.x - PLAYER_HEALTH_BAR_WIDTH / 2;
    const y = this.secondPlayer.y + PLAYER_HEALTH_BAR_OFFSET_Y;

    this.secondPlayerHealthBar
      .clear()
      .fillStyle(0x000000, 0.8)
      .fillRoundedRect(x - 2, y - 2, PLAYER_HEALTH_BAR_WIDTH + 4, PLAYER_HEALTH_BAR_HEIGHT + 4, 3)
      .fillStyle(0x7f1d1d, 1)
      .fillRoundedRect(x, y, PLAYER_HEALTH_BAR_WIDTH, PLAYER_HEALTH_BAR_HEIGHT, 2)
      .fillStyle(0x22c55e, 1)
      .fillRoundedRect(x, y, PLAYER_HEALTH_BAR_WIDTH * healthRatio, PLAYER_HEALTH_BAR_HEIGHT, 2)
      .lineStyle(1, 0xffffff, 0.8)
      .strokeRoundedRect(x, y, PLAYER_HEALTH_BAR_WIDTH, PLAYER_HEALTH_BAR_HEIGHT, 2);
  }

  private updateSecondPlayerProgressBar() {
    if (!this.secondPlayer || !this.secondPlayerProgressBar) {
      return;
    }

    if (!this.isRepairingState(this.secondPlayerState)) {
      const pickupProgress = Math.max(this.secondPlayerExtinguisherPickupProgress, this.secondPlayerClothingPickupProgress);

      if (pickupProgress <= 0) {
        this.secondPlayerProgressBar.clear().setVisible(false);
        return;
      }

      this.drawProgressCircle(
        this.secondPlayerProgressBar,
        this.secondPlayer,
        pickupProgress,
        0xa78bfa
      );
      return;
    }

    this.drawProgressCircle(
      this.secondPlayerProgressBar,
      this.secondPlayer,
      this.getSecondPlayerSceneProgress(),
      0xa78bfa
    );
  }

  private drawProgressCircle(
    progressBar: Phaser.GameObjects.Graphics,
    player: Phaser.GameObjects.Graphics,
    progress: number,
    color: number
  ) {
    progressBar
      .setVisible(true)
      .setPosition(player.x + PLAYER_PROGRESS_OFFSET_X, player.y + PLAYER_PROGRESS_OFFSET_Y)
      .clear()
      .fillStyle(0x000000, 0.75)
      .fillCircle(0, 0, PLAYER_PROGRESS_RADIUS + PLAYER_PROGRESS_LINE_WIDTH)
      .lineStyle(PLAYER_PROGRESS_LINE_WIDTH, 0x475569, 1)
      .strokeCircle(0, 0, PLAYER_PROGRESS_RADIUS)
      .lineStyle(PLAYER_PROGRESS_LINE_WIDTH, color, 1)
      .beginPath()
      .arc(
        0,
        0,
        PLAYER_PROGRESS_RADIUS,
        -Math.PI / 2,
        -Math.PI / 2 + Math.PI * 2 * Phaser.Math.Clamp(progress, 0, 1),
        false
      )
      .strokePath();
  }

  private updatePlayerCoordinateUi() {
    if (!this.player || !this.coordinateText) {
      return;
    }

    this.coordinateText.setText(
      `X: ${Math.round(this.player.x)} Y: ${Math.round(this.player.y)} ${this.isPlayerInsideShip ? 'In' : 'Out'}`
    );
    this.updatePlayerInfoUi();
  }

  private updatePlayerInfoUi() {
    if (!this.player || !this.playerInfoText) {
      return;
    }

    const area = this.isPlayerInsideShip ? 'Inside' : 'Outside';
    const gravity = this.isGravityEnabled ? 'On' : 'Off';
    const handTool = PLAYER_HAND_TOOL_ASSETS[this.currentHandToolIndex].label;

    this.playerInfoText.setText(
      `Position: X ${Math.round(this.player.x)} Y ${Math.round(this.player.y)}\nArea: ${area}\nGravity: ${gravity}\nState: ${this.playerState}`
    );
    this.updatePlayerPanelControls(
      this.playerPanelControls,
      this.playerPrefabAnimationState,
      this.playerProgress,
      handTool
    );
  }

  private updatePlayerPanelControls(
    controls: PlayerPanelControls | undefined,
    animation: PlayerPrefabAnimationName,
    progress: number,
    handTool: string
  ) {
    if (!controls) {
      return;
    }

    const clampedProgress = Phaser.Math.Clamp(progress, 0, 1);

    controls.animationText.setText(animation);
    controls.animationText.setX(animation.length > 5 ? 116 : 132);
    controls.progressFill.setDisplaySize(PANEL_SLIDER_WIDTH * clampedProgress, 6);
    controls.progressHandle.setX(PANEL_CONTROL_X + PANEL_SLIDER_WIDTH * clampedProgress);
    controls.progressText.setText(`${Math.round(clampedProgress * 100)}%`);
    controls.handToolText.setText(handTool);
    controls.handToolText.setX(handTool.length > 6 ? 103 : 132);
  }

  private setPlayerHealth(health: number) {
    this.playerHealth = Phaser.Math.Clamp(health, 0, PLAYER_MAX_HEALTH);
    this.updatePlayerHealthBar();
    this.updatePlayerInfoUi();
  }

  private setSecondPlayerHealth(health: number) {
    this.secondPlayerHealth = Phaser.Math.Clamp(health, 0, PLAYER_MAX_HEALTH);
    this.updateSecondPlayerHealthBar();
    this.updateSecondPlayerInfoUi();
  }

  private getPlayerHealthSpeedMultiplier() {
    const missingHealth = PLAYER_MAX_HEALTH - this.playerHealth;

    return Phaser.Math.Clamp(1 - missingHealth / 200, 0.55, 1);
  }

  private getSecondPlayerHealthSpeedMultiplier() {
    const missingHealth = PLAYER_MAX_HEALTH - this.secondPlayerHealth;

    return Phaser.Math.Clamp(1 - missingHealth / 200, 0.55, 1);
  }

  private updatePlayerSpeedUi() {
    if (!this.stateText) {
      return;
    }

    const speedPercent = Math.round(this.getPlayerHealthSpeedMultiplier() * 100);

    this.stateText.setText(`${this.playerState}${this.playerHealth < PLAYER_MAX_HEALTH ? ` · ${speedPercent}%` : ''}`);
  }

  private updateHealing(delta: number) {
    if (this.playerState !== 'Healing' || this.playerHealth >= PLAYER_MAX_HEALTH) {
      return;
    }

    this.setPlayerHealth(this.playerHealth + PLAYER_HEAL_PER_SECOND * (delta / 1000));
  }

  private updateSecondHealing(delta: number) {
    if (this.secondPlayerState !== 'Healing' || this.secondPlayerHealth >= PLAYER_MAX_HEALTH) {
      return;
    }

    this.setSecondPlayerHealth(this.secondPlayerHealth + PLAYER_HEAL_PER_SECOND * (delta / 1000));
  }

  private updatePlayerProgressBar() {
    if (!this.player || !this.playerProgressBar) {
      return;
    }

    if (!this.isRepairingState(this.playerState)) {
      const pickupProgress = Math.max(this.playerExtinguisherPickupProgress, this.playerClothingPickupProgress);

      if (pickupProgress <= 0) {
        this.playerProgressBar.clear().setVisible(false);
        this.updateProgressSlider(this.playerProgress);
        return;
      }

      this.drawProgressCircle(
        this.playerProgressBar,
        this.player,
        pickupProgress,
        0x22c55e
      );
      this.updateProgressSlider(this.playerProgress);
      return;
    }

    this.drawProgressCircle(
      this.playerProgressBar,
      this.player,
      this.getPlayerSceneProgress(),
      0x22c55e
    );

    this.updateProgressSlider(this.playerProgress);
  }

  private getPlayerSceneProgress() {
    return this.playerState === 'Working' ? this.playerWorkshopProgress : this.playerProgress;
  }

  private getSecondPlayerSceneProgress() {
    return this.secondPlayerState === 'Working' ? this.secondPlayerWorkshopProgress : this.secondPlayerProgress;
  }

  private setPlayerProgress(progress: number) {
    this.playerProgress = Phaser.Math.Clamp(progress, 0, 1);
    this.updatePlayerProgressBar();
    this.updatePlayerInfoUi();
  }

  private updateRepairProgress(delta: number) {
    if (this.playerState !== 'Driving-Repairing' || !this.keys?.E.isDown) {
      return;
    }

    this.setPlayerProgress(this.playerProgress + PLAYER_REPAIR_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.playerProgress < 1) {
      return;
    }

    this.setDriveRoomOption('Normal');
    this.setPlayerProgress(0);
    this.playerState = this.overlapsCurrentDriveRoom() ? 'Driving' : 'Normal';
    this.applyPlayerState();
    this.updatePlayerProgressBar();
  }

  private updateSecondPlayerRepairProgress(delta: number) {
    if (this.secondPlayerState !== 'Driving-Repairing' || !this.isSecondPlayerInteractInputDown()) {
      return;
    }

    this.setSecondPlayerProgress(this.secondPlayerProgress + PLAYER_REPAIR_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.secondPlayerProgress < 1) {
      return;
    }

    this.setDriveRoomOption('Normal');
    this.setSecondPlayerProgress(0);
    this.secondPlayerState = this.overlapsSecondPlayerCurrentDriveRoom() ? 'Driving' : 'Normal';
    this.applySecondPlayerState();
    this.updateSecondPlayerProgressBar();
  }

  private updateRepoProgress(delta: number) {
    if (this.playerState !== 'Repoing' || !this.keys?.E.isDown) {
      return;
    }

    this.setPlayerProgress(this.playerProgress + PLAYER_REPO_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.playerProgress < 1) {
      return;
    }

    this.acquireFireExtinguisher();
  }

  private updateSecondPlayerRepoProgress(delta: number) {
    if (this.secondPlayerState !== 'Repoing' || !this.isSecondPlayerInteractInputDown()) {
      return;
    }

    this.setSecondPlayerProgress(this.secondPlayerProgress + PLAYER_REPO_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.secondPlayerProgress < 1) {
      return;
    }

    this.acquireSecondPlayerFireExtinguisher();
  }

  private updateOuterRepairProgress(delta: number) {
    if (this.playerState !== 'Outer-Repairing') {
      return;
    }

    this.setPlayerProgress(this.playerProgress + PLAYER_OUTER_REPAIR_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.playerProgress < 1) {
      return;
    }

    this.repairOuterFromPlayer();
  }

  private updateSecondPlayerOuterRepairProgress(delta: number) {
    if (this.secondPlayerState !== 'Outer-Repairing') {
      return;
    }

    this.setSecondPlayerProgress(this.secondPlayerProgress + PLAYER_OUTER_REPAIR_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.secondPlayerProgress < 1) {
      return;
    }

    this.repairOuterFromSecondPlayer();
  }

  private updateFirefightingProgress(delta: number) {
    if (this.playerState !== 'Firefighting' || !this.keys?.E.isDown || !this.playerFirefightingRoom) {
      return;
    }

    this.setPlayerProgress(this.playerProgress + PLAYER_FIRE_EXTINGUISH_PROGRESS_PER_SECOND * (delta / 1000));

    if (this.playerProgress < 1) {
      return;
    }

    this.completeFirefighting('player1');
  }

  private updateSecondPlayerFirefightingProgress(delta: number) {
    if (this.secondPlayerState !== 'Firefighting' || !this.isSecondPlayerInteractInputDown() || !this.secondPlayerFirefightingRoom) {
      return;
    }

    this.setSecondPlayerProgress(
      this.secondPlayerProgress + PLAYER_FIRE_EXTINGUISH_PROGRESS_PER_SECOND * (delta / 1000)
    );

    if (this.secondPlayerProgress < 1) {
      return;
    }

    this.completeFirefighting('player2');
  }

  private completeFirefighting(playerId: PlayerId) {
    const roomId = playerId === 'player1' ? this.playerFirefightingRoom : this.secondPlayerFirefightingRoom;

    if (!roomId) {
      return;
    }

    this.setFireRoomNormal(roomId);

    if (playerId === 'player1') {
      this.playerFirefightingRoom = undefined;
      this.setPlayerProgress(0);
      this.playerState = 'Normal';
      this.applyPlayerState();
      this.updatePlayerProgressBar();
      return;
    }

    this.secondPlayerFirefightingRoom = undefined;
    this.setSecondPlayerProgress(0);
    this.secondPlayerState = 'Normal';
    this.applySecondPlayerState();
    this.updateSecondPlayerProgressBar();
  }

  private updateWorkshopProgress(delta: number) {
    if (this.playerState !== 'Working' || !this.keys?.E.isDown || !this.hasWorkshopResources()) {
      return;
    }

    this.playerWorkshopProgress = Phaser.Math.Clamp(
      this.playerWorkshopProgress + PLAYER_WORKSHOP_PROGRESS_PER_SECOND * (delta / 1000),
      0,
      1
    );
    this.updatePlayerProgressBar();

    if (this.playerWorkshopProgress < 1) {
      return;
    }

    this.completeWorkshopCraft('player1');
  }

  private updateSecondPlayerWorkshopProgress(delta: number) {
    if (this.secondPlayerState !== 'Working' || !this.isSecondPlayerInteractInputDown() || !this.hasWorkshopResources()) {
      return;
    }

    this.secondPlayerWorkshopProgress = Phaser.Math.Clamp(
      this.secondPlayerWorkshopProgress + PLAYER_WORKSHOP_PROGRESS_PER_SECOND * (delta / 1000),
      0,
      1
    );
    this.updateSecondPlayerProgressBar();

    if (this.secondPlayerWorkshopProgress < 1) {
      return;
    }

    this.completeWorkshopCraft('player2');
  }

  private completeWorkshopCraft(playerId: PlayerId) {
    this.shipEnergy = Math.min(this.shipEnergy + 50, SHIP_MAX_ENERGY);
    this.shipEnergyText?.setText(`${Math.round(this.shipEnergy)}`);
    this.updateShipEnergyCrystalFrame();
    this.resetResourceCounts();

    if (playerId === 'player1') {
      this.playerWorkshopProgress = 0;
      this.playerState = 'Normal';
      this.applyPlayerState();
      this.updatePlayerProgressBar();
      return;
    }

    this.secondPlayerWorkshopProgress = 0;
    this.secondPlayerState = 'Normal';
    this.applySecondPlayerState();
    this.updateSecondPlayerProgressBar();
  }

  private resetResourceCounts() {
    this.metalDebrisCount = 0;
    this.iceCrystalCount = 0;
    this.resourceCounts.metalDebris = 0;
    this.resourceCounts.iceCrystal = 0;
    this.updateResourceCounterUi('metalDebris');
    this.updateResourceCounterUi('iceCrystal');
    this.updateResourcesUi();
  }

  private repairOuterFromSecondPlayer() {
    this.setOuterWrong(false);
    this.setSecondPlayerProgress(0);
    this.secondPlayerState = 'Normal';
    this.applySecondPlayerState();
    this.updateSecondPlayerProgressBar();
    this.updateSecondPlayerInfoUi();
  }

  private repairOuterFromPlayer() {
    this.setOuterWrong(false);
    this.setPlayerProgress(0);
    this.playerState = 'Normal';
    this.applyPlayerState();
    this.updatePlayerProgressBar();
  }

  private acquireFireExtinguisher() {
    this.setRepoRoomOption('Empty');
    this.setPlayerHandToolByLabel('Extinguisher');
    this.setPlayerProgress(0);
    this.playerState = 'Normal';
    this.applyPlayerState();
    this.updatePlayerProgressBar();
  }

  private acquireSecondPlayerFireExtinguisher() {
    this.setRepoRoomOption('Empty');
    this.setSecondPlayerHandToolByLabel('Extinguisher');
    this.setSecondPlayerProgress(0);
    this.secondPlayerState = 'Normal';
    this.applySecondPlayerState();
    this.updateSecondPlayerProgressBar();
  }

  private updateProgressSlider(progress: number) {
    if (!this.progressSliderFill || !this.progressSliderHandle || !this.progressSliderText) {
      return;
    }

    const clampedProgress = Phaser.Math.Clamp(progress, 0, 1);
    const fillWidth = PANEL_SLIDER_WIDTH * clampedProgress;

    this.progressSliderFill.setDisplaySize(fillWidth, 6);
    this.progressSliderHandle.setX(PANEL_CONTROL_X + fillWidth);
    this.progressSliderText.setText(`${Math.round(clampedProgress * 100)}%`);
  }

  private setDriveRoomOption(label: string) {
    const option = DRIVE_ROOM_CONFIG.layerOptions.find((roomOption) => roomOption.label === label);

    if (!option || !this.driveOverlay || !this.driveSelectedText) {
      return;
    }

    this.currentDriveRoomOption = option.label;
    this.driveSelectedText.setText(option.label);
    this.driveSelectedText.setX(option.label === 'Wrong' ? 112 : 104);
    this.driveStateButton?.setFillStyle(option.label === 'Wrong' ? 0xdc2626 : 0x22c55e, 1);
    this.updateDriveWarningSignVisibility();
    this.updateAlarmSound();

    if (!option.textureKey) {
      this.driveOverlay.setVisible(false);
      return;
    }

    this.driveOverlay.setTexture(option.textureKey).setVisible(true);
  }

  private setLivingRoomOption(label: string) {
    this.setFireRoomOption(
      LIVING_ROOM_CONFIG,
      label,
      this.livingOverlay,
      this.livingSelectedText,
      this.livingStateButton,
      (optionLabel) => {
        this.currentLivingRoomOption = optionLabel;
      }
    );
    this.updateLivingWarningSignVisibility();
    this.updateAlarmSound();
  }

  private setPlantRoomOption(label: string) {
    this.setFireRoomOption(
      PLANT_ROOM_CONFIG,
      label,
      this.plantOverlay,
      this.plantSelectedText,
      this.plantStateButton,
      (optionLabel) => {
        this.currentPlantRoomOption = optionLabel;
      }
    );
    this.updatePlantWarningSignVisibility();
    this.updateAlarmSound();
  }

  private updateAlarmSound() {
    if (!this.alarmSound) {
      return;
    }

    const shouldPlayAlarm = this.isAnyShipRoomOnFire();

    if (shouldPlayAlarm && !this.alarmSound.isPlaying) {
      this.alarmSound.play();
      return;
    }

    if (!shouldPlayAlarm && this.alarmSound.isPlaying) {
      this.alarmSound.stop();
    }
  }

  private isAnyShipRoomOnFire() {
    return this.currentDriveRoomOption === 'Wrong' ||
      this.currentLivingRoomOption === 'Wrong' ||
      this.currentPlantRoomOption === 'Wrong';
  }

  private setFireRoomOption(
    roomConfig: RoomConfig,
    label: string,
    overlay: Phaser.GameObjects.Image | undefined,
    selectedText: Phaser.GameObjects.Text | undefined,
    stateButton: Phaser.GameObjects.Rectangle | undefined,
    setCurrentOption: (label: string) => void
  ) {
    const option = roomConfig.layerOptions.find((roomOption) => roomOption.label === label);

    if (!option || !option.textureKey || !overlay || !selectedText) {
      return;
    }

    setCurrentOption(option.label);
    selectedText.setText(option.label);
    selectedText.setX(option.label === 'Wrong' ? 112 : 104);
    stateButton?.setFillStyle(option.label === 'Wrong' ? 0xdc2626 : 0x22c55e, 1);
    overlay.setTexture(option.textureKey).setVisible(true);
  }

  private setRepoRoomOption(label: string) {
    const option = REPO_ROOM_CONFIG.layerOptions.find((roomOption) => roomOption.label === label);

    if (!option || !option.textureKey || !this.repoOverlay || !this.repoSelectedText) {
      return;
    }

    this.currentRepoRoomOption = option.label;
    this.repoSelectedText.setText(option.label);
    this.repoSelectedText.setX(option.label === 'Empty' ? 118 : 126);
    this.repoStateButton?.setFillStyle(option.label === 'Empty' ? 0x475569 : 0x22c55e, 1);
    this.repoOverlay.setTexture(option.textureKey).setVisible(true);
  }

  private updateDriveWarningSignVisibility() {
    if (!this.driveWarningSign) {
      return;
    }

    const isVisible = this.isDriveRoomWrong();

    this.driveWarningBlinkTime = 0;
    this.driveWarningSign.setVisible(isVisible).setAlpha(isVisible ? 1 : 0);
  }

  private updateLivingWarningSignVisibility() {
    if (!this.livingWarningSign) {
      return;
    }

    const isVisible = this.currentLivingRoomOption === 'Wrong';

    this.driveWarningBlinkTime = 0;
    this.livingWarningSign.setVisible(isVisible).setAlpha(isVisible ? 1 : 0);
  }

  private updatePlantWarningSignVisibility() {
    if (!this.plantWarningSign) {
      return;
    }

    const isVisible = this.currentPlantRoomOption === 'Wrong';

    this.driveWarningBlinkTime = 0;
    this.plantWarningSign.setVisible(isVisible).setAlpha(isVisible ? 1 : 0);
  }

  private updateDriveWarningSign(delta: number) {
    if (
      !this.driveWarningSign?.visible &&
      !this.livingWarningSign?.visible &&
      !this.plantWarningSign?.visible &&
      !this.rockWarningSign?.visible &&
      !this.energyWarningSign?.visible &&
      !this.swapWarningSign?.visible
    ) {
      return;
    }

    this.driveWarningBlinkTime += delta / 1000;

    const blink = (Math.sin(this.driveWarningBlinkTime * WARNING_SIGN_BLINK_SPEED) + 1) / 2;
    const alpha = 0.25 + blink * 0.5;

    if (this.driveWarningSign?.visible) {
      this.driveWarningSign.setAlpha(alpha);
    }

    if (this.livingWarningSign?.visible) {
      this.livingWarningSign.setAlpha(alpha);
    }

    if (this.plantWarningSign?.visible) {
      this.plantWarningSign.setAlpha(alpha);
    }

    if (this.rockWarningSign?.visible) {
      this.rockWarningSign.setAlpha(alpha);
    }

    if (this.energyWarningSign?.visible) {
      this.energyWarningSign.setAlpha(alpha);
    }

    if (this.swapWarningSign?.visible) {
      this.swapWarningSign.setAlpha(alpha);
    }
  }

  private showRockWarningSign() {
    if (!this.rockWarningSign || this.rockWarningSign.visible) {
      return;
    }

    this.driveWarningBlinkTime = 0;
    this.rockWarningSign.setVisible(true).setAlpha(1);
  }

  private hideRockWarningSign() {
    if (!this.rockWarningSign) {
      return;
    }

    this.rockWarningSign.setVisible(false).setAlpha(0);
  }

  private startSwapWarningCountdown() {
    this.swapWarningRemaining = SWAP_WARNING_DURATION;
    this.driveWarningBlinkTime = 0;
    this.swapWarningSign?.setVisible(true).setAlpha(1);
    this.swapWarningText?.setVisible(true);
    this.updateSwapWarningText();
  }

  private updateSwapWarningCountdown(delta: number) {
    if (this.swapWarningRemaining <= 0) {
      return;
    }

    this.swapWarningRemaining = Math.max(this.swapWarningRemaining - delta, 0);
    this.updateSwapWarningText();

    if (this.swapWarningRemaining === 0) {
      this.swapWarningSign?.setVisible(false).setAlpha(0);
      this.swapWarningText?.setVisible(false);
    }
  }

  private updateSwapWarningText() {
    if (!this.swapWarningText) {
      return;
    }

    const remainingSeconds = Math.ceil(this.swapWarningRemaining / 1000);
    this.swapWarningText.setText(`还有${remainingSeconds}秒交换`);
  }

  private isRepairingState(state: PlayerState) {
    return state.endsWith('-Repairing') || state === 'Repoing' || state === 'Working' || state === 'Firefighting';
  }

  private hasWorkshopResources() {
    return this.metalDebrisCount >= RESOURCE_COUNTER_MAX && this.iceCrystalCount >= RESOURCE_COUNTER_MAX;
  }

  private isDriveRoomWrong() {
    return this.currentDriveRoomOption === 'Wrong';
  }

  private isRepoRoomFull() {
    return this.currentRepoRoomOption === 'Full';
  }

  private overlapsSecondPlayerCurrentDriveRoom() {
    if (!this.secondPlayer) {
      return false;
    }

    return this.overlapsRoom(DRIVE_ROOM_CONFIG, this.secondPlayer.x, this.secondPlayer.y);
  }

  private overlapsCurrentDriveRoom() {
    if (!this.player) {
      return false;
    }

    return this.overlapsRoom(DRIVE_ROOM_CONFIG, this.player.x, this.player.y);
  }

  private setPlayerPrefabFacing(facingX: -1 | 1) {
    if (!this.playerPrefabVisual || this.playerPrefabVisual.scaleX === facingX) {
      return;
    }

    this.playerPrefabVisual.setScale(facingX, 1);
  }

  private setSecondPlayerPrefabFacing(facingX: -1 | 1) {
    if (!this.secondPlayerVisual || this.secondPlayerVisual.scaleX === facingX) {
      return;
    }

    this.secondPlayerVisual.setScale(facingX, 1);
  }

  public playPlayerPrefabAnimation(animationName: PlayerPrefabAnimationName, restart = true) {
    if (!PLAYER_PREFAB_ANIMATIONS[animationName]) {
      return false;
    }

    if (this.playerPrefabAnimationState !== animationName || restart) {
      this.playerPrefabAnimationState = animationName;
      this.playerPrefabAnimationTime = 0;
    }

    this.updatePlayerPrefabAnimation(0);
    this.updatePlayerInfoUi();

    return true;
  }

  private playSecondPlayerPrefabAnimation(animationName: PlayerPrefabAnimationName, restart = true) {
    if (!PLAYER_PREFAB_ANIMATIONS[animationName]) {
      return false;
    }

    if (this.secondPlayerAnimationState !== animationName || restart) {
      this.secondPlayerAnimationState = animationName;
      this.secondPlayerPrefabAnimationTime = 0;
    }

    this.updateSecondPlayerPrefabAnimation(0);
    this.updateSecondPlayerInfoUi();

    return true;
  }

  public getPlayerPrefabAnimationState() {
    return this.playerPrefabAnimationState;
  }

  private exposePlayerAnimationInterface() {
    const animationWindow = window as PlayerAnimationWindow;

    animationWindow.playPlayerAnimation = (animationName) => this.playPlayerPrefabAnimation(animationName);
    animationWindow.getPlayerAnimationState = () => this.getPlayerPrefabAnimationState();
  }

  private updateSwapClock(delta: number) {
    this.swapClockSeconds += delta / 1000;

    let currentInterval = this.getCurrentSwapClockInterval();

    while (this.swapClockSeconds >= currentInterval) {
      this.swapClockSeconds -= currentInterval;
      this.swapClockCompletedLaps += 1;
      this.swapPlayerPositions();
      currentInterval = this.getCurrentSwapClockInterval();
    }

    this.drawSecondClock((this.swapClockSeconds / currentInterval) * 60);
  }

  private getCurrentSwapClockInterval() {
    return SWAP_CLOCK_INTERVAL_SECONDS[Math.min(this.swapClockCompletedLaps, SWAP_CLOCK_INTERVAL_SECONDS.length - 1)];
  }

  private drawSecondClock(elapsedSeconds: number) {
    if (!this.secondClock) {
      return;
    }

    const centerX = this.scale.width - SECOND_CLOCK_OFFSET_X;
    const centerY = SECOND_CLOCK_OFFSET_Y;
    const handAngle = Phaser.Math.DegToRad((elapsedSeconds % 60) * 6 - 90);
    const handLength = SECOND_CLOCK_RADIUS - 5;
    const handX = centerX + Math.cos(handAngle) * handLength;
    const handY = centerY + Math.sin(handAngle) * handLength;

    this.secondClock
      .clear()
      .fillStyle(0x000000, 1)
      .fillCircle(centerX, centerY, SECOND_CLOCK_RADIUS + 5)
      .lineStyle(3, 0xffffff, 1)
      .strokeCircle(centerX, centerY, SECOND_CLOCK_RADIUS);

    for (let tick = 0; tick < 60; tick += 5) {
      const tickAngle = Phaser.Math.DegToRad(tick * 6 - 90);
      const innerRadius = SECOND_CLOCK_RADIUS - 5;
      const outerRadius = SECOND_CLOCK_RADIUS - 1;

      this.secondClock
        .lineStyle(2, 0x94a3b8, 1)
        .lineBetween(
          centerX + Math.cos(tickAngle) * innerRadius,
          centerY + Math.sin(tickAngle) * innerRadius,
          centerX + Math.cos(tickAngle) * outerRadius,
          centerY + Math.sin(tickAngle) * outerRadius
        );
    }

    this.secondClock
      .lineStyle(3, 0xef4444, 1)
      .lineBetween(centerX, centerY, handX, handY)
      .fillStyle(0xef4444, 1)
      .fillCircle(centerX, centerY, 3);
  }

  private updatePlayerPrefabAnimation(delta: number) {
    const clip = PLAYER_PREFAB_ANIMATIONS[this.playerPrefabAnimationState];

    if (!this.playerPrefabAnimationNodes || !this.playerPrefabAnimationSprites) {
      return;
    }

    this.playerPrefabAnimationTime += delta / 1000;

    if (clip.loop) {
      this.playerPrefabAnimationTime %= clip.duration;
    } else {
      this.playerPrefabAnimationTime = Math.min(this.playerPrefabAnimationTime, clip.duration);
    }

    this.applyPlayerPrefabAnimationFrame(clip, this.playerPrefabAnimationTime);

    if (!clip.loop && this.playerPrefabAnimationTime >= clip.duration && this.playerPrefabAnimationState === 'Attack') {
      this.setPlayerHandToolByLabel('None');
      this.playPlayerPrefabAnimation('Idle');
    }
  }

  private updateSecondPlayerPrefabAnimation(delta: number) {
    const clip = PLAYER_PREFAB_ANIMATIONS[this.secondPlayerAnimationState];

    if (!this.secondPlayerPrefabAnimationNodes || !this.secondPlayerPrefabAnimationSprites) {
      return;
    }

    this.secondPlayerPrefabAnimationTime += delta / 1000;

    if (clip.loop) {
      this.secondPlayerPrefabAnimationTime %= clip.duration;
    } else {
      this.secondPlayerPrefabAnimationTime = Math.min(this.secondPlayerPrefabAnimationTime, clip.duration);
    }

    this.applySecondPlayerPrefabAnimationFrame(clip, this.secondPlayerPrefabAnimationTime);

    if (!clip.loop && this.secondPlayerPrefabAnimationTime >= clip.duration && this.secondPlayerAnimationState === 'Attack') {
      this.setSecondPlayerHandToolByLabel('None');
      this.playSecondPlayerPrefabAnimation('Idle');
    }
  }

  private applyPlayerPrefabAnimationFrame(clip: PrefabAnimationClip, time: number) {
    if (!this.playerPrefabAnimationNodes || !this.playerPrefabAnimationSprites) {
      return;
    }

    this.resetPlayerPrefabAnimationPose();

    for (const [nodeKey, curve] of Object.entries(clip.positions ?? {}) as [PrefabAnimationNodeKey, VectorKeyframe[]][]) {
      const position = this.sampleVectorCurve(curve, time);

      this.applyPrefabNodePosition(this.playerPrefabAnimationNodes[nodeKey], position.x, position.y);
    }

    for (const [nodeKey, curve] of Object.entries(clip.rotations ?? {}) as [PrefabAnimationNodeKey, NumberKeyframe[]][]) {
      this.playerPrefabAnimationNodes[nodeKey].setRotation(Phaser.Math.DegToRad(-this.sampleNumberCurve(curve, time)));
    }

    for (const [nodeKey, curve] of Object.entries(clip.scaleY ?? {}) as [PrefabAnimationNodeKey, NumberKeyframe[]][]) {
      const node = this.playerPrefabAnimationNodes[nodeKey];

      node.setScale(node.baseScaleX, this.sampleNumberCurve(curve, time));
    }

    for (const [spriteKey, curve] of Object.entries(clip.alphas ?? {}) as [PrefabAnimationAlphaKey, NumberKeyframe[]][]) {
      this.playerPrefabAnimationSprites[spriteKey].setAlpha(this.sampleNumberCurve(curve, time));
    }
  }

  private resetPlayerPrefabAnimationPose() {
    if (!this.playerPrefabAnimationNodes || !this.playerPrefabAnimationSprites) {
      return;
    }

    Object.values(this.playerPrefabAnimationNodes).forEach((node) => {
      node.setPosition(node.baseX, node.baseY);
      node.setRotation(node.baseRotation);
      node.setScale(node.baseScaleX, node.baseScaleY);
    });

    Object.values(this.playerPrefabAnimationSprites).forEach((sprite) => {
      sprite.setAlpha(sprite.baseAlpha);
    });
  }

  private applySecondPlayerPrefabAnimationFrame(clip: PrefabAnimationClip, time: number) {
    if (!this.secondPlayerPrefabAnimationNodes || !this.secondPlayerPrefabAnimationSprites) {
      return;
    }

    this.resetSecondPlayerPrefabAnimationPose();

    for (const [nodeKey, curve] of Object.entries(clip.positions ?? {}) as [PrefabAnimationNodeKey, VectorKeyframe[]][]) {
      const position = this.sampleVectorCurve(curve, time);

      this.applyPrefabNodePosition(this.secondPlayerPrefabAnimationNodes[nodeKey], position.x, position.y);
    }

    for (const [nodeKey, curve] of Object.entries(clip.rotations ?? {}) as [PrefabAnimationNodeKey, NumberKeyframe[]][]) {
      this.secondPlayerPrefabAnimationNodes[nodeKey].setRotation(Phaser.Math.DegToRad(-this.sampleNumberCurve(curve, time)));
    }

    for (const [nodeKey, curve] of Object.entries(clip.scaleY ?? {}) as [PrefabAnimationNodeKey, NumberKeyframe[]][]) {
      const node = this.secondPlayerPrefabAnimationNodes[nodeKey];

      node.setScale(node.baseScaleX, this.sampleNumberCurve(curve, time));
    }

    for (const [spriteKey, curve] of Object.entries(clip.alphas ?? {}) as [PrefabAnimationAlphaKey, NumberKeyframe[]][]) {
      this.secondPlayerPrefabAnimationSprites[spriteKey].setAlpha(this.sampleNumberCurve(curve, time));
    }
  }

  private resetSecondPlayerPrefabAnimationPose() {
    if (!this.secondPlayerPrefabAnimationNodes || !this.secondPlayerPrefabAnimationSprites) {
      return;
    }

    Object.values(this.secondPlayerPrefabAnimationNodes).forEach((node) => {
      node.setPosition(node.baseX, node.baseY);
      node.setRotation(node.baseRotation);
      node.setScale(node.baseScaleX, node.baseScaleY);
    });

    Object.values(this.secondPlayerPrefabAnimationSprites).forEach((sprite) => {
      sprite.setAlpha(sprite.baseAlpha);
    });
  }

  private applyPrefabNodePosition(node: Phaser.GameObjects.Container, x: number, y: number) {
    node.setPosition(x, -y);
  }

  private sampleNumberCurve(curve: readonly NumberKeyframe[], time: number) {
    const nextFrameIndex = curve.findIndex((keyframe) => keyframe.time >= time);

    if (nextFrameIndex === -1) {
      return curve[curve.length - 1].value;
    }

    if (nextFrameIndex === 0) {
      return curve[0].value;
    }

    const previousFrame = curve[nextFrameIndex - 1];
    const nextFrame = curve[nextFrameIndex];
    const progress = (time - previousFrame.time) / (nextFrame.time - previousFrame.time);

    return Phaser.Math.Linear(previousFrame.value, nextFrame.value, progress);
  }

  private sampleVectorCurve(curve: readonly VectorKeyframe[], time: number) {
    const nextFrameIndex = curve.findIndex((keyframe) => keyframe.time >= time);

    if (nextFrameIndex === -1) {
      const lastFrame = curve[curve.length - 1];

      return { x: lastFrame.x, y: lastFrame.y };
    }

    if (nextFrameIndex === 0) {
      return { x: curve[0].x, y: curve[0].y };
    }

    const previousFrame = curve[nextFrameIndex - 1];
    const nextFrame = curve[nextFrameIndex];
    const progress = (time - previousFrame.time) / (nextFrame.time - previousFrame.time);

    return {
      x: Phaser.Math.Linear(previousFrame.x, nextFrame.x, progress),
      y: Phaser.Math.Linear(previousFrame.y, nextFrame.y, progress)
    };
  }

  private createCollisionMask() {
    const insideLayers = this.createCollisionLayers('collision', true);
    const outsideLayers = this.createCollisionLayers('collisionOut', false);

    this.collisionData = insideLayers.collisionData;
    this.ladderData = insideLayers.ladderData;
    this.collisionWidth = insideLayers.width;
    this.collisionHeight = insideLayers.height;
    this.outsideCollisionData = outsideLayers.collisionData;
    this.outsideCollisionWidth = outsideLayers.width;
    this.outsideCollisionHeight = outsideLayers.height;
  }

  private createCollisionLayers(textureKey: string, includeLadders: boolean) {
    const source = this.textures.get(textureKey).getSourceImage() as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = source.width;
    canvas.height = source.height;

    if (!context) {
      return {
        collisionData: new Uint8Array(0),
        ladderData: new Uint8Array(0),
        width: 0,
        height: 0
      };
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
      ladderData[index] = includeLadders && r === 255 && g === 0 && b === 0 ? 1 : 0;
    }

    return {
      collisionData,
      ladderData,
      width: canvas.width,
      height: canvas.height
    };
  }

  private createRoomMasks() {
    this.roomMasks.clear();

    ROOM_CONFIGS.forEach((room) => {
      this.createAlphaMask(room.id, room.maskTextureKey);
    });

    this.createAlphaMask(OUTER_WRONG_MASK_ID, 'outerWrong');
  }

  private createAlphaMask(maskId: string, textureKey: string) {
    const source = this.textures.get(textureKey).getSourceImage() as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = source.width;
    canvas.height = source.height;

    if (!context) {
      return;
    }

    context.drawImage(source, 0, 0);

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const data = new Uint8Array(canvas.width * canvas.height);

    for (let index = 0; index < data.length; index += 1) {
      const alpha = pixels[index * 4 + 3];

      data[index] = alpha >= COLLISION_ALPHA_THRESHOLD ? 1 : 0;
    }

    this.roomMasks.set(maskId, {
      data,
      width: canvas.width,
      height: canvas.height
    });
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

  private collidesWithMap(x: number, y: number, isInsideShip = true, width = PLAYER_WIDTH, height = PLAYER_HEIGHT) {
    const collisionData = isInsideShip ? this.collisionData : this.outsideCollisionData;
    const collisionWidth = isInsideShip ? this.collisionWidth : this.outsideCollisionWidth;
    const collisionHeight = isInsideShip ? this.collisionHeight : this.outsideCollisionHeight;

    if (!collisionData) {
      return false;
    }

    const left = Math.floor(x - width / 2);
    const right = Math.ceil(x + width / 2);
    const top = Math.floor(y - height / 2);
    const bottom = Math.ceil(y + height / 2);
    const sampleStep = 4;

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
        if (this.isSolidPixel(sampleX, sampleY, collisionData, collisionWidth, collisionHeight)) {
          return true;
        }
      }
    }

    for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
      if (
        this.isSolidPixel(sampleX, bottom, collisionData, collisionWidth, collisionHeight) ||
        this.isSolidPixel(sampleX, top, collisionData, collisionWidth, collisionHeight)
      ) {
        return true;
      }
    }

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      if (
        this.isSolidPixel(left, sampleY, collisionData, collisionWidth, collisionHeight) ||
        this.isSolidPixel(right, sampleY, collisionData, collisionWidth, collisionHeight)
      ) {
        return true;
      }
    }

    return false;
  }

  private tryStepUp(nextX: number, currentY: number) {
    if (!this.isWhiteCollisionEnabled || this.playerState === 'Climbing') {
      return undefined;
    }

    for (let step = 1; step <= PLAYER_STEP_HEIGHT; step += 1) {
      const testY = currentY - step;

      if (
        !this.collidesWithMap(this.player?.x ?? nextX, testY, this.isPlayerInsideShip) &&
        !this.collidesWithMap(nextX, testY, this.isPlayerInsideShip)
      ) {
        return testY;
      }
    }

    return undefined;
  }

  private isSolidPixel(x: number, y: number, collisionData: Uint8Array, collisionWidth: number, collisionHeight: number) {
    const pixelX = Math.floor(x);
    const pixelY = Math.floor(y);

    if (pixelX < 0 || pixelX >= collisionWidth || pixelY < 0 || pixelY >= collisionHeight) {
      return true;
    }

    return collisionData[pixelY * collisionWidth + pixelX] === 1;
  }

  private updatePlayerState(isVerticalInputPressed: boolean) {
    if (!this.player || !this.stateText) {
      return;
    }

    const context = this.createPlayerStateTransitionContext(isVerticalInputPressed);
    const nextState = this.playerStateTransitions[this.playerState](context);

    this.transitionPlayerState(nextState);
  }

  private createPlayerStateTransitionContext(isVerticalInputPressed: boolean): PlayerStateTransitionContext {
    return this.createPlayerStateTransitionContextFor(
      this.player,
      isVerticalInputPressed,
      this.keys?.E.isDown === true
    );
  }

  private createPlayerStateTransitionContextFor(
    player: Phaser.GameObjects.Graphics | undefined,
    isVerticalInputPressed: boolean,
    isRepairInputPressed: boolean
  ): PlayerStateTransitionContext {
    const x = player?.x ?? 0;
    const y = player?.y ?? 0;

    return {
      isTouchingLadder: this.overlapsLadder(x, y),
      isInsideHealRoom: this.overlapsRoom(HEAL_ROOM_CONFIG, x, y),
      isInsideDriveRoom: this.overlapsRoom(DRIVE_ROOM_CONFIG, x, y),
      isInsideWorkshopRoom: this.overlapsRoom(WORKSHOP_ROOM_CONFIG, x, y),
      isInsideRepoFullRoom: this.isRepoRoomFull() && this.overlapsRoom(REPO_ROOM_CONFIG, x, y),
      isInsideOuterWrongRoom: this.overlapsMask(OUTER_WRONG_MASK_ID, x, y),
      isInsideBurningRoom: this.getOverlappingBurningRoom(x, y) !== undefined,
      isVerticalInputPressed,
      isDriveRoomWrong: this.isDriveRoomWrong(),
      isOuterWrong: this.isOuterWrong,
      isRepairInputPressed,
      hasWorkshopResources: this.hasWorkshopResources()
    };
  }

  private transitionPlayerState(nextState: PlayerState) {
    if (nextState === this.playerState) {
      return;
    }

    if (this.playerState === 'Climbing') {
      this.liftPlayerOutOfLadder();
    }

    if (this.playerState === 'Firefighting') {
      this.playerFirefightingRoom = undefined;
      this.setPlayerProgress(0);
    }

    this.playerState = nextState;
    this.applyPlayerState();
  }

  private transitionSecondPlayerState(nextState: PlayerState) {
    if (nextState === this.secondPlayerState) {
      return;
    }

    if (this.secondPlayerState === 'Climbing') {
      this.liftSecondPlayerOutOfLadder();
    }

    if (this.secondPlayerState === 'Firefighting') {
      this.secondPlayerFirefightingRoom = undefined;
      this.setSecondPlayerProgress(0);
    }

    this.secondPlayerState = nextState;
    this.applySecondPlayerState();
  }

  private applyPlayerState() {
    if (!this.stateText) {
      return;
    }

    this.syncGravityWithShipArea();

    if (this.playerState === 'Climbing') {
      this.isWhiteCollisionEnabled = false;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setColor('#f97316');
      this.updatePlayerSpeedUi();
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Healing') {
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setColor('#38bdf8');
      this.updatePlayerSpeedUi();
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Driving') {
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setColor('#22c55e');
      this.updatePlayerSpeedUi();
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Driving-Repairing') {
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setColor('#86efac');
      this.updatePlayerSpeedUi();
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Repoing') {
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setColor('#facc15');
      this.updatePlayerSpeedUi();
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Outer-Repairing') {
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setColor('#fb923c');
      this.updatePlayerSpeedUi();
      this.updatePlayerProgressBar();
      return;
    }

    this.isWhiteCollisionEnabled = true;
    this.playerVelocityY = 0;
    this.updateGravityUi();
    this.stateText.setColor('#ffffff');
    this.updatePlayerSpeedUi();
    this.updatePlayerProgressBar();
  }

  private applySecondPlayerState() {
    this.syncGravityWithShipArea();

    if (this.secondPlayerState === 'Climbing') {
      this.isSecondPlayerWhiteCollisionEnabled = false;
      this.secondPlayerVelocityY = 0;
      this.updateSecondPlayerProgressBar();
      this.updateSecondPlayerInfoUi();
      return;
    }

    this.isSecondPlayerWhiteCollisionEnabled = true;
    this.secondPlayerVelocityY = 0;
    this.updateSecondPlayerProgressBar();
    this.updateSecondPlayerInfoUi();
  }

  private updateGravityUi() {
    if (!this.gravityButton || !this.gravityText) {
      return;
    }

    this.gravityButton.setFillStyle(this.isGravityEnabled ? 0x22c55e : 0x475569, 1);
    this.gravityText.setText(this.isGravityEnabled ? 'On' : 'Off');
    this.gravityText.setX(this.isGravityEnabled ? 133 : 132);
    this.updatePlayerInfoUi();
  }

  private syncGravityWithShipArea() {
    this.isGravityEnabled = this.isPlayerInsideShip;
    this.isSecondPlayerGravityEnabled = this.isSecondPlayerInsideShip;
  }

  private liftPlayerOutOfLadder() {
    if (!this.player) {
      return;
    }
    // console.log(`Attempting to lift player out of ladder from y=${this.player.y}`)

    for (let lift = 1; lift <= SCENE_HEIGHT; lift += 1) {
      const testY = this.player.y - lift;

      if (!this.collidesWithMap(this.player.x, testY, this.isPlayerInsideShip)) {
    console.log('Lifting player out of ladder');
        this.player.y = testY;
        this.playerVelocityY = 0;
    // console.log(`Attempting to lift player out of ladder to y=${this.player.y}`)
        return;
      }
    }
  }

  private liftSecondPlayerOutOfLadder() {
    if (!this.secondPlayer) {
      return;
    }

    for (let lift = 1; lift <= SCENE_HEIGHT; lift += 1) {
      const testY = this.secondPlayer.y - lift;

      if (!this.collidesWithMap(this.secondPlayer.x, testY, this.isSecondPlayerInsideShip)) {
        this.secondPlayer.y = testY;
        this.secondPlayerVelocityY = 0;
        return;
      }
    }
  }

  private overlapsRoom(room: RoomConfig, x: number, y: number) {
    return this.overlapsMask(room.id, x, y);
  }

  private overlapsMask(maskId: string, x: number, y: number) {
    const mask = this.roomMasks.get(maskId);

    if (!mask) {
      return false;
    }

    const left = Math.floor(x - PLAYER_WIDTH / 2);
    const right = Math.ceil(x + PLAYER_WIDTH / 2);
    const top = Math.floor(y - PLAYER_HEIGHT / 2);
    const bottom = Math.ceil(y + PLAYER_HEIGHT / 2);
    const sampleStep = 4;

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
        if (this.isRoomMaskPixel(mask, sampleX, sampleY)) {
          return true;
        }
      }
    }

    for (let sampleX = left; sampleX <= right; sampleX += sampleStep) {
      if (this.isRoomMaskPixel(mask, sampleX, bottom) || this.isRoomMaskPixel(mask, sampleX, top)) {
        return true;
      }
    }

    for (let sampleY = top; sampleY <= bottom; sampleY += sampleStep) {
      if (this.isRoomMaskPixel(mask, left, sampleY) || this.isRoomMaskPixel(mask, right, sampleY)) {
        return true;
      }
    }

    return false;
  }

  private isRoomMaskPixel(mask: RoomMaskData, x: number, y: number) {
    const pixelX = Math.floor(x);
    const pixelY = Math.floor(y);

    if (pixelX < 0 || pixelX >= mask.width || pixelY < 0 || pixelY >= mask.height) {
      return false;
    }

    return mask.data[pixelY * mask.width + pixelX] === 1;
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
  render: {
    preserveDrawingBuffer: true
  },
  input: {
    gamepad: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: MainScene
};

new Phaser.Game(config);

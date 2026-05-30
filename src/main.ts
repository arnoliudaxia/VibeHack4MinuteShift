import Phaser from 'phaser';
import './style.css';

// 场景设置
const SCENE_WIDTH = 1672;
const SCENE_HEIGHT = 941;

// player设置
const PLAYER_WIDTH = 38;
const PLAYER_HEIGHT = 72;
const PLAYER_MAX_HEALTH = 100;
const PLAYER_HEAL_PER_SECOND = 15;
const PLAYER_HEALTH_BAR_WIDTH = 44;
const PLAYER_HEALTH_BAR_HEIGHT = 7;
const PLAYER_HEALTH_BAR_OFFSET_Y = -PLAYER_HEIGHT / 2 - 14;
const PLAYER_SPEED = 260;
const PLAYER_GRAVITY = 1100;
const PLAYER_MAX_FALL_SPEED = 900;
const PLAYER_STEP_HEIGHT = 24;
const PLAYER_PROGRESS_OFFSET_X = PLAYER_WIDTH / 2 + 22;
const PLAYER_PROGRESS_OFFSET_Y = -PLAYER_HEIGHT / 2 - 16;
const PLAYER_PROGRESS_RADIUS = 14;
const PLAYER_PROGRESS_LINE_WIDTH = 4;
const PLAYER_REPAIR_PROGRESS_PER_SECOND = 0.2;
const PLAYER_PREFAB_CHARACTER_SCALE = 2.0872;
const PLAYER_PREFAB_PIXELS_PER_UNIT = 30;
const PLAYER_PREFAB_ROOT_OFFSET_Y = PLAYER_HEIGHT / 2 - 8;
const PLAYER_PREFAB_SKIN_TINT = 0xfac9ac;
const PLAYER_PREFAB_HAIR_TINT = 0x7de8a7;
const COLLISION_ALPHA_THRESHOLD = 16;

// 音乐设置
const BGM_VOLUME = 0.45;
// UI 设置
const PANEL_CONTROL_X = 92;
const PANEL_CONTROL_WIDTH = 112;
const PANEL_SLIDER_WIDTH = 78;
const SECOND_CLOCK_OFFSET_X = 174;
const SECOND_CLOCK_OFFSET_Y = 40;
const SECOND_CLOCK_RADIUS = 24;

// VFX
const DRIVE_WARNING_SIGN_X = 1200;
const DRIVE_WARNING_SIGN_Y = 300;
const DRIVE_WARNING_SIGN_SIZE = 72;
const ROCK_WARNING_SIGN_SIZE = 72;
const ROCK_WARNING_SIGN_X = 1672-ROCK_WARNING_SIGN_SIZE;
const ROCK_WARNING_SIGN_Y = 140;
const WARNING_SIGN_BLINK_SPEED = 5;

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
const PIXEL_ASTEROID_LANE_MIN_SPAWN_DELAY = 7000;
const PIXEL_ASTEROID_LANE_MAX_SPAWN_DELAY = 18000;
const PIXEL_ASTEROID_WARNING_LEAD_TIME = 3000;
const PIXEL_ASTEROID_TRIGGER_X = 650;
const EXPLOSION_ANIMATION_KEY = 'explosion-test';
const POWER_CRYSTAL_ANIMATION_KEY = 'PowerCrystal';
const POWER_CRYSTAL_WIDTH = 72;
const POWER_CRYSTAL_HEIGHT = 80;
const POWER_CRYSTAL_X = 814 + POWER_CRYSTAL_WIDTH / 2;
const POWER_CRYSTAL_Y = 645 + POWER_CRYSTAL_HEIGHT / 2;

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

// 操控

type PlayerKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  E: Phaser.Input.Keyboard.Key;
  H: Phaser.Input.Keyboard.Key;
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

type AsteroidAsset = {
  key: string;
  path: string;
  lockAlpha?: boolean;
  collisionKind?: AsteroidCollisionKind;
};

type PlayerState = 'Normal' | 'Climbing' | 'Healing' | 'Driving' | 'Driving-Repairing';

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
      { label: 'Normal', textureKey: 'living', assetPath: '/assets/scene/ShipRoom/living.png' }
    ]
  },
  {
    id: 'plant',
    label: 'Plant',
    defaultTextureKey: 'plant',
    maskTextureKey: 'plant',
    layerOptions: [
      { label: 'Normal', textureKey: 'plant', assetPath: '/assets/scene/ShipRoom/plant.png' }
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
    loop: true,
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
  private progressSliderFill?: Phaser.GameObjects.Rectangle;
  private progressSliderHandle?: Phaser.GameObjects.Arc;
  private progressSliderText?: Phaser.GameObjects.Text;
  private playerProgress = 0;
  private playerPrefabVisual?: Phaser.GameObjects.Container;
  private playerPrefabAnimationNodes?: PrefabAnimationNodes;
  private playerPrefabAnimationSprites?: PrefabAnimationSprites;
  private playerPrefabAnimationState: PlayerPrefabAnimationName = 'Idle';
  private playerPrefabAnimationTime = 0;
  private keys?: PlayerKeys;
  private uiPanel?: Phaser.GameObjects.Container;
  private isUiPanelVisible = true;
  private driveOverlay?: Phaser.GameObjects.Image;
  private repoOverlay?: Phaser.GameObjects.Image;
  private outerWrongOverlay?: Phaser.GameObjects.Image;
  private isOuterWrong = false;
  private outerRepairButton?: Phaser.GameObjects.Rectangle;
  private outerRepairText?: Phaser.GameObjects.Text;
  private driveWarningSign?: Phaser.GameObjects.Image;
  private rockWarningSign?: Phaser.GameObjects.Image;
  private driveWarningBlinkTime = 0;
  private driveStateButton?: Phaser.GameObjects.Rectangle;
  private driveSelectedText?: Phaser.GameObjects.Text;
  private currentDriveRoomOption = 'Normal';
  private repoStateButton?: Phaser.GameObjects.Rectangle;
  private repoSelectedText?: Phaser.GameObjects.Text;
  private currentRepoRoomOption = 'Full';
  private powerCrystalSprite?: Phaser.GameObjects.Sprite;
  private bgm?: VolumeSound;
  private isBgmMuted = true;
  private isGravityEnabled = true;
  private playerVelocityY = 0;
  private playerState: PlayerState = 'Normal';
  private isWhiteCollisionEnabled = true;
  private isCollisionDebugVisible = false;
  private collisionBodyDebug?: Phaser.GameObjects.Graphics;
  private collisionData?: Uint8Array;
  private ladderData?: Uint8Array;
  private roomMasks = new Map<string, RoomMaskData>();
  private collisionWidth = 0;
  private collisionHeight = 0;
  private gravityButton?: Phaser.GameObjects.Rectangle;
  private gravityText?: Phaser.GameObjects.Text;
  private stateText?: Phaser.GameObjects.Text;
  private coordinateText?: Phaser.GameObjects.Text;
  private timerText?: Phaser.GameObjects.Text;
  private secondClock?: Phaser.GameObjects.Graphics;
  private asteroids: AsteroidSprite[] = [];
  private asteroidSpawnTimer = 0;
  private nextAsteroidSpawnDelay = 0;
  private pixelAsteroidLaneSpawnTimer = 0;
  private nextPixelAsteroidLaneSpawnDelay = 0;
  private pixelAsteroidLaneWarningAsteroid?: AsteroidSprite;
  private gameStartTime = 0;
  private displayedGameSeconds = -1;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('spaceBg1', '/assets/scene/spaceBg/星空1.png');
    this.load.image('spaceBg2', '/assets/scene/spaceBg/星空2.png');
    this.load.image('spaceE', '/assets/scene/spaceBg/spaceE.png');
    this.load.image('spaceShipFire', '/assets/VFX/fireV.png');
    this.load.image('background', '/assets/scene/spaceShip.png');
    this.load.image('collision', '/assets/scene/physic.png');
    this.load.image('outerWrong', '/assets/scene/ShipRoom/OuterWrong.png');
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
    ROOM_CONFIGS.forEach((room) => {
      room.layerOptions.forEach((option) => {
        if (option.textureKey && option.assetPath) {
          this.load.image(option.textureKey, option.assetPath);
        }
      });
    });
    this.load.image('playerPrefabBody', '/assets/player-prefab/body.png');
    this.load.image('playerPrefabChest', '/assets/player-prefab/chest.png');
    this.load.image('playerPrefabHead', '/assets/player-prefab/head.png');
    this.load.image('playerPrefabHair', '/assets/player-prefab/hair.png');
    this.load.image('playerPrefabEye', '/assets/player-prefab/eye.png');
    this.load.image('playerPrefabShield', '/assets/player-prefab/shield.png');
    this.load.image('playerPrefabBowLineDown', '/assets/player-prefab/bow-line-down.png');
    this.load.image('playerPrefabBow', '/assets/player-prefab/bow.png');
    this.load.image('playerPrefabBowLineUp', '/assets/player-prefab/bow-line-up.png');
    this.load.image('playerPrefabArrow', '/assets/player-prefab/arrow.png');
    this.load.image('playerPrefabEyeStun', '/assets/player-prefab/eye-stun.png');
    this.load.image('playerPrefabEyeDefeat', '/assets/player-prefab/eye-defeat.png');
    this.load.audio('bgm', '/assets/Sound/BGM/HOYO-MiX - 危机预知 Crises.mp3');
  }

  create() {
    const { width, height } = this.scale;
    this.gameStartTime = this.time.now;
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

    this.add
      .image(width / 2, height / 2, HEAL_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
      .image(width / 2, height / 2, WORKSHOP_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
      .image(width / 2, height / 2, LIVING_ROOM_CONFIG.defaultTextureKey)
      .setDisplaySize(SCENE_WIDTH * scale, SCENE_HEIGHT * scale)
      .setVisible(true);

    this.add
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
    this.rockWarningSign = this.add
      .image(ROCK_WARNING_SIGN_X, ROCK_WARNING_SIGN_Y, 'warningSignRock')
      .setDisplaySize(ROCK_WARNING_SIGN_SIZE*2, ROCK_WARNING_SIGN_SIZE)
      .setVisible(false);

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
    this.powerCrystalSprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.powerCrystalSprite?.setTexture(POWER_CRYSTAL_FRAME_KEYS[0]);
    });

    const collisionOverlay = this.createCollisionDebugOverlay(scale);

    this.bgm = this.sound.add('bgm', { loop: true, volume: 0 }) as VolumeSound;
    this.bgm.play();

    this.player = this.add.graphics({ x: width / 2, y: height / 2 });
    this.player
      .fillStyle(0x38bdf8, 1)
      .fillRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .lineStyle(3, 0xe0f2fe, 1)
      .strokeRoundedRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH / 2)
      .setVisible(false);
    this.playerPrefabVisual = this.createPlayerPrefabVisual(this.player.x, this.player.y);
    this.playerHealthBar = this.add.graphics();
    this.updatePlayerHealthBar();
    this.playerProgressBar = this.add.graphics();
    this.playerProgressBar.setVisible(false);
    this.updatePlayerProgressBar();
    this.collisionBodyDebug = this.add.graphics().setVisible(false).setDepth(1000);
    this.exposePlayerAnimationInterface();

    this.keys = this.input.keyboard?.addKeys('W,A,S,D,E,H') as PlayerKeys | undefined;

    this.add
      .rectangle(width - 16, 16, 126, 48, 0x000000, 1)
      .setOrigin(1, 0)
      .setScrollFactor(0);
    this.secondClock = this.add.graphics().setScrollFactor(0);
    this.drawSecondClock(0);
    this.timerText = this.add
      .text(width - 16, 16, '00:00', {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#020617',
        strokeThickness: 5
      })
      .setOrigin(1, 0)
      .setScrollFactor(0);

    const panel = this.add.container(16, 16).setScrollFactor(0);
    this.uiPanel = panel;
    const panelBackground = this.add
      .rectangle(0, 0, 220, 624, 0x0f172a, 0.82)
      .setOrigin(0);
    const playerGroupLabel = this.add.text(14, 16, 'Player', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });
    const soundLabel = this.add.text(14, 312, 'BGM', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const muteButton = this.add
      .rectangle(PANEL_CONTROL_X, 307, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const muteText = this.add.text(119, 313, 'Muted', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    });

    const collisionLabel = this.add.text(14, 356, 'Collision', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const collisionButton = this.add
      .rectangle(PANEL_CONTROL_X, 351, PANEL_CONTROL_WIDTH, 28, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const collisionText = this.add.text(127, 357, 'Hidden', {
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

    const shipFireLabel = this.add.text(14, 400, 'Ship Fire', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const shipFireButton = this.add
      .rectangle(PANEL_CONTROL_X, 395, PANEL_CONTROL_WIDTH, 32, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const shipFireText = this.add.text(127, 402, 'Hidden', {
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

    const sceneGroupLabel = this.add.text(14, 274, 'Scene', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    });

    const label = this.add.text(14, 444, DRIVE_ROOM_CONFIG.label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });

    const selectedBackground = this.add
      .rectangle(PANEL_CONTROL_X, 439, PANEL_CONTROL_WIDTH, 32, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.driveStateButton = selectedBackground;
    const selectedText = this.add.text(104, 446, 'Normal', {
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

    const outerLabel = this.add.text(14, 488, 'Outer', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.outerRepairButton = this.add
      .rectangle(PANEL_CONTROL_X, 483, PANEL_CONTROL_WIDTH, 32, 0x475569, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.outerRepairText = this.add.text(126, 490, 'Normal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });
    this.updateOuterWrongUi();

    const repoLabel = this.add.text(14, 532, REPO_ROOM_CONFIG.label, {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    this.repoStateButton = this.add
      .rectangle(PANEL_CONTROL_X, 527, PANEL_CONTROL_WIDTH, 32, 0x22c55e, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    this.repoSelectedText = this.add.text(126, 534, 'Full', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

    const powerCrystalLabel = this.add.text(14, 576, 'Crystal', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    });
    const powerCrystalButton = this.add
      .rectangle(PANEL_CONTROL_X, 571, PANEL_CONTROL_WIDTH, 32, 0x2563eb, 1)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });
    const powerCrystalText = this.add.text(133, 578, 'Play', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      color: '#ffffff'
    });

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
      sceneGroupLabel,
      label,
      selectedBackground,
      selectedText,
      coordinateLabel,
      this.coordinateText,
      outerLabel,
      this.outerRepairButton,
      this.outerRepairText,
      repoLabel,
      this.repoStateButton,
      this.repoSelectedText,
      powerCrystalLabel,
      powerCrystalButton,
      powerCrystalText
    ]);

    selectedBackground.on('pointerdown', () => {
      this.setDriveRoomOption(this.currentDriveRoomOption === 'Wrong' ? 'Normal' : 'Wrong');
    });

    this.repoStateButton.on('pointerdown', () => {
      this.setRepoRoomOption(this.currentRepoRoomOption === 'Full' ? 'Empty' : 'Full');
    });

    powerCrystalButton.on('pointerdown', () => {
      this.playPowerCrystalAnimation();
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
      if (this.playerState === 'Climbing') {
        return;
      }

      this.isGravityEnabled = !this.isGravityEnabled;
      this.playerVelocityY = 0;

      this.updateGravityUi();
    });
  }

  private toggleUiPanelVisibility() {
    if (!this.uiPanel) {
      return;
    }

    this.isUiPanelVisible = !this.isUiPanelVisible;
    this.uiPanel.setVisible(this.isUiPanelVisible);
  }

  private playPowerCrystalAnimation() {
    if (!this.powerCrystalSprite) {
      return;
    }

    this.powerCrystalSprite.setTexture(POWER_CRYSTAL_FRAME_KEYS[0]);
    this.powerCrystalSprite.play(POWER_CRYSTAL_ANIMATION_KEY, true);
  }

  update(time: number, delta: number) {
    this.updateAsteroids(delta);
    this.updateDriveWarningSign(delta);

    if (this.keys && Phaser.Input.Keyboard.JustDown(this.keys.H)) {
      this.toggleUiPanelVisibility();
    }

    if (!this.player || !this.keys) {
      this.updateCollisionBodyDebug();
      return;
    }

    this.updateGameTimer(time);
    this.updatePlayerPrefabAnimation(delta);
    this.updatePlayerState(this.keys.W.isDown || this.keys.S.isDown);
    this.updateRepairProgress(delta);
    this.updateHealing(delta);

    const direction = new Phaser.Math.Vector2(0, 0);

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
      this.syncPlayerPrefabVisual();
      this.updatePlayerHealthBar();
      this.updatePlayerProgressBar();
      this.updatePlayerCoordinateUi();
      this.updateCollisionBodyDebug();
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
    this.syncPlayerPrefabVisual();
    this.updatePlayerHealthBar();
    this.updatePlayerProgressBar();
    this.updatePlayerCoordinateUi();
    this.updateCollisionBodyDebug();
  }

  private createPlayerPrefabVisual(x: number, y: number) {
    const visual = this.add.container(x, y);
    const root = this.createPrefabNode(visual, 0, 0);

    root.setPosition(0, PLAYER_PREFAB_ROOT_OFFSET_Y);
    root.setScale(PLAYER_PREFAB_PIXELS_PER_UNIT * PLAYER_PREFAB_CHARACTER_SCALE);

    const body = this.createPrefabNode(root, 0.006000102, 0.19145268, -1.9272974, 1, 1.0584189);
    this.addPrefabSprite(body, 'playerPrefabBody', 0, 0, 0.41, 0.45, { tint: PLAYER_PREFAB_SKIN_TINT }); 
    this.addPrefabSprite(body, 'playerPrefabChest', 0, 0, 0.78, 0.7);

    const head = this.createPrefabNode(body, -0.039657928, 0.3265895, -0.0395905);
    this.addPrefabSprite(head, 'playerPrefabHead', 0, 0, 0.65, 0.5, { tint: PLAYER_PREFAB_SKIN_TINT });
    const normalEye = this.addPrefabSprite(head, 'playerPrefabEye', 0.13499999, -0.054999948, 0.55, 0.32);
    this.addPrefabSprite(head, 'playerPrefabHair', 0.025000036, 0.024999976, 0.98, 1);
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
    // this.addPrefabSprite(handLeft, 'playerPrefabShield', 0.29100013, 0.13100004, 0.52, 0.58); // TODO 右手暂时隐藏

    const handRight = this.createPrefabNode(root, -0.0077263433, 0.023179028);
    const bow = this.createPrefabNode(handRight, -0.04399988, 0.08099997);

    // this.addPrefabSprite(bow, 'playerPrefabBowLineDown', -0.16500005, 0.100000024, 0.36, 0.06);
    // this.addPrefabSprite(bow, 'playerPrefabBowLineUp', 0.13999996, 0.100000024, 0.37, 0.06);
    // this.addPrefabSprite(bow, 'playerPrefabBow', 0, 0, 1.32, 0.73); // TODO 弓箭暂时隐藏
    const arrow = this.createPrefabNode(bow, 0.005, -0.211, -90);
    const arrowSprite = this.addPrefabSprite(arrow, 'playerPrefabArrow', 0, 0, 0.88, 0.36, { alpha: 0 });

    this.playerPrefabAnimationNodes = { body, head, handLeft, handRight, bow, stunEyeLeft, stunEyeRight };
    this.playerPrefabAnimationSprites = {
      normalEye,
      arrow: arrowSprite,
      stunEyeLeft: stunEyeLeftSprite,
      stunEyeRight: stunEyeRightSprite,
      defeatEyeLeft,
      defeatEyeRight
    };
    this.playPlayerPrefabAnimation('Idle');

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
    const sprite = this.add.image(x, -y, texture).setDisplaySize(width, height) as PrefabAnimationSprite;

    sprite.baseAlpha = options.alpha ?? 1;

    if (options.alpha !== undefined) {
      sprite.setAlpha(options.alpha);
    }

    if (options.tint !== undefined) {
      sprite.setTint(options.tint);
    }

    parent.add(sprite);

    return sprite;
  }

  private syncPlayerPrefabVisual() {
    if (!this.player || !this.playerPrefabVisual) {
      return;
    }

    this.playerPrefabVisual.setPosition(this.player.x, this.player.y);
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

      if (asteroid.collisionKind && !asteroid.hasTriggeredPlayerCollision && this.overlapsPlayer(asteroid)) {
        asteroid.hasTriggeredPlayerCollision = true;

        if (asteroid.collisionKind === 'metalDebris') {
          this.onMetalDebrisHitPlayer();
        } else {
          this.onIceCrystalHitPlayer();
        }
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

  private overlapsPlayer(asteroid: AsteroidSprite) {
    if (!this.player) {
      return false;
    }

    const playerLeft = this.player.x - PLAYER_WIDTH / 2;
    const playerRight = this.player.x + PLAYER_WIDTH / 2;
    const playerTop = this.player.y - PLAYER_HEIGHT / 2;
    const playerBottom = this.player.y + PLAYER_HEIGHT / 2;
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

  private onMetalDebrisHitPlayer() {
  }

  private onIceCrystalHitPlayer() {
  }

  private onPixelAsteroidLaneReachedTriggerX(x: number, y: number) {
    console.log('上面陨石撞到了飞船');
    this.setOuterWrong(true);
    this.playExplosionTest(x, y);
  }

  private setOuterWrong(isWrong: boolean) {
    this.isOuterWrong = isWrong;
    this.outerWrongOverlay?.setVisible(isWrong);
    this.updateOuterWrongUi();
  }

  private updateOuterWrongUi() {
    if (!this.outerRepairButton || !this.outerRepairText) {
      return;
    }

    this.outerRepairButton.setFillStyle(this.isOuterWrong ? 0xdc2626 : 0x475569, 1);
    this.outerRepairText.setText(this.isOuterWrong ? 'Repair' : 'Normal');
    this.outerRepairText.setX(this.isOuterWrong ? 125 : 126);
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

  private updatePlayerCoordinateUi() {
    if (!this.player || !this.coordinateText) {
      return;
    }

    this.coordinateText.setText(`X: ${Math.round(this.player.x)} Y: ${Math.round(this.player.y)}`);
  }

  private setPlayerHealth(health: number) {
    this.playerHealth = Phaser.Math.Clamp(health, 0, PLAYER_MAX_HEALTH);
    this.updatePlayerHealthBar();
  }

  private updateHealing(delta: number) {
    if (this.playerState !== 'Healing' || this.playerHealth >= PLAYER_MAX_HEALTH) {
      return;
    }

    this.setPlayerHealth(this.playerHealth + PLAYER_HEAL_PER_SECOND * (delta / 1000));
  }

  private updatePlayerProgressBar() {
    if (!this.player || !this.playerProgressBar) {
      return;
    }

    if (!this.isRepairingState(this.playerState)) {
      this.playerProgressBar.clear().setVisible(false);
      this.updateProgressSlider(this.playerProgress);
      return;
    }

    this.playerProgressBar
      .setVisible(true)
      .setPosition(this.player.x + PLAYER_PROGRESS_OFFSET_X, this.player.y + PLAYER_PROGRESS_OFFSET_Y)
      .clear()
      .fillStyle(0x000000, 0.75)
      .fillCircle(0, 0, PLAYER_PROGRESS_RADIUS + PLAYER_PROGRESS_LINE_WIDTH)
      .lineStyle(PLAYER_PROGRESS_LINE_WIDTH, 0x475569, 1)
      .strokeCircle(0, 0, PLAYER_PROGRESS_RADIUS)
      .lineStyle(PLAYER_PROGRESS_LINE_WIDTH, 0x22c55e, 1)
      .beginPath()
      .arc(
        0,
        0,
        PLAYER_PROGRESS_RADIUS,
        -Math.PI / 2,
        -Math.PI / 2 + Math.PI * 2 * this.playerProgress,
        false
      )
      .strokePath();

    this.updateProgressSlider(this.playerProgress);
  }

  private setPlayerProgress(progress: number) {
    this.playerProgress = Phaser.Math.Clamp(progress, 0, 1);
    this.updatePlayerProgressBar();
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

    if (!option.textureKey) {
      this.driveOverlay.setVisible(false);
      return;
    }

    this.driveOverlay.setTexture(option.textureKey).setVisible(true);
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

  private updateDriveWarningSign(delta: number) {
    if (!this.driveWarningSign?.visible && !this.rockWarningSign?.visible) {
      return;
    }

    this.driveWarningBlinkTime += delta / 1000;

    const blink = (Math.sin(this.driveWarningBlinkTime * WARNING_SIGN_BLINK_SPEED) + 1) / 2;
    const alpha = 0.25 + blink * 0.5;

    if (this.driveWarningSign?.visible) {
      this.driveWarningSign.setAlpha(alpha);
    }

    if (this.rockWarningSign?.visible) {
      this.rockWarningSign.setAlpha(alpha);
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

  private isRepairingState(state: PlayerState) {
    return state.endsWith('-Repairing');
  }

  private isDriveRoomWrong() {
    return this.currentDriveRoomOption === 'Wrong';
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

  public playPlayerPrefabAnimation(animationName: PlayerPrefabAnimationName, restart = true) {
    if (!PLAYER_PREFAB_ANIMATIONS[animationName]) {
      return false;
    }

    if (this.playerPrefabAnimationState !== animationName || restart) {
      this.playerPrefabAnimationState = animationName;
      this.playerPrefabAnimationTime = 0;
    }

    this.updatePlayerPrefabAnimation(0);

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

  private updateGameTimer(time: number) {
    if (!this.timerText) {
      return;
    }

    const elapsedSeconds = Math.floor((time - this.gameStartTime) / 1000);

    if (elapsedSeconds === this.displayedGameSeconds) {
      return;
    }

    this.displayedGameSeconds = elapsedSeconds;

    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');

    this.timerText.setText(`${minutes}:${seconds}`);
    this.drawSecondClock(elapsedSeconds);
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

  private createRoomMasks() {
    this.roomMasks.clear();

    ROOM_CONFIGS.forEach((room) => {
      const source = this.textures.get(room.maskTextureKey).getSourceImage() as HTMLImageElement;
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

      this.roomMasks.set(room.id, {
        data,
        width: canvas.width,
        height: canvas.height
      });
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
    if (!this.isWhiteCollisionEnabled || this.playerState === 'Climbing') {
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
    const isInsideHealRoom = this.overlapsRoom(HEAL_ROOM_CONFIG, this.player.x, this.player.y);
    const isInsideDriveRoom = this.overlapsRoom(DRIVE_ROOM_CONFIG, this.player.x, this.player.y);
    const nextState: PlayerState =
      this.playerState === 'Healing' && !isInsideHealRoom ? 'Normal' :
      (this.playerState === 'Healing' || this.playerState === 'Normal' || this.playerState === 'Climbing') && isInsideHealRoom ? 'Healing' :
      this.playerState === 'Climbing' && isTouchingLadder ? 'Climbing' :
      isTouchingLadder && isVerticalInputPressed ? 'Climbing' :
      this.playerState === 'Driving-Repairing' && isInsideDriveRoom ? 'Driving-Repairing' :
      this.playerState === 'Driving' && isInsideDriveRoom && this.isDriveRoomWrong() && this.keys?.E.isDown ? 'Driving-Repairing' :
      isInsideDriveRoom ? 'Driving' : 'Normal';

    if (nextState === this.playerState) {
      return;
    }

    if(this.playerState==='Climbing' ){
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
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Healing') {
      this.isGravityEnabled = true;
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setText('Healing');
      this.stateText.setColor('#38bdf8');
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Driving') {
      this.isGravityEnabled = true;
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setText('Driving');
      this.stateText.setColor('#22c55e');
      this.updatePlayerProgressBar();
      return;
    }

    if (this.playerState === 'Driving-Repairing') {
      this.isGravityEnabled = true;
      this.isWhiteCollisionEnabled = true;
      this.playerVelocityY = 0;
      this.updateGravityUi();
      this.stateText.setText('Driving-Repairing');
      this.stateText.setColor('#86efac');
      this.updatePlayerProgressBar();
      return;
    }

    this.isGravityEnabled = true;
    this.isWhiteCollisionEnabled = true;
    this.playerVelocityY = 0;
    this.updateGravityUi();
    this.stateText.setText('Normal');
    this.stateText.setColor('#ffffff');
    this.updatePlayerProgressBar();
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
    // console.log(`Attempting to lift player out of ladder from y=${this.player.y}`)

    for (let lift = 1; lift <= SCENE_HEIGHT; lift += 1) {
      const testY = this.player.y - lift;

      if (!this.collidesWithMap(this.player.x, testY)) {
    console.log('Lifting player out of ladder');
        this.player.y = testY;
        this.playerVelocityY = 0;
    // console.log(`Attempting to lift player out of ladder to y=${this.player.y}`)
        return;
      }
    }
  }

  private overlapsRoom(room: RoomConfig, x: number, y: number) {
    const mask = this.roomMasks.get(room.id);

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
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: MainScene
};

new Phaser.Game(config);

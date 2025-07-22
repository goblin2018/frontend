/**
 * AudioManager 测试
 */

import { AudioManager } from '../audio-manager';
import { AudioContextWrapper } from '../audio-context-wrapper';

// 模拟 uni 对象
const mockInnerAudioContext = {
  src: '',
  volume: 1,
  currentTime: 0,
  duration: 100,
  paused: true,
  loop: false,
  autoplay: false,
  play: jest.fn(),
  pause: jest.fn(),
  stop: jest.fn(),
  seek: jest.fn(),
  destroy: jest.fn(),
  onTimeUpdate: jest.fn((callback) => {
    mockInnerAudioContext._timeUpdateCallback = callback;
  }),
  _timeUpdateCallback: null,
  _triggerTimeUpdate: function(time: number) {
    this.currentTime = time;
    if (this._timeUpdateCallback) this._timeUpdateCallback();
  },
  onEnded: jest.fn((callback) => {
    mockInnerAudioContext._endedCallback = callback;
  }),
  _endedCallback: null,
  _triggerEnded: function() {
    if (this._endedCallback) this._endedCallback();
  },
  onPlay: jest.fn((callback) => {
    mockInnerAudioContext._playCallback = callback;
  }),
  _playCallback: null,
  _triggerPlay: function() {
    this.paused = false;
    if (this._playCallback) this._playCallback();
  },
  onPause: jest.fn((callback) => {
    mockInnerAudioContext._pauseCallback = callback;
  }),
  _pauseCallback: null,
  _triggerPause: function() {
    this.paused = true;
    if (this._pauseCallback) this._pauseCallback();
  },
  onCanplay: jest.fn((callback) => {
    mockInnerAudioContext._canplayCallback = callback;
  }),
  _canplayCallback: null,
  _triggerCanplay: function() {
    if (this._canplayCallback) this._canplayCallback();
  },
  onError: jest.fn((callback) => {
    mockInnerAudioContext._errorCallback = callback;
  }),
  _errorCallback: null,
  _triggerError: function(error: any) {
    if (this._errorCallback) this._errorCallback(error);
  }
};

// 模拟 uni.createInnerAudioContext
(global as any).uni = {
  createInnerAudioContext: jest.fn(() => {
    return { ...mockInnerAudioContext };
  })
};

// 模拟 AudioContextWrapper
jest.mock('../audio-context-wrapper', () => {
  return {
    AudioContextWrapper: jest.fn().mockImplementation((options) => {
      return {
        play: jest.fn(),
        pause: jest.fn(),
        stop: jest.fn(),
        seek: jest.fn(),
        setVolume: jest.fn(),
        duckVolume: jest.fn(),
        restoreVolume: jest.fn(),
        getCurrentTime: jest.fn(() => 10),
        getDuration: jest.fn(() => 100),
        isPlaying: jest.fn(() => true),
        destroy: jest.fn()
      };
    })
  };
});

describe('AudioManager', () => {
  let audioManager: AudioManager;
  
  beforeEach(() => {
    jest.clearAllMocks();
    audioManager = new AudioManager();
  });
  
  afterEach(() => {
    audioManager.destroy();
  });
  
  test('playMusic should create a new AudioContextWrapper and play', () => {
    audioManager.playMusic('test.mp3', 'Test Music', 'cover.jpg');
    expect(AudioContextWrapper).toHaveBeenCalledWith(expect.objectContaining({
      src: 'test.mp3',
      title: 'Test Music',
      coverImg: 'cover.jpg'
    }));
  });
  
  test('pauseMusic should pause the music context', () => {
    audioManager.playMusic('test.mp3');
    audioManager.pauseMusic();
    const mockInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(mockInstance.pause).toHaveBeenCalled();
  });
  
  test('stopMusic should stop the music context', () => {
    audioManager.playMusic('test.mp3');
    audioManager.stopMusic();
    const mockInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(mockInstance.stop).toHaveBeenCalled();
  });
  
  test('seekMusic should seek the music context', () => {
    audioManager.playMusic('test.mp3');
    audioManager.seekMusic(30);
    const mockInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(mockInstance.seek).toHaveBeenCalledWith(30);
  });
  
  test('setMusicVolume should set the volume of music context', () => {
    audioManager.playMusic('test.mp3');
    audioManager.setMusicVolume(0.5);
    const mockInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(mockInstance.setVolume).toHaveBeenCalledWith(0.5);
  });
  
  test('playAlert should duck music volume and play alert', () => {
    audioManager.playMusic('test.mp3');
    audioManager.playAlert('alert.mp3', 0.8);
    
    const musicInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(musicInstance.duckVolume).toHaveBeenCalled();
    
    expect(AudioContextWrapper).toHaveBeenCalledWith(expect.objectContaining({
      src: 'alert.mp3',
      volume: 0.8
    }));
  });
  
  test('duckMusicVolume should reduce music volume', () => {
    audioManager.playMusic('test.mp3');
    audioManager.duckMusicVolume();
    const mockInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(mockInstance.duckVolume).toHaveBeenCalled();
  });
  
  test('restoreMusicVolume should restore music volume', () => {
    audioManager.playMusic('test.mp3');
    audioManager.restoreMusicVolume();
    const mockInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    expect(mockInstance.restoreVolume).toHaveBeenCalled();
  });
  
  test('getCurrentTime should return current time from music context', () => {
    audioManager.playMusic('test.mp3');
    expect(audioManager.getCurrentTime()).toBe(10);
  });
  
  test('getDuration should return duration from music context', () => {
    audioManager.playMusic('test.mp3');
    expect(audioManager.getDuration()).toBe(100);
  });
  
  test('isPlaying should return playing status from music context', () => {
    audioManager.playMusic('test.mp3');
    expect(audioManager.isPlaying()).toBe(true);
  });
  
  test('destroy should clean up all resources', () => {
    audioManager.playMusic('test.mp3');
    audioManager.playAlert('alert.mp3');
    
    audioManager.destroy();
    
    const musicInstance = (AudioContextWrapper as jest.Mock).mock.instances[0];
    const alertInstance = (AudioContextWrapper as jest.Mock).mock.instances[1];
    
    expect(musicInstance.destroy).toHaveBeenCalled();
    expect(alertInstance.destroy).toHaveBeenCalled();
  });
});
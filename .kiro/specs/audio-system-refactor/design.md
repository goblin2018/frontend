# Design Document

## Overview

This design outlines the refactoring of the audio system from `backgroundAudioManager` to `innerAudioContext` to resolve audio conflicts in the WeChat Mini Program. The solution involves creating a centralized audio management system that handles multiple audio streams without interference.

## Architecture

### Current Architecture Issues
- `backgroundAudioManager` used for music playback
- `innerAudioContext` used for distraction alerts
- Audio conflicts when both play simultaneously
- Breathing animations restart due to audio interruptions

### New Architecture
- Unified `innerAudioContext` approach for all audio
- Centralized audio state management
- Proper resource cleanup and lifecycle management
- Concurrent audio stream support

## Components and Interfaces

### Audio Manager Service
A centralized service to manage all audio operations:

```typescript
interface AudioManager {
  // Main music playback
  playMusic(src: string, title?: string, coverImg?: string): void
  pauseMusic(): void
  stopMusic(): void
  seekMusic(position: number): void
  setMusicVolume(volume: number): void
  
  // Alert sounds with volume ducking
  playAlert(src: string, volume?: number): void
  
  // Volume management
  duckMusicVolume(): void  // Reduce music volume for alerts
  restoreMusicVolume(): void  // Restore original music volume
  
  // State management
  getCurrentTime(): number
  getDuration(): number
  isPlaying(): boolean
  
  // Lifecycle
  destroy(): void
}
```

### Audio Store Updates
Enhanced state management for the new audio system:

```typescript
interface AudioState {
  // Playback state
  playing: boolean
  loading: boolean
  currentTime: number
  duration: number
  
  // UI interaction state
  isDragging: boolean
  beforeDragPlaying: boolean
  slidePosition: number
  
  // Audio context references
  musicContext: UniApp.InnerAudioContext | null
  alertContext: UniApp.InnerAudioContext | null
}
```

## Data Models

### Audio Context Wrapper
```typescript
class AudioContextWrapper {
  private context: UniApp.InnerAudioContext
  private onTimeUpdate?: (currentTime: number) => void
  private onEnded?: () => void
  private onError?: (error: any) => void
  
  constructor(options: AudioOptions)
  play(): void
  pause(): void
  stop(): void
  seek(position: number): void
  destroy(): void
}
```

### Audio Configuration
```typescript
interface AudioConfig {
  src: string
  title?: string
  coverImg?: string
  loop?: boolean
  volume?: number
  autoplay?: boolean
}
```

## Error Handling

### Audio Context Creation Failures
- Retry mechanism for context creation
- Fallback to alternative audio methods if available
- User notification for critical audio failures

### Playback Errors
- Automatic retry for network-related failures
- Graceful degradation when audio resources unavailable
- State synchronization after error recovery

### Resource Management
- Automatic cleanup on page navigation
- Memory leak prevention through proper disposal
- Context limit management (WeChat has limits on concurrent contexts)

## Testing Strategy

### Unit Tests
- Audio context wrapper functionality
- State management accuracy
- Resource cleanup verification
- Error handling scenarios

### Integration Tests
- Multi-page audio state persistence
- Concurrent audio playback (music + alerts)
- UI control synchronization
- Background/foreground transitions

### Manual Testing Scenarios
1. Play music, trigger distraction alert - verify no interruption
2. Navigate between pages - verify state persistence
3. Drag progress slider during playback - verify smooth seeking
4. App backgrounding/foregrounding - verify proper state sync
5. Multiple rapid play/pause operations - verify stability

## Volume Management Strategy

### Audio Ducking Implementation
When distraction alerts need to play while background music is active:

1. **Volume Reduction**: Temporarily reduce background music volume to 20-30% of original level
2. **Alert Playback**: Play distraction alert at full volume using separate `innerAudioContext`
3. **Volume Restoration**: Restore background music to original volume after alert completes
4. **Smooth Transitions**: Use gradual volume changes to avoid jarring audio transitions

### Volume Control Flow
```typescript
// When alert starts
audioManager.duckMusicVolume() // Reduce to 0.3 of original
audioManager.playAlert(alertSrc, alertVolume)

// When alert ends
audioManager.restoreMusicVolume() // Restore to original level
```

### Benefits
- Background music continues uninterrupted
- Breathing animations maintain their rhythm
- Better user experience with smooth audio transitions
- Clear alert notifications without complete music interruption

## Implementation Considerations

### WeChat Mini Program Limitations
- Maximum number of concurrent `innerAudioContext` instances (typically 10)
- Audio format support and compatibility
- Background playback restrictions
- Memory usage optimization

### Performance Optimization
- Lazy loading of audio contexts
- Efficient state updates to prevent unnecessary re-renders
- Debounced time updates for smooth UI
- Resource pooling for frequently used audio contexts

### Backward Compatibility
- Gradual migration approach
- Feature flags for testing new implementation
- Rollback strategy if issues arise
- Monitoring for audio-related errors

## Migration Strategy

### Phase 1: Core Audio Manager
- Implement centralized audio management service
- Create audio context wrappers
- Update audio store structure

### Phase 2: Play Page Migration
- Replace backgroundAudioManager in play page
- Update all audio controls and event handlers
- Test music playback functionality

### Phase 3: App-wide Integration
- Update App.vue audio initialization
- Migrate halo page audio handling
- Update BLE component alert system

### Phase 4: Testing and Optimization
- Comprehensive testing across all scenarios
- Performance optimization
- Bug fixes and edge case handling
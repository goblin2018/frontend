# Requirements Document

## Introduction

The current audio system uses `backgroundAudioManager` for music playback and `innerAudioContext` for distraction alerts. Due to WeChat Mini Program limitations, when `innerAudioContext` plays, it causes `backgroundAudioManager` to pause, resulting in breathing animation interruptions and poor user experience. This feature will refactor the audio system to use `innerAudioContext` consistently across all audio playback scenarios.

## Requirements

### Requirement 1

**User Story:** As a user practicing meditation, I want the background music to continue playing uninterrupted when distraction alerts sound, so that my breathing rhythm and meditation flow are not disrupted.

#### Acceptance Criteria

1. WHEN a distraction alert plays THEN the background music SHALL continue playing without interruption
2. WHEN the distraction alert finishes THEN the background music SHALL maintain its current playback position
3. WHEN both audio streams are active THEN they SHALL play simultaneously without conflicts

### Requirement 2

**User Story:** As a user controlling audio playback, I want all play/pause/seek controls to work consistently with the new audio system, so that I can manage my meditation session effectively.

#### Acceptance Criteria

1. WHEN I click the play button THEN the music SHALL start playing using innerAudioContext
2. WHEN I click the pause button THEN the music SHALL pause immediately
3. WHEN I drag the progress slider THEN the music SHALL seek to the correct position
4. WHEN I release the slider THEN the music SHALL resume playing if it was playing before dragging
5. WHEN the music ends THEN the completion callback SHALL be triggered properly

### Requirement 3

**User Story:** As a user, I want the audio state management to remain consistent across all pages, so that the UI reflects the correct playback status.

#### Acceptance Criteria

1. WHEN audio plays or pauses THEN the audio store state SHALL update correctly
2. WHEN navigating between pages THEN the audio state SHALL persist accurately
3. WHEN the app goes to background THEN the audio playback behavior SHALL be handled appropriately
4. WHEN returning to foreground THEN the audio state SHALL sync with the actual playback status

### Requirement 4

**User Story:** As a user, I want proper cleanup of audio resources when leaving pages, so that there are no memory leaks or conflicting audio instances.

#### Acceptance Criteria

1. WHEN leaving a page with audio THEN all audio contexts SHALL be properly destroyed
2. WHEN the app is closed THEN all audio resources SHALL be cleaned up
3. WHEN switching between different audio sources THEN previous contexts SHALL be properly disposed
4. WHEN errors occur THEN audio contexts SHALL be handled gracefully without crashes

### Requirement 5

**User Story:** As a user on the halo monitoring page, I want the background music to loop continuously, so that I have consistent ambient sound during my session.

#### Acceptance Criteria

1. WHEN the halo page loads THEN background music SHALL start playing automatically
2. WHEN the background music ends THEN it SHALL restart automatically for continuous playback
3. WHEN leaving the halo page THEN the background music SHALL stop and resources SHALL be cleaned up
4. WHEN the page is hidden/shown THEN the music state SHALL be managed appropriately
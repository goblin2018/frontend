<template>
  <view :class="['w240 h240 mx-auto rounded-full train-circle  breath animate-playing', playing ? 'animation-playing' : 'animation-paused']"></view>
</template>

<script setup lang="ts">
interface Props {
  playing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  playing: false,
})
</script>

<style lang="scss" scoped>
$breath-duration: 8s;
$text-color: rgba(255, 255, 255, 0.6);
$text-size: 24px;

.breath {
  animation: breath 8s ease-in-out infinite;
}

.train-circle {
  transform: scale(0.8);
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 33%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 255, 255, 0.1) 93.5%);
  border: 1px solid rgba(255, 255, 255, 0.5);

  &.animation-paused {
    animation-play-state: paused;

    &::before,
    &::after {
      animation-play-state: paused;
    }
  }

  &.animation-playing {
    animation-play-state: running;

    &::before,
    &::after {
      animation-play-state: running;
    }
  }

  &::before {
    content: '吸';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $text-color;
    font-size: $text-size;
    animation: show-inhale $breath-duration infinite;
  }

  &::after {
    content: '呼';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $text-color;
    font-size: $text-size;
    animation: show-exhale $breath-duration infinite;
  }
}

@keyframes breath {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
  }
}

@keyframes show-exhale {
  0%,
  50% {
    opacity: 0;
  }
  50.01%,
  100% {
    opacity: 1;
  }
}

@keyframes show-inhale {
  0%,
  49.99% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
</style>

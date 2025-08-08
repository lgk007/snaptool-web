<template>
  <div class="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50 transition-opacity duration-300" :class="{ 'opacity-0 pointer-events-none': !isLoading }">
    <div class="text-center">
      <!-- Logo with swing animation -->
      <div class="mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto logo-swing">
          <span class="text-white font-bold text-2xl">ST</span>
        </div>
      </div>
      
      <!-- Site name -->
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">SnapTool.top</h1>
      
      <!-- Loading text -->
      <p class="text-gray-600 dark:text-gray-400 mb-6">正在加载...</p>
      
      <!-- Progress bar -->
      <div class="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
        <div class="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full progress-bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
/* Logo swing animation */
@keyframes logoSwing {
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
}

.logo-swing {
  animation: logoSwing 2s ease-in-out infinite;
  transform-origin: center;
}

/* Progress bar animation */
@keyframes progressBar {
  0% { width: 0%; }
  100% { width: 100%; }
}

.progress-bar {
  animation: progressBar 3s ease-in-out infinite;
}

/* Hover effect */
.logo-swing:hover {
  animation-duration: 0.5s;
}
</style>
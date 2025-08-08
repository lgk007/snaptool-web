<template>
  <div>
    <!-- Loading Screen -->
    <LoadingScreen :is-loading="isLoading" />
    
    <!-- Main App -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

// Handle loading state
onMounted(() => {
  // Check if user has visited before
  const hasVisited = sessionStorage.getItem('hasVisited')
  
  if (!hasVisited) {
    // First visit - show loading for 2 seconds
    setTimeout(() => {
      isLoading.value = false
      // Mark as visited for this session
      sessionStorage.setItem('hasVisited', 'true')
    }, 2000)
  } else {
    // Already visited - hide loading immediately
    isLoading.value = false
  }
})
</script>

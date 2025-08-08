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

const isLoading = ref(false)

// Check if this is the first visit
onMounted(() => {
  // Check if user has visited before
  const hasVisited = sessionStorage.getItem('hasVisited')
  
  if (!hasVisited) {
    // First visit - show loading animation
    isLoading.value = true
    
    // Hide loading screen after animation
    setTimeout(() => {
      isLoading.value = false
      // Mark as visited for this session
      sessionStorage.setItem('hasVisited', 'true')
    }, 2000)
  }
})
</script>

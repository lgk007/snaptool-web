<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="text-6xl mb-4">⚡</div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('categories.productivity') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('categories.productivityDesc') }}
        </p>
      </div>

      <!-- Tools Grid -->
      <TransitionGroup name="tool-card" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(tool, index) in productivityTools"
          :key="tool.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="text-3xl mr-3">{{ tool.icon }}</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ tool.name }}</h3>
                <span class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                  {{ t(`categories.${tool.category}`) }}
                </span>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ tool.description }}</p>
            <a
              :href="tool.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              {{ t('tools.visitTool') }}
            </a>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { allTools } from '~/data/tools.js'

const { t, locale } = useI18n()

// 获取生产力工具数据
const productivityTools = computed(() => {
  return allTools.filter(tool => tool.category === 'productivity').map(tool => ({
    id: tool.id,
    name: locale.value === 'zh' ? tool['name-zh'] : tool['name-en'],
    description: locale.value === 'zh' ? tool['description-zh'] : tool['description-en'],
    icon: tool.icon,
    url: tool.url,
    category: tool.category,
    free: true
  }))
})


</script>

<style scoped>
/* Tool card animations */
.tool-card-enter-active {
  transition: all 0.6s ease;
}

.tool-card-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.tool-card-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Tool card slide-in animation like homepage */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
}
</style>
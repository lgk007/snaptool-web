<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('search.resultsTitle') }}
        </h1>
        <div class="flex items-center space-x-4 mb-6">
          <div class="relative flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('search.placeholder')"
              class="w-full px-4 py-3 pl-10 pr-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg"
              @keyup.enter="performSearch"
            >
            <Icon name="uil:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300" :class="{ 'text-blue-500 scale-110': searchQuery.trim() }"></Icon>
          </div>
          <button
            @click="performSearch"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {{ t('search.searchButton') }}
          </button>
        </div>
        
        <!-- Search Info -->
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <span v-if="searchQuery">{{ t('search.searchFor') }} "{{ searchQuery }}" - </span>
          <span>{{ t('search.foundResults', { count: filteredTools.length }) }}</span>
        </div>
      </div>
      
      <!-- Filter Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex flex-wrap gap-x-4 gap-y-2">
            <button
              v-for="category in categories"
              :key="category.key"
              @click="selectedCategory = category.key"
              :class="[
                selectedCategory === category.key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 transform scale-105'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 hover:scale-102',
                'py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 transform'
              ]"
            >
              <span class="transition-transform duration-300" :class="{ 'scale-110': selectedCategory === category.key }">{{ category.icon }}</span> {{ category.name }}
              <span class="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs transition-all duration-300" :class="{ 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300': selectedCategory === category.key }">
                {{ getCategoryCount(category.key) }}
              </span>
            </button>
          </nav>
        </div>
      </div>
      
      <!-- Search Results Grid -->
      <div v-if="filteredTools.length > 0">
        <Transition name="search-results" mode="out-in">
          <div :key="selectedCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(tool, index) in filteredTools"
              :key="tool.id"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 hover:-translate-y-1 search-result-card"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="flex items-start space-x-4 cursor-pointer" @click="openTool(tool)">
                <div class="text-3xl transition-transform duration-300 hover:scale-110">{{ tool.icon }}</div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                    {{ locale === 'zh' ? tool['name-zh'] : tool['name-en'] }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 transition-colors duration-300">
                      {{ locale === 'zh' ? tool['description-zh'] : tool['description-en'] }}
                    </p>
                  <div class="flex items-center justify-between">
                    <span class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                      {{ getCategoryName(tool.category) }}
                    </span>
                    <button
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-all duration-300 transform hover:scale-110"
                    >
                      {{ t('search.useTool') }} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      
      <!-- No Results -->
      <div v-else-if="searchQuery" class="text-center py-16">
        <Icon name="uil:search" class="w-16 h-16 text-gray-400 mx-auto mb-4"></Icon>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ t('search.noResults') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ t('search.noResultsDesc') }}
        </p>
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="(suggestion, index) in searchSuggestions"
            :key="suggestion"
            @click="searchQuery = suggestion; performSearch()"
            class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 suggestion-tag"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
      
      <!-- Default State -->
      <div v-else class="text-center py-16">
        <Icon name="uil:apps" class="w-16 h-16 text-gray-400 mx-auto mb-4"></Icon>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ t('search.allTools') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          {{ t('search.allToolsDesc') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: '工具搜索 - SnapTool',
  meta: [
    { name: 'description', content: '搜索和发现各种实用的在线工具，包括开发工具、设计工具、转换工具等。' }
  ]
})

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// Reactive data
const searchQuery = ref(route.query.q || '')
const selectedCategory = ref('all')

// 导入工具数据
import { allTools, searchSuggestions } from '~/data/tools.js'

// 分类数据 - 支持国际化
const categories = computed(() => [
  { key: 'all', name: t('categories.all'), icon: '📋' },
  { key: 'hot', name: t('categories.hot'), icon: '🔥' },
  { key: 'development', name: t('categories.development'), icon: '💻' },
  { key: 'design', name: t('categories.design'), icon: '🎨' },
  { key: 'document', name: t('categories.document'), icon: '📄' },
  { key: 'image', name: t('categories.image'), icon: '🖼️' },
  { key: 'conversion', name: t('categories.conversion'), icon: '🔄' },
  { key: 'productivity', name: t('categories.productivity'), icon: '⚡' }
])

// Get current locale
const { locale } = useI18n()

// Computed properties
const filteredTools = computed(() => {
  let tools = allTools
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    tools = tools.filter(tool => {
      const description = locale.value === 'zh' ? tool['description-zh'] : tool['description-en']
      const name = locale.value === 'zh' ? tool['name-zh'] : tool['name-en']
      return name.toLowerCase().includes(query) ||
             description.toLowerCase().includes(query) ||
             tool.category.toLowerCase().includes(query)
    })
  }
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    tools = tools.filter(tool => tool.category === selectedCategory.value)
  }
  
  return tools
})

// Methods

const getCategoryCount = (categoryKey) => {
  if (categoryKey === 'all') {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return allTools.length
    return allTools.filter(tool => {
      const description = locale.value === 'zh' ? tool['description-zh'] : tool['description-en']
      const name = locale.value === 'zh' ? tool['name-zh'] : tool['name-en']
      return name.toLowerCase().includes(query) ||
             description.toLowerCase().includes(query) ||
             tool.category.toLowerCase().includes(query)
    }).length
  }
  
  let tools = allTools.filter(tool => tool.category === categoryKey)
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    tools = tools.filter(tool => {
      const description = locale.value === 'zh' ? tool['description-zh'] : tool['description-en']
      const name = locale.value === 'zh' ? tool['name-zh'] : tool['name-en']
      return name.toLowerCase().includes(query) ||
             description.toLowerCase().includes(query) ||
             tool.category.toLowerCase().includes(query)
    })
  }
  
  return tools.length
}

const getCategoryName = (categoryKey) => {
  const categoryMap = {
    'hot': t('categories.hot'),
    'development': t('categories.development'),
    'design': t('categories.design'),
    'document': t('categories.document'),
    'image': t('categories.image'),
    'conversion': t('categories.conversion'),
    'productivity': t('categories.productivity')
  }
  return categoryMap[categoryKey] || categoryKey
}

const openTool = (tool) => {
  // For now, just show an alert. In a real app, this would navigate to the tool page
  const name = locale.value === 'zh' ? tool['name-zh'] : tool['name-en']
  const description = locale.value === 'zh' ? tool['description-zh'] : tool['description-en']
  alert(`打开工具: ${name}\n描述: ${description}\n链接: ${tool.url}`)
}

// Watch for route changes
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery || ''
})

// Highlight selected tool if coming from search modal
const selectedToolId = route.query.tool
if (selectedToolId) {
  nextTick(() => {
    const toolElement = document.querySelector(`[data-tool-id="${selectedToolId}"]`)
    if (toolElement) {
      toolElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      toolElement.classList.add('ring-2', 'ring-blue-500')
      setTimeout(() => {
        toolElement.classList.remove('ring-2', 'ring-blue-500')
      }, 3000)
    }
  })
}
</script>

<style scoped>
/* 搜索结果过渡动画 */
.search-results-enter-active {
  transition: all 0.4s ease;
}
.search-results-leave-active {
  transition: all 0.3s ease;
}
.search-results-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.search-results-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 搜索结果卡片入场动画 */
@keyframes searchCardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.search-result-card {
  animation: searchCardSlideIn 0.6s ease forwards;
  opacity: 0;
}

/* 搜索建议标签动画 */
@keyframes suggestionSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.suggestion-tag {
  animation: suggestionSlideIn 0.5s ease forwards;
  opacity: 0;
}

/* 分类标签悬停效果增强 */
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
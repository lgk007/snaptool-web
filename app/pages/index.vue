<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            {{ t('hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            {{ t('hero.subtitle') }}
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto relative">
            <div class="flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 focus-within:scale-[1.02] transform">
              <div class="flex-1 relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300" :class="{ 'text-blue-500 scale-125 rotate-12': searchQuery.trim() }">🔍</span>
                <input
                  v-model="searchQuery"
                  @input="onSearchInput"
                  @keydown.enter="performSearch"
                  :placeholder="t('hero.searchPlaceholder')"
                  class="block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 bg-transparent text-gray-900 placeholder-gray-400 pl-10 pr-4 py-3 transition-all duration-300 focus:placeholder-gray-300"
                />
              </div>
              <button
                @click="performSearch"
                :disabled="!searchQuery.trim()"
                class="px-6 py-3 bg-blue-500 text-white font-medium rounded-r-lg border-l border-gray-200 transition-all duration-300 hover:bg-blue-600 hover:scale-110 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 transform"
              >
                {{ t('hero.searchButton') }}
              </button>
            </div>
            
            <!-- Search Results Dropdown -->
            <Transition name="search-dropdown">
              <div v-if="searchQuery.trim()" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                <div class="p-2">
                  <!-- Search Results -->
                  <div v-if="searchResults.length > 0">
                    <div
                      v-for="(result, index) in searchResults"
                      :key="result.id"
                      @click="selectSearchResult(result)"
                      class="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-300 text-left transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-md active:scale-[0.98] search-result-item group"
                      :style="{ animationDelay: `${index * 50}ms` }"
                    >
                      <div class="text-2xl mr-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">{{ result.icon }}</div>
                      <div class="flex-1 text-left">
                        <h4 class="font-medium text-gray-900 dark:text-white text-left transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ result.name }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 text-left transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">{{ locale === 'zh' ? result['description-zh'] : result['description-en'] }}</p>
                        <span class="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 group-hover:scale-105 group-hover:shadow-sm">
                          {{ t(`categories.${result.category}`) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- No Results -->
                  <div v-else class="p-4 text-center no-results-animation">
                    <div class="text-gray-400 mb-2 transition-all duration-500 hover:scale-125 hover:text-blue-400 cursor-pointer">
                      <Icon name="uil:search" class="w-8 h-8 mx-auto mb-2 transition-all duration-500 hover:rotate-12"></Icon>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300">{{ t('search.noResults') }}</p>
                    <p class="text-gray-500 dark:text-gray-500 text-xs transition-all duration-300 hover:text-gray-600 dark:hover:text-gray-400">{{ t('search.noResultsDesc') }}</p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>


        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        {{ t('categories.title') }}
      </h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
        <!-- All Category -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 transform hover:scale-105"
          :class="{ 
            'ring-2 ring-blue-500 scale-105 shadow-xl': selectedCategory === 'all',
            'hover:shadow-lg': selectedCategory !== 'all'
          }"
          @click="filterByCategory('all')"
        >
          <div class="text-center p-4">
            <div class="text-3xl mb-2 transition-transform duration-300" :class="{ 'scale-110': selectedCategory === 'all' }">🔥</div>
            <h3 class="font-semibold text-sm text-gray-900 dark:text-white transition-colors duration-300" :class="{ 'text-blue-600 dark:text-blue-400': selectedCategory === 'all' }">{{ t('categories.hot') }}</h3>
          </div>
        </div>
        <!-- Other Categories -->
        <div
          v-for="category in categories"
          :key="category.key"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 transform hover:scale-105"
          :class="{ 
            'ring-2 ring-blue-500 scale-105 shadow-xl': selectedCategory === category.key,
            'hover:shadow-lg': selectedCategory !== category.key
          }"
          @click="filterByCategory(category.key)"
        >
          <div class="text-center p-4">
            <div class="text-3xl mb-2 transition-transform duration-300" :class="{ 'scale-110': selectedCategory === category.key }">{{ category.icon }}</div>
            <h3 class="font-semibold text-sm text-gray-900 dark:text-white transition-colors duration-300" :class="{ 'text-blue-600 dark:text-blue-400': selectedCategory === category.key }">{{ t(`categories.${category.key}`) }}</h3>
          </div>
        </div>
      </div>

      <!-- Tools Section -->
      <Transition name="fade" mode="out-in">
        <h2 :key="selectedCategory" class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {{ selectedCategory === 'all' ? '🔥 热门工具' : getCategoryIcon(selectedCategory) + ' ' + t(`categories.${selectedCategory}`) }}
        </h2>
      </Transition>
      
      <Transition name="slide-fade" mode="out-in">
        <div :key="selectedCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(tool, index) in filteredTools"
            :key="tool.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 transform hover:scale-105 hover:-translate-y-1"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="p-6">
              <div class="flex items-center mb-4">
                <div class="text-2xl mr-3">{{ tool.icon }}</div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ locale === 'zh' ? tool['name-zh'] : tool['name-en'] }}</h3>
                  <span class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                    {{ t(`categories.${tool.category}`) }}
                  </span>
                </div>
              </div>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ locale === 'zh' ? tool['description-zh'] : tool['description-en'] }}</p>
              <div class="flex justify-end items-center">
                <a
                  :href="tool.url"
                  target="_blank"
                  class="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium"
                >
                  {{ t('tools.visitTool') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* 淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 滑动淡入动画 */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* 工具卡片逐个显示动画 */
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

.grid > div {
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
}

/* 搜索下拉框动画 */
.search-dropdown-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.search-dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.search-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-15px) scale(0.9) rotateX(-10deg);
}
.search-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95) rotateX(5deg);
}

/* 搜索结果项动画 */
@keyframes searchResultSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.search-result-item {
  animation: searchResultSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

.search-result-item:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
}

/* 无结果动画 */
@keyframes noResultsBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-15px) scale(1.05);
  }
  60% {
    transform: translateY(-8px) scale(1.02);
  }
}

@keyframes noResultsPulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.no-results-animation {
  animation: noResultsBounce 1.2s ease-in-out, noResultsPulse 2s ease-in-out infinite;
}
</style>

<script setup>
const { t, locale } = useI18n()
const searchQuery = ref('')
const selectedCategory = ref('all')
const searchResults = ref([])

// 导入工具数据
import { allTools, searchSuggestions } from '~/data/tools.js'

const categories = [
  { key: 'development', icon: '💻' },
  { key: 'design', icon: '🎨' },
  { key: 'document', icon: '📝' },
  { key: 'image', icon: '🖼️' },
  { key: 'conversion', icon: '🔄' },
  { key: 'productivity', icon: '⚡' }
]

// 获取分类图标的函数
const getCategoryIcon = (categoryKey) => {
  const category = categories.find(cat => cat.key === categoryKey)
  return category ? category.icon : '🔥'
}



const filteredTools = computed(() => {
  if (selectedCategory.value === 'all') {
    // 显示热门工具
    return allTools.filter(tool => tool.isHot).slice(0, 15)
  } else {
    // 显示对应分类的工具
    return allTools.filter(tool => tool.category === selectedCategory.value)
  }
})

const filterByCategory = (category) => {
  selectedCategory.value = category
}

// Search handlers
const onSearchInput = () => {
  if (searchQuery.value.trim()) {
    performSearch()
  } else {
    searchResults.value = []
  }
}

const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  
  const query = searchQuery.value.toLowerCase()
  searchResults.value = allTools.filter(tool => {
    const description = locale.value === 'zh' ? tool['description-zh'] : tool['description-en']
    const name = locale.value === 'zh' ? tool['name-zh'] : tool['name-en']
    return name.toLowerCase().includes(query) ||
           description.toLowerCase().includes(query) ||
           tool.category.toLowerCase().includes(query)
  })
}

const selectSearchResult = (result) => {
  // Navigate to search results page with the selected tool
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}&tool=${result.id}`)
  // Clear search after selection
  searchQuery.value = ''
  searchResults.value = []
}


</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">ST</span>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white">SnapTool.top</span>
            </NuxtLink>
          </div>
          
          <!-- Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <nav class="hidden md:flex space-x-8">
              <NuxtLink 
                to="/" 
                class="text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400"
                active-class="text-blue-600 dark:text-blue-400"
              >
                {{ t('nav.home') }}
              </NuxtLink>
              
              <!-- Tools Dropdown -->
              <div class="relative" @mouseenter="handleToolsMouseEnter" @mouseleave="handleToolsMouseLeave">
                <div class="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400 flex items-center group">
                  {{ t('nav.tools') }}
                  <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" :class="{ 'rotate-180': showToolsDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <Transition name="dropdown">
                  <div v-show="showToolsDropdown" class="overflow-hidden absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50" @mouseenter="handleDropdownMouseEnter" @mouseleave="handleDropdownMouseLeave">

                    <NuxtLink to="/hot" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '0ms' }">
                      🔥 {{ t('categories.hot') }}
                    </NuxtLink>
                    <NuxtLink to="/development" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '50ms' }">
                      💻 {{ t('categories.development') }}
                    </NuxtLink>
                    <NuxtLink to="/design" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '100ms' }">
                      🎨 {{ t('categories.design') }}
                    </NuxtLink>
                    <NuxtLink to="/document" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '150ms' }">
                      📝 {{ t('categories.document') }}
                    </NuxtLink>
                    <NuxtLink to="/image" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '200ms' }">
                      🖼️ {{ t('categories.image') }}
                    </NuxtLink>
                    <NuxtLink to="/conversion" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '250ms' }">
                      🔄 {{ t('categories.conversion') }}
                    </NuxtLink>
                    <NuxtLink to="/productivity" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm transition-all duration-200" :style="{ animationDelay: '300ms' }">
                      ⚡ {{ t('categories.productivity') }}
                    </NuxtLink>
                  </div>
                </Transition>
              </div>
            </nav>
            
            <!-- Theme and Language Toggles -->
            <div class="flex items-center space-x-2">
              <!-- Search Button -->
              <button 
                @click="toggleSearchModal"
                class="w-8 h-8 cursor-pointer flex justify-center items-center rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 active:scale-95"
                :title="t('nav.search')"
              >
                <Icon name="uil:search" class="w-4 h-4 hover:rotate-12 transition-transform duration-100"></Icon>
              </button>
              
              <!-- Language Toggle -->
              <div 
                @click="toggleLanguage"
                class="w-8 h-8 cursor-pointer flex justify-center items-center rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 active:scale-95"
                :title="t('nav.toggleLanguage')"
              >
                <span class="text-sm font-medium">{{ locale === 'zh' ? 'EN' : '中' }}</span>
              </div>
              
              <!-- Theme Toggle -->
              <div 
                @click="toggleTheme"
                class="w-8 h-8 cursor-pointer flex justify-center items-center rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 active:scale-95"
                :title="t('nav.toggleTheme' + (isDark ? 'Light' : 'Dark'))"
              >
                <Icon name="uil:sun" v-if="isDark"></Icon>
                <Icon name="uil:moon" v-else></Icon>
            </div>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center space-x-2">
            <!-- Mobile Search Button -->
            <button 
              @click="toggleSearchModal"
              class="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 hover:scale-110 hover:shadow-md transition-all duration-300 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 active:scale-95"
              :title="t('nav.search')"
            >
              <Icon name="uil:search" class="w-4 h-4 hover:rotate-12 transition-transform duration-300"></Icon>
            </button>
            
            <!-- Mobile Theme Toggle -->
            <button 
              @click="toggleTheme"
              class="p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
              :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
            >
              <Icon name="uil:sun" />
              <span class=".i-uil-sun"></span>
            </button>
            
            <!-- Mobile Language Toggle -->
            <button 
              @click="toggleLanguage"
              class="p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
            >
              <span class="text-sm font-medium">{{ locale === 'zh' ? 'EN' : '中' }}</span>
            </button>
            
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-600 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:text-white"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  v-if="!mobileMenuOpen" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  v-else 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
          <nav class="flex flex-col space-y-2">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2 dark:text-gray-300 dark:hover:text-blue-400"
              active-class="text-blue-600 dark:text-blue-400"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.home') }}
            </NuxtLink>
            
            <!-- Mobile Tools Section -->
            <div class="py-2">
              <div class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{{ t('nav.tools') }}</div>
              <div class="pl-4 space-y-1">
                <NuxtLink to="/hot" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  🔥 {{ t('categories.hot') }}
                </NuxtLink>
                <NuxtLink to="/development" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  💻 {{ t('categories.development') }}
                </NuxtLink>
                <NuxtLink to="/design" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  🎨 {{ t('categories.design') }}
                </NuxtLink>
                <NuxtLink to="/document" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  📝 {{ t('categories.document') }}
                </NuxtLink>
                <NuxtLink to="/image" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  🖼️ {{ t('categories.image') }}
                </NuxtLink>
                <NuxtLink to="/conversion" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  🔄 {{ t('categories.conversion') }}
                </NuxtLink>
                <NuxtLink to="/productivity" class="block text-gray-600 hover:text-blue-600 transition-colors py-1 dark:text-gray-300 dark:hover:text-blue-400" @click="mobileMenuOpen = false">
                  ⚡ {{ t('categories.productivity') }}
                </NuxtLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-1">
      <NuxtPage />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and Description -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">ST</span>
              </div>
              <span class="text-xl font-bold">SnapTool</span>
            </div>
            <p class="text-gray-400 mb-4 max-w-md">
              {{ t('footer.description') }}
            </p>
            <p class="text-gray-400 mb-4 max-w-md text-sm">
              {{ t('footer.privacy') }}
            </p>
          </div>
          
          <!-- Tool Categories -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ t('categories.title') }}</h3>
            <div class="grid grid-cols-2 gap-x-8 gap-y-2">
              <NuxtLink to="/hot" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.hot') }}</NuxtLink>
              <NuxtLink to="/development" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.development') }}</NuxtLink>
              <NuxtLink to="/design" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.design') }}</NuxtLink>
              <NuxtLink to="/document" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.document') }}</NuxtLink>
              <NuxtLink to="/image" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.image') }}</NuxtLink>
              <NuxtLink to="/conversion" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.conversion') }}</NuxtLink>
              <NuxtLink to="/productivity" class="text-gray-400 hover:text-white transition-colors">{{ t('categories.productivity') }}</NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Copyright -->
        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            © {{ new Date().getFullYear() }} SnapTool. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
    
    <!-- Search Modal -->
    <Transition name="search-modal" appear>
      <div v-if="showSearchModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeSearchModal">
        <div class="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay -->
          <Transition name="modal-backdrop" appear>
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
          </Transition>
          
          <!-- Modal panel -->
          <Transition name="modal-content" appear>
            <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" @click.stop>
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  {{ t('search.title') }}
                </h3>
                
                <!-- Search Input -->
                <div class="relative mb-4">
                  <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="t('search.placeholder')"
                    class="w-full px-4 py-3 pl-10 pr-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:scale-[1.02] focus:shadow-lg transition-all duration-300"
                    @keyup.enter="performSearch"
                    @input="onSearchInput"
                  >
                  <Icon name="uil:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300" :class="{ 'text-blue-500 scale-110 rotate-12': searchQuery }"></Icon>
                </div>
                
                <!-- Search Results -->
                <Transition name="search-results" appear>
                  <div v-if="searchResults.length > 0" class="max-h-80 overflow-y-auto overflow-x-hidden">

                    <div class="space-y-2">
                      <div 
                        v-for="(result, index) in searchResults" 
                        :key="result.id"
                        class="p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer transition-all duration-200 group"
                        :style="{ animationDelay: `${index * 50}ms` }"
                        @click="selectSearchResult(result)"
                      >
                        <div class="flex items-center space-x-3">
                          <span class="text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">{{ result.icon }}</span>
                          <div class="flex-1">
                            <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{{ locale === 'zh' ? result['name-zh'] : result['name-en'] }}</h4>
                            <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">{{ locale === 'zh' ? result['description-zh'] : result['description-en'] }}</p>
                            <span class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mt-1 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:scale-105 transition-all duration-200">{{ result.category }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
                
                <!-- No Results -->
                <Transition name="no-results" appear>
                  <div v-if="searchQuery && searchResults.length === 0" class="text-center py-8">
                    <Icon name="uil:search" class="w-12 h-12 text-gray-400 mx-auto mb-4 hover:scale-110 hover:text-blue-400 transition-all duration-500 cursor-pointer animate-bounce"></Icon>
                    <p class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">{{ t('search.noResults') }}</p>
                  </div>
                </Transition>
                
                <!-- Search Suggestions -->
                <Transition name="search-suggestions" appear>
                  <div v-if="!searchQuery" class="text-center py-8">
                    <Icon name="uil:search" class="w-12 h-12 text-gray-400 mx-auto mb-4 hover:scale-110 hover:text-blue-400 transition-all duration-500 cursor-pointer"></Icon>
                    <p class="text-gray-500 dark:text-gray-400 mb-4 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">{{ t('search.suggestions') }}</p>
                    <div class="flex flex-wrap gap-2 justify-center">
                      <button 
                        v-for="(suggestion, index) in searchSuggestions" 
                        :key="suggestion"
                        @click="searchQuery = suggestion; performSearch()"
                        class="cursor-pointer px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 hover:shadow-md transition-all duration-300"
                        :style="{ animationDelay: `${index * 100}ms` }"
                      >
                        {{ suggestion }}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="performSearch"
              :disabled="!searchQuery.trim()"
              class="cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"

            >
              {{ t('search.searchButton') }}
            </button>
            <button
              @click="closeSearchModal"
              class="cursor-pointer mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm active:scale-95 transition-all duration-200"
            >
              {{ t('search.cancel') }}
            </button>
          </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const showToolsDropdown = ref(false)
const showSearchModal = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
let dropdownTimer = null

// Mock tool data for search
// 导入工具数据
import { allTools, searchSuggestions } from '~/data/tools.js'

// Search modal handlers
const toggleSearchModal = () => {
  showSearchModal.value = !showSearchModal.value
  if (showSearchModal.value) {
    searchQuery.value = ''
    searchResults.value = []
    // Focus on search input after modal opens
    nextTick(() => {
      const searchInput = document.querySelector('input[type="text"]')
      if (searchInput) searchInput.focus()
    })
  }
}

const closeSearchModal = () => {
  showSearchModal.value = false
  searchQuery.value = ''
  searchResults.value = []
}

const onSearchInput = () => {
  if (searchQuery.value.trim()) {
    performSearch()
  } else {
    searchResults.value = []
  }
}

const performSearch = () => {
  if (!searchQuery.value.trim()) return
  
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
  closeSearchModal()
}

// Tools dropdown handlers
const handleToolsMouseEnter = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer)
    dropdownTimer = null
  }
  showToolsDropdown.value = true
}

const handleToolsMouseLeave = () => {
  dropdownTimer = setTimeout(() => {
    showToolsDropdown.value = false
  }, 300) // 300ms delay
}

const handleDropdownMouseEnter = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer)
    dropdownTimer = null
  }
}

const handleDropdownMouseLeave = () => {
  dropdownTimer = setTimeout(() => {
    showToolsDropdown.value = false
  }, 300) // 300ms delay
}

// Theme management
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Language management
const { locale, setLocale, t } = useI18n()

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  setLocale(newLocale)
}
</script>

<style scoped>
/* Search Modal Animations */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.3s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

/* Modal Backdrop Animations */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* Modal Content Animations */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95) rotateX(-10deg);
}

.modal-content-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98) rotateX(5deg);
}

/* Search Results Animations */
.search-results-enter-active {
  transition: all 0.4s ease-out;
}

.search-results-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

/* No Results Animations */
.no-results-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.no-results-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* Search Suggestions Animations */
.search-suggestions-enter-active {
  transition: all 0.4s ease-out;
}

.search-suggestions-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.95);
}

/* Staggered animation for search result items */
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.search-results .space-y-2 > div {
  animation: slideInFromLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

/* Staggered animation for suggestion buttons */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.search-suggestions button {
  animation: fadeInUp 0.3s ease-out forwards;
  opacity: 0;
}

/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Dropdown menu items staggered animation */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px) translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

.dropdown-enter-active .block {
  animation: slideInFromTop 0.3s ease-out forwards;
  opacity: 0;
}
</style>
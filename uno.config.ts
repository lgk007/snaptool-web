import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // 包含 Tailwind CSS 兼容的工具类
    presetAttributify(), // 支持属性化模式
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: [
    // 自定义快捷方式
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['btn-primary', 'bg-blue-500 hover:bg-blue-600 text-white'],
    ['card', 'bg-white rounded-lg shadow-md p-6'],
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
 })
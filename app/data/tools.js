// 工具数据配置文件
export const allTools = [
  // 热门工具
  { id: 1, 'name-zh': 'JSON格式化', 'name-en': 'JSON Formatter', 'description-zh': '格式化和验证JSON数据', 'description-en': 'Format and validate JSON data', icon: '📝', category: 'hot', url: '/tools/json-formatter', isHot: true },
  { id: 2, 'name-zh': 'Base64编码', 'name-en': 'Base64 Encoder', 'description-zh': 'Base64编码和解码工具', 'description-en': 'Base64 encoding and decoding tool', icon: '🔐', category: 'hot', url: '/tools/base64', isHot: true },
  { id: 3, 'name-zh': '颜色选择器', 'name-en': 'Color Picker', 'description-zh': '选择和转换颜色格式', 'description-en': 'Select and convert color formats', icon: '🎨', category: 'hot', url: '/tools/color-picker', isHot: true },
  { id: 4, 'name-zh': 'QR码生成器', 'name-en': 'QR Code Generator', 'description-zh': '生成二维码', 'description-en': 'Generate QR codes', icon: '📱', category: 'hot', url: '/tools/qr-generator', isHot: true },
  
  // 开发工具
  { id: 5, 'name-zh': 'UUID生成器', 'name-en': 'UUID Generator', 'description-zh': '生成唯一标识符', 'description-en': 'Generate unique identifiers', icon: '🆔', category: 'development', url: '/tools/uuid-generator', isHot: true },
  { id: 6, 'name-zh': 'CSS美化', 'name-en': 'CSS Formatter', 'description-zh': '格式化和美化CSS代码', 'description-en': 'Format and beautify CSS code', icon: '💅', category: 'development', url: '/tools/css-formatter', isHot: true },
  { id: 7, 'name-zh': 'HTML格式化', 'name-en': 'HTML Formatter', 'description-zh': '格式化HTML代码', 'description-en': 'Format HTML code', icon: '🌐', category: 'development', url: '/tools/html-formatter', isHot: false },
  { id: 8, 'name-zh': 'JavaScript压缩', 'name-en': 'JS Minifier', 'description-zh': '压缩JavaScript代码', 'description-en': 'Minify JavaScript code', icon: '⚡', category: 'development', url: '/tools/js-minify', isHot: true },
  
  // 设计工具
  { id: 9, 'name-zh': '渐变生成器', 'name-en': 'Gradient Generator', 'description-zh': '创建CSS渐变效果', 'description-en': 'Create CSS gradient effects', icon: '🌈', category: 'design', url: '/tools/gradient-generator', isHot: true },
  { id: 10, 'name-zh': '阴影生成器', 'name-en': 'Shadow Generator', 'description-zh': '生成CSS阴影效果', 'description-en': 'Generate CSS shadow effects', icon: '🌑', category: 'design', url: '/tools/shadow-generator', isHot: false },
  { id: 11, 'name-zh': '字体预览', 'name-en': 'Font Preview', 'description-zh': '预览不同字体效果', 'description-en': 'Preview different font effects', icon: '🔤', category: 'design', url: '/tools/font-preview', isHot: false },
  
  // 文档工具
  { id: 12, 'name-zh': 'Markdown编辑器', 'name-en': 'Markdown Editor', 'description-zh': '在线Markdown编辑和预览', 'description-en': 'Online Markdown editor and preview', icon: '📄', category: 'document', url: '/tools/markdown-editor', isHot: true },
  { id: 13, 'name-zh': 'PDF转换', 'name-en': 'PDF Converter', 'description-zh': '转换文档为PDF格式', 'description-en': 'Convert documents to PDF format', icon: '📋', category: 'document', url: '/tools/pdf-converter', isHot: true },
  { id: 14, 'name-zh': '文本对比', 'name-en': 'Text Diff', 'description-zh': '比较两个文本的差异', 'description-en': 'Compare differences between two texts', icon: '📊', category: 'document', url: '/tools/text-diff', isHot: false },
  
  // 图片工具
  { id: 15, 'name-zh': '图片压缩', 'name-en': 'Image Compressor', 'description-zh': '压缩图片文件大小', 'description-en': 'Compress image file size', icon: '🖼️', category: 'image', url: '/tools/image-compress', isHot: true },
  { id: 16, 'name-zh': '图片格式转换', 'name-en': 'Image Converter', 'description-zh': '转换图片格式', 'description-en': 'Convert image formats', icon: '🔄', category: 'image', url: '/tools/image-converter', isHot: true },
  { id: 17, 'name-zh': '图片裁剪', 'name-en': 'Image Cropper', 'description-zh': '在线裁剪图片', 'description-en': 'Crop images online', icon: '✂️', category: 'image', url: '/tools/image-crop', isHot: false },
  
  // 转换工具
  { id: 18, 'name-zh': 'URL编码解码', 'name-en': 'URL Encoder/Decoder', 'description-zh': 'URL编码和解码工具', 'description-en': 'URL encoding and decoding tool', icon: '🔗', category: 'conversion', url: '/tools/url-encoder', isHot: true },
  { id: 19, 'name-zh': '时间戳转换', 'name-en': 'Timestamp Converter', 'description-zh': '时间戳和日期格式转换', 'description-en': 'Timestamp and date format conversion', icon: '⏰', category: 'conversion', url: '/tools/timestamp', isHot: true },
  { id: 20, 'name-zh': '进制转换', 'name-en': 'Base Converter', 'description-zh': '数字进制转换工具', 'description-en': 'Number base conversion tool', icon: '🔢', category: 'conversion', url: '/tools/base-converter', isHot: false },
  
  // 效率工具
  { id: 21, 'name-zh': '密码生成器', 'name-en': 'Password Generator', 'description-zh': '生成安全密码', 'description-en': 'Generate secure passwords', icon: '🔑', category: 'productivity', url: '/tools/password-generator', isHot: true },
  { id: 22, 'name-zh': '短链生成', 'name-en': 'URL Shortener', 'description-zh': '生成短链接', 'description-en': 'Generate short links', icon: '🔗', category: 'productivity', url: '/tools/url-shortener', isHot: false },
  { id: 23, 'name-zh': '随机数生成', 'name-en': 'Random Generator', 'description-zh': '生成随机数字', 'description-en': 'Generate random numbers', icon: '🎲', category: 'productivity', url: '/tools/random-generator', isHot: false },
  { id: 24, 'name-zh': '文本计数', 'name-en': 'Text Counter', 'description-zh': '统计文本字符和单词数', 'description-en': 'Count text characters and words', icon: '📝', category: 'productivity', url: '/tools/text-counter', isHot: false }
]

// 搜索建议词
export const searchSuggestions = [
  'JSON', '颜色', '图片压缩', 'Base64', 'Markdown', 
  '二维码', '密码生成', 'URL编码', '时间戳', 'CSS'
]
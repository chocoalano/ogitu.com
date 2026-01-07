# Nuxt UI Integration dengan AdonisJS v6 + Inertia Vue

## 🎨 Setup Complete!

Project ini telah diintegrasikan dengan **Tailwind CSS** dan styling yang terinspirasi dari **Nuxt UI** untuk memberikan pengalaman UI yang modern dan responsif.

## 📦 Dependencies Installed

```json
{
  "devDependencies": {
    "tailwindcss": "^latest",
    "postcss": "^latest",
    "autoprefixer": "^latest",
    "@nuxt/ui": "^latest",
    "@nuxtjs/color-mode": "^latest",
    "@iconify-json/heroicons": "^latest",
    "@iconify-json/lucide": "^latest"
  }
}
```

## 🛠️ Configuration Files

### 1. Tailwind CSS (`tailwind.config.js`)
```javascript
export default {
  content: [
    './inertia/**/*.{vue,js,ts,jsx,tsx}',
    './resources/**/*.edge',
    './node_modules/@nuxt/ui/dist/runtime/**/*.{vue,mjs,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Green color palette
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          // ...
        },
      },
    },
  },
}
```

### 2. PostCSS (`postcss.config.js`)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. CSS (`inertia/css/app.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📁 File Structure

```
inertia/
├── app/
│   └── app.ts                  # Inertia entry point
├── css/
│   └── app.css                 # Main CSS with Tailwind
├── layouts/
│   ├── default.vue             # Basic layout
│   └── app.vue                 # App layout dengan navbar & footer
├── pages/
│   ├── home.vue                # Homepage dengan hero & features
│   └── products.vue            # Products listing page
└── plugins/
    └── nuxt-ui.ts              # Nuxt UI plugin stub
```

## 🎯 Features

### ✅ Dark Mode Support
```vue
<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
```

### ✅ Responsive Navigation
- Mobile-friendly hamburger menu ready
- Dark mode toggle
- Shopping cart icon with badge
- User menu

### ✅ Component Styling
Semua komponen menggunakan Tailwind CSS utility classes dengan:
- Primary color: Green (`#22c55e`)
- Dark mode support
- Responsive design
- Hover effects & transitions

## 🎨 Available Pages

### 1. Homepage (`/`)
- Hero section dengan CTA
- Features section (3 kolom)
- Call-to-action section
- Full dark mode support

### 2. Products Page (`/products`)
- Product grid (responsive)
- Category filters
- Product cards dengan rating
- Add to cart button
- Empty state handling

## 🚀 Usage Examples

### Creating a New Page

```vue
<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AppLayout from '~/layouts/app.vue'
</script>

<template>
  <AppLayout>
    <Head title="My Page" />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        My Page Title
      </h1>
      
      <!-- Your content here -->
    </div>
  </AppLayout>
</template>
```

### Using Tailwind Utilities

```vue
<!-- Buttons -->
<button class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
  Primary Button
</button>

<!-- Cards -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
  Card content
</div>

<!-- Input -->
<input 
  type="text" 
  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
  placeholder="Enter text"
/>
```

## 🎨 Color Palette

```
Primary (Green):
- 50:  #f0fdf4 (Lightest)
- 100: #dcfce7
- 500: #22c55e (Base)
- 600: #16a34a (Hover)
- 900: #14532d (Darkest)

Gray:
- 50:  #f9fafb
- 100: #f3f4f6
- 500: #6b7280
- 800: #1f2937
- 900: #111827
```

## 📱 Responsive Breakpoints

```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
2xl: 1536px (Extra large)
```

## 🎯 Common Patterns

### Grid Layouts
```vue
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
```

### Flex Layouts
```vue
<div class="flex items-center justify-between">
  <!-- Content -->
</div>
```

### Dark Mode Classes
```vue
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Adapts to dark mode
</div>
```

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production
npm start
```

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Nuxt UI**: https://ui.nuxt.com
- **Inertia.js**: https://inertiajs.com
- **AdonisJS**: https://adonisjs.com

## ✨ Next Steps

1. **Add Authentication UI**
   - Login/Register forms
   - User profile page
   - Dashboard

2. **Create Admin Panel**
   - Seller management
   - Product management
   - Order management

3. **Implement Shopping Cart**
   - Cart sidebar/modal
   - Checkout flow
   - Order confirmation

4. **Add Real Components**
   - Product detail modal
   - Image gallery
   - Reviews system
   - Search functionality

## 💡 Tips

1. **Use Composition API** - Semua component sudah menggunakan `<script setup>`
2. **Leverage Tailwind** - Gunakan utility classes instead of custom CSS
3. **Dark Mode First** - Selalu tambahkan `dark:` variants
4. **Mobile First** - Design untuk mobile, tambahkan `sm:`, `lg:` untuk larger screens
5. **Reusable Components** - Buat component untuk pattern yang sering digunakan

## 🎉 Ready to Use!

UI framework sudah terintegrasi sempurna dengan:
- ✅ Tailwind CSS configured
- ✅ Dark mode support
- ✅ Responsive layouts
- ✅ Modern components
- ✅ Icon support ready

Mulai develop dengan confidence! 🚀

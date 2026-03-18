<script setup lang="ts">
import { useData } from 'vuepress/client'

interface AIModel {
  name: string
  url: string
  logo: string
  border?: boolean
  padding?: number
}

const { list } = defineProps<{
  list: AIModel[]
}>()

const { site } = useData()

// 处理 logo路径，自动添加 base 路径
const getLogoPath = (logo: string) => {
  // 如果是外部链接（http://或 https://开头），直接返回
  if (logo.startsWith('http://') || logo.startsWith('https://')) {
    return logo
  }
  // 如果是绝对路径（/开头），去掉开头的 / 后拼接 base
  if (logo.startsWith('/')) {
    return site.value.base + logo.slice(1)
  }
  // 相对路径直接拼接 base
  return site.value.base + logo
}
// 此方式可以删除,因为很笨重
// 处理图片加载错误，使用默认 logo
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // 如果当前不是默认 logo，才替换为默认 logo
  if (!img.src.includes('rui-plume')) {
    img.src = '/rui-plume/images/logo.png'
  }else {
    img.src = '/images/logo.png'
  }
}
</script>

<template>
  <ul class="ai-models">
    <li v-for="item in list" :key="item.url" class="ai-model">
      <a :href="item.url" target="_blank" rel="noopener noreferrer" class="ai-model-link no-icon">
        <span
          class="logo" :class="{ border: item.border }" :style="{
            padding: item.padding ? `${item.padding}px` : undefined,
          }"
        >
          <img
            class="no-view"
            :src="getLogoPath(item.logo)"
            :alt="`${item.name} logo`"
            loading="lazy"
            @error="handleImageError"
          >
        </span>
        <span>{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.ai-models {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 24px 14px;
  list-style: none;
  padding: 0;
  margin-top: 48px;
}

.ai-model {
  width: 90px;
  height: 100%;
  text-align: center;
  margin: auto;
}

@media (min-width: 640px) {
  .ai-models {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  .ai-model {
    width: 100px;
  }
}

.ai-model-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
}

.ai-model-link .logo {
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-model-link .logo.border {
  border: 1px solid var(--vp-c-divider);
}

.ai-model-link .logo img {
  width: 100%;
}
</style>

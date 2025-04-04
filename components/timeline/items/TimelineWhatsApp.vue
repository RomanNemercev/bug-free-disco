<template>
  <TimelineItem>
    <template #content>
      <div class="relative mr-15px">
        <div class="absolute right-0 top-[-5px]">
          <svg-icon name="wh-border20" width="20" height="20" />
        </div>
        <UiAvatar size="candidate">
          <UiAvatarImage :src="message.avatar" :alt="message.author" />
          <UiAvatarFallback>{{ message.initials }}</UiAvatarFallback>
        </UiAvatar>
      </div>
      <ul>
        <li>
          <p class="text-13px font-normal text-slate-custom mb-2">
            <span>{{ message.time }}</span>
            {{ message.author }}
          </p>
          <p class="text-sm font-normal text-space truncate">
            {{ message.content }}
          </p>
        </li>
      </ul>
    </template>
  </TimelineItem>
</template>

<script setup>
  import TimelineItem from '../TimelineItem.vue'

  const props = defineProps({
    message: {
      type: Object,
      required: true,
      default: () => ({
        time: '',
        author: '',
        content: '',
        avatar: '',
        initials: '',
      }),
    },
  })
</script>

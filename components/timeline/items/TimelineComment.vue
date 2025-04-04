<template>
  <TimelineItem>
    <template #content>
      <div class="mr-15px">
        <UiAvatar size="chat">
          <UiAvatarImage :src="comment.avatar" :alt="comment.author" />
          <UiAvatarFallback>{{ comment.initials }}</UiAvatarFallback>
        </UiAvatar>
      </div>
      <div>
        <ul class="mb-15px">
          <li>
            <p class="text-13px font-normal text-slate-custom mb-1">
              <span>{{ comment.time }}</span>
              {{ comment.author }} комментирует
            </p>
            <p class="text-sm font-normal text-space truncate">
              {{ comment.content }}
            </p>
          </li>
        </ul>
        <BtnIconText
          icon="resend"
          text="Ответить в ветке"
          @click="handleReply"
        />
      </div>
    </template>
  </TimelineItem>
</template>

<script setup>
  import TimelineItem from '../TimelineItem.vue'
  import BtnIconText from '@/components/custom/BtnIconText.vue'

  const props = defineProps({
    comment: {
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

  const emit = defineEmits(['reply'])

  const handleReply = () => {
    emit('reply', props.comment)
  }
</script>

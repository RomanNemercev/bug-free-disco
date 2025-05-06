import { cva, type VariantProps } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export const avatarVariant = cva(
  'inline-flex items-center justify-center font-normal text-dodger select-none shrink-0 bg-zumthor overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 text-xs',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-32 w-32 text-5xl',
        custom: 'h-10 w-10 text-[13px] font-medium border-solid border border-borderAvatar',
        fourtyfive: 'h-45px w-45px text-15px font-medium font-medium border-solid border border-borderAvatar',
        user: 'h-[124px] w-[124px] text-5xl',
        candidate: 'w-50px h-50px bg-athens-gray text-slate-custom',
        chat: 'w-50px h-50px bg-zumthor text-dodger border border-solid border-borderAvatar',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>

import { defineStore } from 'pinia'

interface ChatMessage {
    format: string
    message: string
    attachments: File[]
    recipient: string
    timestamp: Date
}

interface ChatState {
    messages: ChatMessage[]
    currentFormat: string
    lastRecipient: string
}

export const useChatStore = defineStore('chat', {
    state: (): ChatState => ({
        messages: [],
        currentFormat: 'chat',
        lastRecipient: ''
    }),

    actions: {
        addMessage(message: Omit<ChatMessage, 'timestamp'>) {
            this.messages.push({
                ...message,
                timestamp: new Date()
            })
            this.currentFormat = message.format
            this.lastRecipient = message.recipient
        },

        setCurrentFormat(format: string) {
            this.currentFormat = format
        }
    },

    getters: {
        getMessagesByRecipient: (state) => {
            return (recipient: string) => state.messages.filter(m => m.recipient === recipient)
        }
    }
}) 
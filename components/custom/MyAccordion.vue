<template>
    <div class="overflow-hidden">
        <div @click="toggle" class="cursor-pointer flex items-center">
            <svg-icon :name="isOpen ? 'accordion-minus' : 'accordion-plus'" width="20" height="20" class="mr-5px" />
            <span class="text-dodger text-sm font-medium select-none">{{ isOpen ? `Скрыть ${title}` : `Показать
                ${title}` }}</span>
        </div>
        <div ref="content" :style="contentStyles" class="transition-all duration-300 ease-in-out overflow-hidden">
            <div class="pt-25px pb-15px">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyAccordion",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isOpen: false,
            contentHeight: 0,
        };
    },
    computed: {
        contentStyles() {
            return {
                maxHeight: this.isOpen ? `${this.contentHeight}px` : "0px",
            };
        },
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
            this.updateContentHeight();
        },
        updateContentHeight() {
            this.$nextTick(() => {
                const content = this.$refs.content.querySelector("div");
                this.contentHeight = content ? content.scrollHeight : 0;
            });
        },
    },
};
</script>

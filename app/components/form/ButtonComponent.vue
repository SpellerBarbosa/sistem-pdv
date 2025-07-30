<script setup lang="ts">
const props = defineProps<{
    btn_name: string;
    btn_type: 'button'|'reset'|'submit';
}>()

const emit = defineEmits<{
    (e: 'click', event:MouseEvent): void
}>()

function emitClick(event: MouseEvent){
    emit('click', event)
    return
}
</script>
<template>
    <button :type="btn_type" @click="emitClick" class="w-[120px] h-[50px]  bg-green-800 text-white tracking-[1.5px] font-semibold uppercase rounded-xl cursor-pointer">
        {{ btn_name }}
    </button>
</template>
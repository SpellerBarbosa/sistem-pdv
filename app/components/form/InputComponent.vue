<script setup lang="ts">
const props = defineProps<{
  link: string;
  input_name: string;
  input_type: "text" | "password" | "reset";
  place: string;
  modelValue: string;
  icon?:string
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  return;
}
</script>
<template>
  <label :for="link" class="w-[85%] h-[50px] flex">
    <span class="w-[50px] h-[50px] bg-gray-700 flex items-center justify-center uppercase font-semibold tracking-[1px] rounded-l-lg">
      {{ input_name }}
      <img :src="icon" alt="icone" class="w-[40px]">
    </span>
    <input
      :type="input_type"
      :id="link"
      :placeholder="place"
      :value="modelValue"
      @input="updateValue"
      class="w-[calc(100%-50px)] border-2 rounded-r-lg text-center placeholder:uppercase placeholder:tracking-[1.5px] placeholder:font-semibold outline-hidden"
    />
  </label>
</template>

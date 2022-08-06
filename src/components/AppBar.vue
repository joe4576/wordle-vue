<script lang="ts" setup>
import ResetButton from "@/components/ResetButton.vue";

defineEmits<{
  (e: "reset"): void;
}>();
</script>

<template>
  <header>
    <div class="header-content">
      <h1>Vue Worldle Clone</h1>
      <reset-button @click="$emit('reset')" />
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100vw;
  background-color: var(--primary-colour);
  box-shadow: 0 5px 10px #bbb;
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px 0 18px;
}

h1 {
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

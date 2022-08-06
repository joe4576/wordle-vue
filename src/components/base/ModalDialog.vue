<script lang="ts" setup>
import { computed, withDefaults } from "vue";

interface DialogProps {
  title: string;
  modelValue: boolean;
}

const props = withDefaults(defineProps<DialogProps>(), {
  title: "Dialog",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
}>();

const dialogIsOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

document.addEventListener("click", (ev) => {
  // clicking outside of the dialog
  if (ev.target === document.getElementById("modal")) {
    dialogIsOpen.value = false;
  }
});

const confirmFunc = () => {
  emit("confirm");
  dialogIsOpen.value = false;
};
</script>

<template>
  <div v-if="dialogIsOpen" id="modal">
    <div id="content">
      <div id="header">
        <h1>{{ title }}</h1>
      </div>
      <div id="body"><slot /></div>
      <div id="footer">
        <button class="button-text" @click="dialogIsOpen = false">CLOSE</button>
        <slot name="actions" :confirm="confirmFunc" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#content {
  background-color: #fefefe;
  padding: 20px;
  width: 50%;
  max-width: 450px;
  border-radius: 7px;
  box-shadow: 0 0 50px 1px #888;
  padding: 15px 30px;
  animation: fadeIn 0.2s;
}

#header {
  width: 100%;
}

#body {
  display: flex;
}

#footer {
  margin: 1rem 0 0.5rem 0;
  display: flex;
  justify-content: end;
}

h1 {
  font-size: 1.25rem;
}
</style>

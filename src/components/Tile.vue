<script lang="ts" setup>
import type { Tile } from "@/tile";

defineProps<{
  tile: Tile;
}>();
</script>

<template>
  <div
    :class="{
      tile: true,
      correct: tile.state === 'correct',
      incorrect: tile.state === 'incorrect',
    }"
  >
    {{ tile.letter ?? "" }}
  </div>
</template>

<style scoped>
.tile {
  border: 1px solid black;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.correct {
  background-color: #68e88a;
}

.incorrect {
  background-color: #bbbfbc;
}
</style>

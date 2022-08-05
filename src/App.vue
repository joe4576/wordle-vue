<script setup lang="ts">
import Board from "@/components/Board.vue";
import { Tile } from "@/tile";
import { type ComputedRef, reactive, computed } from "vue";

interface GameState {
  word: string;
  wordLength: number;
  numberOfRows: number;
  board: ComputedRef<Tile[][]>;
}

const state = reactive<GameState>({
  word: "hello",
  wordLength: 5,
  numberOfRows: 6,
  board: computed(() => {
    const board: Tile[][] = [];

    for (let i = 0; i < state.numberOfRows; i++) {
      board[i] = [];
      for (let j = 0; j < state.wordLength; j++) {
        board[i][j] = new Tile();
      }
    }

    return board;
  }),
});
</script>

<template>
  <main>
    <div class="main-container">
      <board :tiles="state.board" />
    </div>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  max-width: 1200px;
}
</style>

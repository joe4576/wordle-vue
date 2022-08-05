<script setup lang="ts">
import Board from "@/components/Board.vue";
import { Tile } from "@/tile";
import { deepArrayClone } from "@/utils";
import { reactive, watch } from "vue";

interface GameState {
  word: string;
  numberOfRows: number;
  currentRowIndex: number;
  board: Tile[][];
}

const state = reactive<GameState>({
  word: "hello",
  numberOfRows: 6,
  currentRowIndex: 0,
  board: [],
});

// reset board when any state parameters change
watch(
  () => [state.word, state.numberOfRows],
  () => {
    const board: Tile[][] = [];

    for (let i = 0; i < state.numberOfRows; i++) {
      board[i] = [];
      for (let j = 0; j < state.word.length; j++) {
        board[i][j] = new Tile();
      }
    }

    state.board = board;
    state.currentRowIndex = 0;
  },
  { immediate: true }
);

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const lettersGuessed =
    state.board[state.currentRowIndex]?.filter(
      ({ letter }) => letter !== undefined
    ).length ?? 0;

  if (key === "enter" && lettersGuessed === state.word.length) {
    let correctGuesses = 0;

    state.board[state.currentRowIndex]?.forEach((tile, idx) => {
      if (tile.letter === state.word[idx]) {
        tile.state = "correct";
        correctGuesses++;
        return;
      }
      tile.state = "incorrect";
    });

    if (correctGuesses === state.word.length) {
      // won
    }

    state.currentRowIndex++;
    return;
  }

  if (key === "backspace" && lettersGuessed > 0) {
    // note: board is a 2d array, so a shallow clone maintains
    // reference to nested arrays
    const lastTileWithGuess = deepArrayClone(state.board)
      [state.currentRowIndex]?.reverse()
      .find(({ letter }) => letter !== undefined);

    if (lastTileWithGuess) {
      lastTileWithGuess.clearLetter();
    }

    return;
  }

  const regex = new RegExp(/^[a-zA-Z]*$/);

  if (
    regex.test(key) &&
    key.length === 1 &&
    lettersGuessed !== state.word.length
  ) {
    const nextTile = state.board[state.currentRowIndex]?.find(
      ({ letter }) => letter === undefined
    );
    if (nextTile) {
      nextTile.letter = key;
    }
  }
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

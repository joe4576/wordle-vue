<script lang="ts" setup>
import type { Tile as TileType } from "@/tile";
import { h, type VNode } from "vue";
import Tile from "@/components/Tile.vue";
import "@/styles/board.css";

const props = defineProps<{
  tiles: TileType[][];
}>();

const generateRows = (): VNode[][] => {
  const rows: VNode[][] = [];

  for (let i = 0; i < props.tiles.length; i++) {
    rows.push(
      props.tiles[i].map((tile) =>
        h(Tile, {
          tile,
        })
      )
    );
  }

  return rows;
};

const renderBoard = (): VNode =>
  h(
    "div",
    { class: "board" },
    generateRows().map((row) => h("div", { class: "row" }, [...row]))
  );
</script>

<template>
  <render-board />
</template>

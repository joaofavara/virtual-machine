<template>
  <div class="main">
    <div class="menu">
      <button class="FILE">FILE</button>
      <button class="debug">DEBUG</button>
      <button class="run">RUN</button>
    </div>

    <div class="program">
      PROGRAMA
    </div>
    <div class="data">
      DADOS
    </div>
    <div class="input">
      ENTRADA
    </div>
    <div class="output">
      SAIDA
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-page',
};
</script>

<style lang="scss">
  .main {
    height: 90vh;
    display: grid;
    grid-gap: 20px;
    grid-template-rows: auto 1fr 1fr 1fr;
    grid-template-areas:
    "menu       menu        menu"
    "program    program     data"
    "program    program     data"
    "input      output      data";

    .program {
      grid-area: program;
      border: 1px solid red;
    }

    .input {
      grid-area: input;
      border: 1px solid blue;
    }

    .data {
      grid-area: data;
      border: 1px solid green;
    }

    .output {
      grid-area: output;
      border: 1px solid purple;
    }

    .menu {
      grid-area: menu;
      border: 1px solid yellow;
    }
  }
</style>

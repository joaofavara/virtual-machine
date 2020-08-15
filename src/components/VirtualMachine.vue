<template>
  <div class='main'>
    <div class='menu'>
      <input type="file" @change="previewFiles" class='FILE' />
      <button class='debug'>DEBUG</button>
      <button class='run'>RUN</button>
    </div>

    <div class='program'>
      <p class='title'>Program Stack</p>
      <Table :data='gridData' :columns='programColumns' />
    </div>
    <div class='data'>
      <p class='title'>Stack Content</p>
      <Table :data='gridData' :columns='dataColumns' />
    </div>
    <div class='input'>
      <p class='title'>Input Area</p>
      <input v-model="inputData" />
      <button @click="addData">Go</button>
      {{ inputData }}
      {{ allInputedData }}
    </div>
    <div class='output'>
      <p class='title'>Output Area</p>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue';
import Mixin from '../mixin/mixin';

export default {
  name: 'VirtualMachine',
  mixins: [Mixin],
  components: {
    Table,
  },
  data() {
    return {
      inputFile: '',
      inputData: '',
      allInputedData: [],
      programColumns: [
        'Posição',
        'Instrução',
        'Atributo #1',
        'Atributo #2',
        'Comentário',
      ],
      dataColumns: ['Endereço (S)', 'Valor'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 },
      ],
    };
  },
  methods: {
    addData() {
      this.allInputedData.push(this.inputData);
      this.inputData = '';
    },
  },
};
</script>

<style lang='scss'>
body {
  font-family: Arial, Helvetica, sans-serif;

  .main {
    width: fit-content;
    height: 90vh;
    display: grid;
    grid-gap: 20px;
    grid-template-rows: auto 1fr 1fr 1fr;
    grid-template-areas:
      'menu       menu        menu'
      'program    program     data'
      'program    program     data'
      'input      output      data';

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

    .title {
      width: fit-content;
      padding: 5px;
      margin: 10px
    }
  }
}
</style>

<template>
  <div class='main'>
    <div class='menu'>
      <button class='debug'>DEBUG</button>
      <button class='run'>RUN</button>
      <input type="file" @change="previewFiles" class='file'>
    </div>

    <div class='program'>
      <p class='title'>Program Stack</p>
      <div class="content">
        <Table :data='gridData' :columns='programColumns' />
      </div>
    </div>
    <div class='data'>
      <p class='title'>Stack Content</p>
      <div class="content">
        <Table :data='gridData' :columns='dataColumns' />
      </div>
    </div>
    <div class='input'>
      <p class='title'>Input Area</p>
      <div class="content">
        <input v-model="inputData" />
        <button @click="addData">Go</button>
        <div class="show-data">
          <span v-for="data in allInputedData" :key="data">{{ data }}</span>
        </div>
      </div>
    </div>
    <div class='output'>
      <p class='title'>Output Area</p>
      <div class="content">
        <div class="show-data">
          <!-- Put the output data -->
        </div>
      </div>
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
$gray: #D3D3D3;
$blue: #E0FFFF;
$red: #FFE4E1;
$green: #F0FFF0;

body {
  font-family: Arial, Helvetica, sans-serif;

  .main {
    width: fit-content;
    height: 95vh;
    display: grid;
    grid-gap: 20px;
    grid-template-rows: auto 1fr 1fr 1fr;
    grid-template-areas:
      'menu       .           .'
      'program    program     data'
      'program    program     data'
      'input      output      data';

    .program {
      grid-area: program;
    }

    .input {
      grid-area: input;

      .show-data {
        margin-top: 10px;
        background: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 125px;
        overflow: auto;
      }
    }

    .data {
      grid-area: data;
    }

    .output {
      grid-area: output;

      .show-data {
        margin-top: 10px;
        background: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 145px;
        overflow: auto;
      }
    }

    .menu {
      grid-area: menu;
      display: flex;
      justify-content: space-evenly;

      input[type="file"]::-webkit-file-upload-button {
        padding: 5px;
        border-radius: 8px;
        background-color: $green;
      }

      button {
        padding: 5px;
        border-radius: 8px;
        &.run {
          background-color: $blue;
        }

        &.debug {
          background-color: $red;
        }
      }
    }

    .title {
      background-color: $gray;
      border-radius: 8px 8px 0 0;
      width: fit-content;
      padding: 8px;
      margin: 0;
    }

    .content {
      background-color: $gray;
      padding: 10px;
    }
  }
}
</style>

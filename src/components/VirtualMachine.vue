<template>
  <div class='main'>
    <div class='menu'>
      <button class='debug'>DEBUG</button>
      <button class='run' @click="execute(false)">RUN</button>
      <input type="file" @change="previewFiles" class='file'>
    </div>
    <div class='program'>
      <p class='title'>Program Stack</p>
      <div class="content">
        <Table
          :data='programData'
          :columns='programColumns'
          :isSelectedRow='isSelectedRow'
          :executionRow='executionRow'
          @selected-row='changeToSelectedRow'
        />
      </div>
    </div>
    <div class='data'>
      <p class='title'>Stack Content</p>
      <div class="content">
        <TableStack :data='stackData' :columns='stackColumns' />
      </div>
    </div>
    <div class='input'>
      <p class='title'>Input Area</p>
      <div class="content">
        <input v-model="inputData" />
        <button @click="execute(true)">Go</button>
        <div class="show-data">
          <span v-for="data in allInputedData" :key="data">{{ data }}</span>
        </div>
      </div>
    </div>
    <div class='output'>
      <p class='title'>Output Area</p>
      <div class="content">
        <div class="show-data">
          <span v-for="data in allOutputedData" :key="data">{{ data }}</span>
        </div>
      </div>
    </div>
    <div class='debbug'>
      <p class='title'>
        Break Points
        <button>
          <img type="image/svg+xml" src="../assets/play_circle_outline-24px.svg" />
        </button>
        <button>
          <img type="image/svg+xml" src="../assets/redo-24px.svg" />
        </button>
        <button>
          <img type="image/svg+xml" src="../assets/not_interested-24px.svg" />
        </button>
      </p>
      <div class="content">
        <div class="show-data">
          <span v-for="(data, index) in breakpoints" :key="index">
            {{ data }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue';
import TableStack from './TableStack.vue';
import Mixin from '../mixin/mixin';

export default {
  name: 'VirtualMachine',
  mixins: [Mixin],
  components: {
    Table,
    TableStack,
  },
  data() {
    return {
      inputFile: '',
      inputData: '',
      allInputedData: [],
      allOutputedData: [],
      programColumns: [
        'posicao',
        'instrucao',
        'atributo1',
        'atributo2',
        'comentario',
      ],
    };
  },
  computed: {
    breakpoints() {
      return this.isSelectedRow.map((row, index) => (row ? this.programData[index].posicao : null));
    },
  },
  methods: {
    addInputedData() {
      this.allInputedData.push(this.inputData);
      this.inputData = '';
    },
    addOutputedData(data) {
      this.allOutputedData.push(data);
    },
    jump(label) {
      this.programData.forEach((line) => {
        if (label === line.instrucao) {
          this.i = this.programData.indexOf(line);
        }
      });
    },
    changeToSelectedRow(index) {
      console.log('index: ', index);
      this.isSelectedRow[index] = !this.isSelectedRow[index];
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
      'menu       .         .        .'
      'program    program   program        data'
      'program    program   program        data'
      'input      output    debbug   data';

    .program {
      grid-area: program;
      .content {
        height: 220px;
        overflow: auto;
      }
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

    .debbug {
      grid-area: debbug;

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

    .title {
      background-color: $gray;
      border-radius: 8px 8px 0 0;
      width: fit-content;
      padding: 8px;
      margin: 0;
    }

    .content {
      border: $gray solid 10px;
      border-radius: 0 8px 8px 8px;
    }
  }

  // @media (max-width: 600px) {
  //   .main {
  //    grid-template-areas:
  //     'menu       .'
  //     'program    program'
  //     'program    program'
  //     'input      output'
  //     'debbug     data';
  //   }
  // }
}
</style>

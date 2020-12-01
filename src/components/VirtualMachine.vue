/* eslint-disable max-len */
<template>
  <div class='main'>
    <Modal ref="modal"/>
    <div class='menu'>
      <button class='debug' @click="setupExecutionData('DEBUG')" :disabled="isDisabled">
        DEBUG
      </button>
      <button class='run' @click="setupExecutionData('RUN')" :disabled="isDisabled">
        RUN
      </button>
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
      <p :class="{ isInput: isInput }" class='title'>
        Input Area
        <input v-model="inputData" placeholder="Entre com um valor"/>
        <button @click="execute(true)" :disabled="!isInput">Go</button>
      </p>
      <div :class="{ isInput: isInput }" class="content">
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
        <button @click="setupExecutionData('DEBUG')" :disabled="!isDebuging">
          <img type="image/svg+xml" src="../assets/play_circle_outline-24px.svg" />
        </button>
        <button @click="executeLine()" :disabled="!isDebuging">
          <img type="image/svg+xml" src="../assets/redo-24px.svg" />
        </button>
        <button @click="setupExecutionData('RUN')" :disabled="!isDebuging">
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
import Modal from './Modal.vue';
import Mixin from '../mixin/mixin';

export default {
  name: 'VirtualMachine',
  mixins: [Mixin],
  components: {
    Table,
    TableStack,
    Modal,
  },
  data() {
    return {
      lastRow: -1,
      isInput: false,
      inputFile: '',
      inputData: '',
      allInputedData: [],
      allOutputedData: [],
      programColumns: [
        'Posicao',
        'Instrucao',
        'Atributo1',
        'Atributo2',
        'Comentario',
      ],
      executeData: {
        state: '',
        nextLine: false,
      },
    };
  },
  computed: {
    breakpoints() {
      return this.isSelectedRow.map((row, index) => (row ? this.programData[index].Posicao : null));
    },
    isDebuging() {
      return this.executeData.state === 'DEBUG';
    },
    isDisabled() {
      return this.executeData.state !== '';
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
    jumpTo(label) {
      this.programData.forEach((line) => {
        if (label === line.Instrucao) {
          this.i = this.programData.indexOf(line);
        }
      });
    },
    changeToSelectedRow(index) {
      // console.log('index: ', index);
      this.isSelectedRow[index] = !this.isSelectedRow[index];
      this.programData[index].breakpoint = !this.programData[index].breakpoint;
    },
    setupExecutionData(typeExecution) {
      this.executeData.state = typeExecution;
      this.execute(false);
    },
    executeLine() {
      if (this.i !== this.lastRow) {
        this.executionRow[this.lastRow] = false;
        this.lastRow = this.i;
      }
      this.executionRow[this.i] = true;
      switch (this.programData[this.i].Instrucao) {
        case 'LDC':
          this.s += 1;
          this.stackData[this.s] = parseInt(this.programData[this.i].Atributo1, 10);
          this.i += 1;
          break;

        case 'LDV':
          this.s += 1;
          this.stackData[this.s] = this.stackData[parseInt(this.programData[this.i].Atributo1, 10)];
          this.i += 1;
          break;

        case 'ADD':
          // eslint-disable-next-line max-len
          this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) + parseInt(this.stackData[this.s], 10);
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'SUB':
          // eslint-disable-next-line max-len
          this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) - parseInt(this.stackData[this.s], 10);
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'MULT':
          // eslint-disable-next-line max-len
          this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) * parseInt(this.stackData[this.s], 10);
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'DIVI':
          // eslint-disable-next-line max-len
          this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) / parseInt(this.stackData[this.s], 10);
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'INV':
          this.stackData[this.s] *= (-1);
          this.i += 1;
          break;

        case 'AND':
          if (this.stackData[this.s - 1] === 1 && this.stackData[this.s] === 1) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'OR':
          if (this.stackData[this.s - 1] === 1 || this.stackData[this.s] === 1) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'NEG':
          this.stackData[this.s] = 1 - this.stackData[this.s];
          this.i += 1;
          break;

        case 'CME':
          if (this.stackData[this.s - 1] < this.stackData[this.s]) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'CMA':
          if (this.stackData[this.s - 1] > this.stackData[this.s]) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'CEQ':
          if (this.stackData[this.s - 1] === this.stackData[this.s]) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'CDIF':
          if (this.stackData[this.s - 1] !== this.stackData[this.s]) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'CMEQ':
          if (this.stackData[this.s - 1] <= this.stackData[this.s]) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'CMAQ':
          if (this.stackData[this.s - 1] >= this.stackData[this.s]) {
            this.stackData[this.s - 1] = 1;
          } else {
            this.stackData[this.s - 1] = 0;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'START':
          this.s = -1;
          this.i += 1;
          break;

        case 'HLT':
          this.loop = false;
          this.$refs.modal.showModal();
          break;

        case 'STR':
          this.stackData[parseInt(this.programData[this.i].Atributo1, 10)] = this.stackData[this.s];
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'JMP': {
          const label = this.programData[this.i].Atributo1;
          this.jumpTo(label);
          break;
        }
        case 'JMPF':
          if (this.stackData[this.s] === 0) {
            const label = this.programData[this.i].Atributo1;
            this.jumpTo(label);
          } else {
            this.i += 1;
          }
          this.s -= 1;
          this.stackData.length -= 1;
          break;

        case 'RD':
          this.s += 1;
          this.isInput = true;
          this.loop = false;
          this.i += 1;
          break;

        case 'PRN':
          this.addOutputedData(this.stackData[this.s]);
          this.s -= 1;
          this.stackData.length -= 1;
          this.i += 1;
          break;

        case 'ALLOC': {
          const m = parseInt(this.programData[this.i].Atributo1, 10);
          const n = parseInt(this.programData[this.i].Atributo2, 10);

          for (let K = 0; K < n; K += 1) {
            this.s += 1;
            this.stackData[this.s] = this.stackData[m + K] || 0;
          }
          this.i += 1;
          break;
        }

        case 'DALLOC': {
          const m = parseInt(this.programData[this.i].Atributo1, 10);
          const n = parseInt(this.programData[this.i].Atributo2, 10);

          for (let K = n - 1; K >= 0; K -= 1) {
            this.stackData[m + K] = this.stackData[this.s];
            this.s -= 1;
            this.stackData.length -= 1;
          }
          this.i += 1;
          break;
        }

        case 'CALL': {
          const label = this.programData[this.i].Atributo1;
          this.s += 1;
          this.stackData[this.s] = this.i + 1;
          this.jumpTo(label);
          break;
        }
        case 'RETURN':
          this.i = this.stackData[this.s];
          this.s -= 1;
          this.stackData.length -= 1;
          break;

        default:
          this.i += 1;
          break;
      }
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
      'input      output    debbug         data';

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
      background-color: white;
      height: calc(100% - 69px);
    }

    .program {
      grid-area: program;
      .content {
        height: 100%;
        overflow: auto;
      }
    }

    .input {
      grid-area: input;
      margin-top: 50px;

      .isInput {
        background: cyan;
        border-color: cyan;
      }

     .content {
        height: calc(100% - 59px);

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

    }

    .data {
      grid-area: data;

      .content {
        height: calc(100% - 55px);
        overflow: auto;
      }
    }

    .output {
      grid-area: output;
      margin-top: 50px;

      .content {
        height: calc(100% - 55px);

        .show-data {
          background: white;
          width: 100%;
          display: flex;
          flex-direction: column;
          // height: 155px;
          overflow: auto;
        }
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
      margin-top: 50px;

      .content {
        height: calc(100% - 70px);

        .show-data {
          background: white;
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }
      }
    }
  }
}
</style>

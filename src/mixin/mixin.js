/* eslint-disable max-len */
// eslint-disable-next-line max-len

// import { forEach } from 'core-js/fn/array';

const mixin = {
  data() {
    return {
      isSelectedRow: [],
      executionRow: [],
      commands: null,
      i: 0, /* Indice da fila de comandos */
      s: 0, /* Indice da pilha de dados */
      programColumns: [
        'posicao',
        'instrucao',
        'atributo1',
        'atributo2',
        'comentario',
      ],
      programData: [],
      stackData: [], /* Pilha de dados */
      stackColumns: [
        'endereco',
        'valor',
      ],
    };
  },
  methods: {
    setUpDefaultArray(commands) {
      this.isSelectedRow = commands.map(() => false);
      this.executionRow = commands.map(() => false);
    },
    parseCommand(command) {
      const commandSplited = command.split(' ');
      const instrucao = commandSplited[0].trim() || '';
      const atributos = commandSplited[1] ? commandSplited[1].trim() : '';
      const [atributo1, atributo2] = atributos ? atributos.split(',') : ['', ''];
      return {
        instrucao,
        atributo1,
        atributo2,
        comentario: '',
      };
    },
    buildProgramData() {
      let countPosicao = 1;
      this.commands.forEach((command) => {
        this.programData.push(
          {
            posicao: countPosicao,
            ...this.parseCommand(command),
          },
        );

        countPosicao += 1;
      });
    },
    async previewFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      await reader.readAsText(file);

      reader.onloadend = async () => {
        this.commands = await reader.result.split('\n');
        this.setUpDefaultArray(this.commands);
        this.buildProgramData();
      };
    },
    execute(isInput) {
      let loop = true;

      if (isInput && this.inputData !== undefined) {
        this.stackData[this.s] = parseInt(this.inputData, 10);
        this.addInputedData();
      }

      while (loop && this.i < this.programData.length) {
        console.log(`-- Linha ${this.i + 1} ---`);
        console.log(`Ponteiro: ${this.s}`);
        console.log(`Instrucao: ${this.programData[this.i].instrucao}`);
        console.log(`Atributo1: ${this.programData[this.i].atributo1}`);
        console.log(`Atributo2: ${this.programData[this.i].atributo2}`);
        console.log(`executionRow: ${this.executionRow[this.i]}`);
        console.log(this.stackData.flat());
        console.log(`-- Linha ${this.i + 1} ---\n\n`);

        this.executionRow[this.i] = true;

        switch (this.programData[this.i].instrucao) {
          case 'LDC':
            this.s += 1;
            this.stackData[this.s] = parseInt(this.programData[this.i].atributo1, 10);
            this.i += 1;
            break;

          case 'LDV':
            this.s += 1;
            this.stackData[this.s] = this.stackData[parseInt(this.programData[this.i].atributo1, 10)];
            this.i += 1;
            break;

          case 'ADD':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) + parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            this.stackData.length -= 1;
            this.i += 1;
            break;

          case 'SUB':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) - parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            this.stackData.length -= 1;
            this.i += 1;
            break;

          case 'MULT':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) * parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            this.stackData.length -= 1;
            this.i += 1;
            break;

          case 'DIVI':
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
            loop = false;
            break;

          case 'STR':
            this.stackData[parseInt(this.programData[this.i].atributo1, 10)] = this.stackData[this.s];
            this.s -= 1;
            this.stackData.length -= 1;
            this.i += 1;
            break;

          case 'JMP': {
            const label = this.programData[this.i].atributo1;
            this.jump(label);
            break;
          }
          case 'JMPF':
            if (this.stackData[this.s] === 0) {
              const label = this.programData[this.i].atributo1;
              this.jump(label);
            } else {
              this.i += 1;
            }
            this.s -= 1;
            this.stackData.length -= 1;
            break;

          case 'RD':
            this.s += 1;
            loop = false;
            this.i += 1;
            break;

          case 'PRN':
            this.addOutputedData(this.stackData[this.s]);
            this.s -= 1;
            this.stackData.length -= 1;
            this.i += 1;
            break;

          case 'ALLOC': {
            const m = parseInt(this.programData[this.i].atributo1, 10);
            const n = parseInt(this.programData[this.i].atributo2, 10);

            for (let K = 0; K < n; K += 1) {
              this.s += 1;
              this.stackData[this.s] = this.stackData[m + K] || 0;
            }
            this.i += 1;
            break;
          }

          case 'DALLOC': {
            const m = parseInt(this.programData[this.i].atributo1, 10);
            const n = parseInt(this.programData[this.i].atributo2, 10);

            for (let K = n - 1; K >= 0; K -= 1) {
              this.stackData[m + K] = this.stackData[this.s];
              this.s -= 1;
              this.stackData.length -= 1;
            }
            this.i += 1;
            break;
          }

          case 'CALL': {
            const label = this.programData[this.i].atributo1;
            this.s += 1;
            this.stackData[this.s] = this.i + 1;
            this.jump(label);
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
      }
    },
  },
};

export default mixin;

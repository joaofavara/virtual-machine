/* eslint-disable max-len */
// eslint-disable-next-line max-len

const mixin = {
  data() {
    return {
      commands: null,
      i: 0,
      s: 0,
      programColumns: [
        'posicao',
        'instrucao',
        'atributo1',
        'atributo2',
        'comentario',
      ],
      programData: [],
      stackData: [],
      stackColumns: [
        'endereco',
        'valor',
      ],
    };
  },
  methods: {
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
        // console.log('this.commands2: ', this.commands);
        this.buildProgramData();
      };
    },
    execute(isInput) {
      // let this.stackData; /* Pilha de dados */
      // let i = 0; /* Indice da fila de comandos */
      // let s = 0; /* Indice da pilha de dados */
      let loop = true;
      // if (this.commands.split(' ').length > 2) {
      //   return -1;
      // }
      if (isInput) {
        this.stackData[this.s] = this.inputData;
        // this.allInputedData.push(this.inputData);
        // this.inputData = '';
        this.addData();
      }

      // this.programData.forEach((line) => {
      while (this.i < this.programData.length && loop) {
        switch (this.programData[this.i].instrucao) {
          case 'LDC':
            this.s += 1;
            this.stackData[this.s] = this.programData[this.i].atributo1;
            break;

          case 'LDV':
            this.s += 1;
            this.stackData[this.s] = this.stackData[this.programData[this.i].atributo1];
            break;

          case 'ADD':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) + parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            break;

          case 'SUB':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) - parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            break;

          case 'MULT':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) * parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            break;

          case 'DIVI':
            this.stackData[this.s - 1] = parseInt(this.stackData[this.s - 1], 10) / parseInt(this.stackData[this.s], 10);
            this.s -= 1;
            break;

          case 'INV':
            this.stackData[this.s] *= (-1);
            break;

          case 'AND':
            if (this.stackData[this.s - 1] === 1 && this.stackData[this.s] === 1) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'OR':
            if (this.stackData[this.s - 1] === 1 || this.stackData[this.s] === 1) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'NEG':
            this.stackData[this.s] = 1 - this.stackData[this.s];
            break;

          case 'CME':
            if (this.stackData[this.s - 1] < this.stackData[this.s]) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'CMA':
            if (this.stackData[this.s - 1] > this.stackData[this.s]) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'CEQ':
            if (this.stackData[this.s - 1] === this.stackData[this.s]) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'CDIF':
            if (this.stackData[this.s - 1] !== this.stackData[this.s]) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'CMEQ':
            if (this.stackData[this.s - 1] <= this.stackData[this.s]) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'CMAQ':
            if (this.stackData[this.s - 1] >= this.stackData[this.s]) {
              this.stackData[this.s - 1] = 1;
            } else {
              this.stackData[this.s - 1] = -1;
            }
            this.s -= 1;
            break;

          case 'START':
            this.s = -1;
            break;

          case 'HLT':
            break;

          case 'STR':
            this.stackData[this.programData[this.i].atributo1] = this.stackData[this.s];
            this.s -= 1;
            break;

          case 'JMP':
            this.i = this.programData[this.i].atributo1;
            break;

          case 'JMPF':
            if (this.stackData[this.s] === 0) {
              this.i = this.programData[this.i].atributo1;
            } else {
              this.i += 1;
            }
            break;

          case 'NULL':
            break;

          case 'RD':
            /* S = S + 1;
            this.stackData[S] = "Entrada do teclado"; */
            this.s += 1;
            loop = false;
            break;

          case 'PRN':
            /* Imprimir this.stackData[S] */
            console.log(this.stackData[this.s]);
            this.s += 1;
            break;

          case 'ALLOC': {
            const m = this.programData[this.i].atributo1;
            const n = this.programData[this.i].atributo2;

            for (let K = 0; K < n; K += 1) {
              this.s += 1;
              this.stackData[this.s] = this.stackData[m + K];
            }
            console.log(this.stackData);
            break;
          }

          case 'DALLOC': {
            const m = this.programData[this.i].atributo1;
            const n = this.programData[this.i].atributo2;

            let K = n - 1;
            for (K; K >= 0; K -= 1) {
              this.stackData[m + K] = this.stackData[this.s];
              this.s -= 1;
            }
            break;
          }

          case 'CALL':
            this.s += 1;
            this.stackData[this.s] = this.i + 1;
            this.i = this.programData[this.i].atributo1;
            break;

          case 'RETURN':
            this.i = this.stackData[this.s];
            this.s -= 1;
            break;

          default:
            break;
        }
        // });
        this.i += 1;
      }
    },
  },
};

export default mixin;

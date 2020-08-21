/* eslint-disable max-len */
// eslint-disable-next-line max-len

const mixin = {
  data() {
    return {
      commands: null,
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
        console.log('this.commands2: ', this.commands);
        this.buildProgramData();
      };
    },
    execute() {
      // let this.stackData; /* Pilha de dados */
      let i = 0; /* Indice da fila de comandos */
      let s = 0; /* Indice da pilha de dados */

      // if (this.commands.split(' ').length > 2) {
      //   return -1;
      // }

      this.programData.forEach((line) => {
        console.log(this.stackData);
        switch (line.instrucao) {
          case 'LDC':
            s += 1;
            this.stackData[s] = line.atributo1;
            break;

          case 'LDV':
            s += 1;
            this.stackData[s] = this.stackData[line.atributo1];
            break;

          case 'ADD':
            this.stackData[s - 1] = parseInt(this.stackData[s - 1], 10) + parseInt(this.stackData[s], 10);
            s -= 1;
            break;

          case 'SUB':
            this.stackData[s - 1] = parseInt(this.stackData[s - 1], 10) - parseInt(this.stackData[s], 10);
            s -= 1;
            break;

          case 'MULT':
            this.stackData[s - 1] = parseInt(this.stackData[s - 1], 10) * parseInt(this.stackData[s], 10);
            s -= 1;
            break;

          case 'DIVI':
            this.stackData[s - 1] = parseInt(this.stackData[s - 1], 10) / parseInt(this.stackData[s], 10);
            s -= 1;
            break;

          case 'INV':
            this.stackData[s] *= (-1);
            break;

          case 'AND':
            if (this.stackData[s - 1] === 1 && this.stackData[s] === 1) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'OR':
            if (this.stackData[s - 1] === 1 || this.stackData[s] === 1) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'NEG':
            this.stackData[s] = 1 - this.stackData[s];
            break;

          case 'CME':
            if (this.stackData[s - 1] < this.stackData[s]) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'CMA':
            if (this.stackData[s - 1] > this.stackData[s]) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'CEQ':
            if (this.stackData[s - 1] === this.stackData[s]) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'CDIF':
            if (this.stackData[s - 1] !== this.stackData[s]) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'CMEQ':
            if (this.stackData[s - 1] <= this.stackData[s]) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'CMAQ':
            if (this.stackData[s - 1] >= this.stackData[s]) {
              this.stackData[s - 1] = 1;
            } else {
              this.stackData[s - 1] = -1;
            }
            s -= 1;
            break;

          case 'START':
            s = -1;
            break;

          case 'HLT':
            break;

          case 'STR':
            this.stackData[line.atributo1] = this.stackData[s];
            s -= 1;
            break;

          case 'JMP':
            i = line.atributo1;
            break;

          case 'JMPF':
            if (this.stackData[s] === 0) {
              i = line.atributo1;
            } else {
              i += 1;
            }
            break;

          case 'NULL':
            break;

          case 'RD':
            /* S = S + 1;
            this.stackData[S] = "Entrada do teclado"; */
            break;

          case 'PRN':
            /* Imprimir this.stackData[S] */
            console.log(this.stackData[s]);
            s += 1;
            break;

          case 'ALLOC': {
            const m = line.atributo1;
            const n = line.atributo2;

            for (let K = 0; K < n - 1; K += 1) {
              s += 1;
              this.stackData[s] = this.stackData[m + K];
            }
            break;
          }

          case 'DALLOC': {
            const m = line.atributo1;
            const n = line.atributo2;

            let K = n - 1;
            for (K; K >= 0; K -= 1) {
              this.stackData[m + K] = this.stackData[s];
              s -= 1;
            }
            break;
          }

          case 'CALL':
            s += 1;
            this.stackData[s] = i + 1;
            i = line.atributo1;
            break;

          case 'RETURN':
            i = this.stackData[s];
            s -= 1;
            break;

          default:
            break;
        }
      });
    },
  },
};

export default mixin;

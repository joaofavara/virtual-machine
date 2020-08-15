const mixin = {
  data() {
    return {
      commands: null,
    };
  },
  methods: {
    async previewFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      await reader.readAsText(file);

      reader.onloadend = async () => {
        this.commands = await reader.result.split('\n');
      };
    },
    execute() {
      let M; /* Pilha de dados */
      let i = 0; /* Indice da fila de comandos */
      let s = 0; /* Indice da pilha de dados */

      // if (this.commands.split(' ').length > 2) {
      //   return -1;
      // }

      const operation = this.commands.split(' ')[0];
      const parameters = this.commands.split(' ')[1];

      switch (operation) {
        case 'LDC':
          s += 1;
          M[s] = parameters;
          break;

        case 'LDV':
          s += 1;
          M[s] = M[parameters];
          break;

        case 'ADD':
          M[s - 1] = M[s - 1] + M[s];
          s -= 1;
          break;

        case 'SUB':
          M[s - 1] = M[s - 1] - M[s];
          s -= 1;
          break;

        case 'MULT':
          M[s - 1] = M[s - 1] * M[s];
          s -= 1;
          break;

        case 'DIVI':
          M[s - 1] = M[s - 1] / M[s];
          s -= 1;
          break;

        case 'INV':
          M[s] *= (-1);
          break;

        case 'AND':
          if (M[s - 1] === 1 && M[s] === 1) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'OR':
          if (M[s - 1] === 1 || M[s] === 1) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'NEG':
          M[s] = 1 - M[s];
          break;

        case 'CME':
          if (M[s - 1] < M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'CMA':
          if (M[s - 1] > M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'CEQ':
          if (M[s - 1] === M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'CDIF':
          if (M[s - 1] !== M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'CMEQ':
          if (M[s - 1] <= M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'CMAQ':
          if (M[s - 1] >= M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = -1;
          }
          s -= 1;
          break;

        case 'START':
          s = -1;
          break;

        case 'HLT':
          break;

        case 'STR':
          M[parameters] = M[s];
          s -= 1;
          break;

        case 'JMP':
          i = parameters;
          break;

        case 'JMPF':
          if (M[s] === 0) {
            i = parameters;
          } else {
            i += 1;
          }
          break;

        case 'NULL':
          break;

        case 'RD':
          /* S = S + 1;
          M[S] = "Entrada do teclado"; */
          break;

        case 'PRN':
          /* Imprimir M[S] */
          console.log(M[s]);
          s += 1;
          break;

        case 'ALLOC': {
          const [m, n] = parameters.split(',');

          for (let K = 0; K < n[1]; K += 1) {
            s += 1;
            M[s] = M[m + K];
          }
          break;
        }

        case 'DALLOC': {
          const [m, n] = parameters.split(',');

          let K = n - 1;
          for (K; K >= 0; K -= 1) {
            M[m + K] = M[s];
            s -= 1;
          }
          break;
        }

        case 'CALL':
          s += 1;
          M[s] = i + 1;
          i = parameters;
          break;

        case 'RETURN':
          i = M[s];
          s -= 1;
          break;

        default:
          break;
      }
    },
  },
};

export default mixin;

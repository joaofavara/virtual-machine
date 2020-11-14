/* eslint-disable max-len */
// eslint-disable-next-line max-len

// import { forEach } from 'core-js/fn/array';

const mixin = {
  data() {
    return {
      loop: true,
      isSelectedRow: [],
      executionRow: [],
      commands: null,
      i: 0, /* Indice da fila de comandos */
      s: 0, /* Indice da pilha de dados */
      programColumns: [
        'Posicao',
        'Instrucao',
        'Atributo1',
        'Atributo2',
        'Comentario',
      ],
      programData: [],
      stackData: [], /* Pilha de dados */
      stackColumns: [
        'Endereco',
        'Valor',
      ],
    };
  },
  methods: {
    setUpDefaultArray(commands) {
      this.isSelectedRow = commands.map(() => false);
      this.executionRow = commands.map(() => false);
    },
    parseCommand(command) {
      const commandSplited = command.split('#');
      const commandPart = commandSplited[0].split(' ') || '';
      const comentario = commandSplited[1] || '';
      const instrucao = commandPart[0].trim() || '';
      const atributos = commandPart[1] ? commandPart[1].trim() : '';
      const [atributo1, atributo2] = atributos ? atributos.split(',') : ['', ''];
      const breakpoint = false;
      return {
        instrucao,
        atributo1,
        atributo2,
        comentario,
        breakpoint,
      };
    },
    buildProgramData() {
      let countPosicao = 1;
      this.commands.forEach((command) => {
        this.programData.push(
          {
            Posicao: countPosicao,
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
      this.loop = true;

      if (isInput && this.inputData) {
        this.stackData[this.s] = parseInt(this.inputData, 10);
        this.addInputedData();
        this.isInput = false;
      }

      while (this.loop && this.i < this.programData.length) {
        // console.log(`-- Linha ${this.i + 1} ---`);
        // console.log(`Ponteiro: ${this.s}`);
        // console.log(`Instrucao: ${this.programData[this.i].Instrucao}`);
        // console.log(`Atributo1: ${this.programData[this.i].Atributo1}`);
        // console.log(`Atributo2: ${this.programData[this.i].Atributo2}`);
        // console.log(`executionRow: ${this.executionRow[this.i]}`);
        // console.log(this.stackData.flat());
        // console.log(`-- Linha ${this.i + 1} ---\n\n`);

        this.executeLine();
        if (this.executeData.state === 'DEBUG' && !this.isInput && this.programData[this.lastRow].breakpoint) {
          break;
        }
      }
    },
  },
};

export default mixin;

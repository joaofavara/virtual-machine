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
      const breakpoint = false;
      return {
        instrucao,
        atributo1,
        atributo2,
        comentario: '',
        breakpoint,
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
      this.loop = true;

      if (isInput && this.inputData) {
        this.stackData[this.s] = parseInt(this.inputData, 10);
        this.addInputedData();
        this.isInput = false;
      }

      while (this.loop && this.i < this.programData.length) {
        console.log(`-- Linha ${this.i + 1} ---`);
        console.log(`Ponteiro: ${this.s}`);
        console.log(`Instrucao: ${this.programData[this.i].instrucao}`);
        console.log(`Atributo1: ${this.programData[this.i].atributo1}`);
        console.log(`Atributo2: ${this.programData[this.i].atributo2}`);
        console.log(`executionRow: ${this.executionRow[this.i]}`);
        console.log(this.stackData.flat());
        console.log(`-- Linha ${this.i + 1} ---\n\n`);

        this.executeLine();
        console.log(this.executeData.state);
        if (this.executeData.state === 'DEBUG' && this.programData[this.i].breakpoint) {
          break;
        }
      }
    },
  },
};

export default mixin;

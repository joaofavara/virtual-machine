/* eslint-disable max-len */
// eslint-disable-next-line max-len

// import { forEach } from 'core-js/fn/array';
// import axios from 'axios';

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
      console.log('this.isSelectedRow: ', this.isSelectedRow);
      this.executionRow = commands.map(() => false);
      console.log('this.executionRow: ', this.executionRow);
    },
    parseCommand(command) {
      const commandSplited = command.split('#');
      const commandPart = commandSplited[0].split(' ') || '';
      const Comentario = commandSplited[1] || '';
      const Instrucao = commandPart[0].trim() || '';
      const atributos = commandPart[1] ? commandPart[1].trim() : '';
      const [Atributo1, Atributo2] = atributos ? atributos.split(',') : ['', ''];
      const breakpoint = false;
      return {
        Instrucao,
        Atributo1,
        Atributo2,
        Comentario,
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
      console.log('this.programData: ', this.programData);
    },
    async previewFiles(event) {
      // const result = await axios.get(`http://localhost:5000/read_file?file=${event.target.files[0].path}`);
      // this.commands = await result.data.codigo.split(/\n/);
      // console.log('result: ', this.commands);
      // this.setUpDefaultArray(this.commands);
      // this.buildProgramData();

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (evt) => {
        this.commands = evt.target.result.split(/\n/);
        console.log('this.commands: ', typeof (this.commands));
        this.setUpDefaultArray(this.commands);
        this.buildProgramData();
      };

      await reader.readAsText(file);
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
        if (this.executeData.state === 'DEBUG' && !this.isInput && this.programData[this.lastRow].breakpoint) {
          break;
        }
      }
    },
  },
};

export default mixin;

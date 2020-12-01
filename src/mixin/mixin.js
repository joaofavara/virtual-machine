/* eslint-disable max-len */
// eslint-disable-next-line max-len

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
      this.programData = [];
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
        this.executeLine();
        if (this.executeData.state === 'DEBUG' && !this.isInput && this.programData[this.lastRow].breakpoint) {
          break;
        }
      }
    },
  },
};

export default mixin;

<template>
  <transition v-if="isModalVisible" name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">Aviso</slot>
        </header>
        <section class="modal-body">
          <slot name="body">{{modalMessage}}</slot>
        </section>
        <button class="close" @click="isModalVisible=false">Ok</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      modalMessage: '',
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.modalMessage = 'Fim da execução!';
      this.isModalVisible = true;
    },
  },
};
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 10px 1px;
    overflow-x: auto;
    display: flex;
    border-radius: 8px;
    flex-direction: row;
    flex-direction: column;
    width: 200px;
    height: 160px;
  }

  .modal-header {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    margin: auto;
  }

  .close{
    background: #E0FFFF;
    padding: 5px;
    border-radius: 8px;
    margin: auto;
    width: 50px;
  }
</style>

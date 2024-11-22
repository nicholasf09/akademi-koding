<template>
  <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
          <div class="w-full bg-gray-600">
              <button class="close-button" @click="closeModal">X</button>
          </div>

          <hr class="mt-5">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  props: {
      isVisible: {
          type: Boolean,
          required: true,
      }
  },
  methods: {
      closeModal() {
          this.$emit('close', { source: 'closeButton' }); // Kirim event dengan informasi sumber
      }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

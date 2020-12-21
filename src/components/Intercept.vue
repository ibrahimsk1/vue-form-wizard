<template>
  <div class="card-form__inner__nav">
    <b-overlay :show="loading" rounded="sm">
      <slot></slot>
      <Modal :msg="msg" :type="type" :modal.sync="modal" />
    </b-overlay>
  </div>
</template>
<script>

import Modal from "./Modal";
export default {
  props: ["interceptData"],
  components: {
    Modal
  },
  data() {
    return {
      msg: "",
      type: "",
      modal: false,
      loading: false,
    }
  },
  watch: {
    interceptData: {
      handler: function (data) {
        if (data.type === "loading") {
          this.loading = true;
        } else {
          this.loading = false;
          this.openModal(data)
        }
      },
      deep: true
    }
  }, methods: {
    openModal(data) {
      this.msg = data.msg;
      this.type = data.type;
      this.modal = true;
    }
  }
}

</script>

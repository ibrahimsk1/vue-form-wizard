<template>
  <b-modal
    ok-only
    :title="headerTitle"
    class="rounded"
    :header-bg-variant="type"
    header-text-variant="white"
    style="text-align: center !important"
    :visible="modal"
    @hidden="modalChange"
  >
    <div style="text-align: center">
      <label>{{ msg }}</label>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: ["msg", "type", "modal", "title"],
 methods:{
     modalChange(isVisible) {
      if (isVisible.type === "hidden") {
         this.$emit('update:modal', false)
      }
    }, 
 },
  computed: {
    headerTitle() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    },
  }
}
</script>

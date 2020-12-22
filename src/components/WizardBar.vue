<template>
  <transition>
    <div class="item" :class="indicatorclass"></div>
  </transition>
</template>

<script>
export default {
  props: ["ix", "step", "currentActive"],

  computed: {
    indicatorclass() {
      return {
        active: this.ix == this.currentActive,
        complete: this.currentActive > this.ix,
        idle: this.ix > this.currentActive
      };
    }
  }
}
</script>



<template>
  <li :class="indicatorclass">
    <div class="step"><b-icon :icon="step.icon_class"></b-icon></div>
    <div class="caption hidden-xs hidden-sm">
      Step <span v-text=" ( parseInt(ix) + 1 )"></span>: <span v-text="$t(`${step.title}`)"></span>
    </div>
  </li>
</template>

<script>
export default {
  props: ["ix", "step", "currentActive"],

  computed: {
    indicatorclass() {
      return {
        active: this.ix == this.currentActive,
        complete: this.currentActive > this.ix
      };
    }
  }
}
</script>



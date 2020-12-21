<template>
  <div style="text-align:center;">
    <WizardNavigation :tabs="tabs" :currentActive="currentActive" />
    <div style="flex: 1;text-align:center;" class="mt-5 mb-5" >
      <slot></slot>
    </div>
    <ButtonGroup :totalTabs="totalTabs" :tabs="tabs" :currentActive="currentActive" :changeTab="changeTab" />
  </div>
</template>

<script>
import WizardNavigation from './WizardNavigation';
import ButtonGroup from './ButtonGroup';

export default {
  components: {
    WizardNavigation,
    ButtonGroup
  },
  props:["currentActive","changeTab"],
  data() {
    return {
      tabs: [],
      totalTabs: 0,
      isCompleted: false,
    };
  },
  mounted() {
    this.tabs = this.$slots.default.map(x => x.child);
    this.totalTabs = this.tabs.length;
  },
};
</script>




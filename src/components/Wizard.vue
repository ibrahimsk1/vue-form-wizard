<template>
  <div style="text-align: center">
    <WizardNavigation :tabs="wizardHeader" :currentActive="currentActive" />

    <div style="flex: 1; text-align: center" class="mt-5 mb-5">
      <transition-group :name="transition" >
        <slot></slot>
      </transition-group>
    </div>

    <ButtonGroup
      :totalTabs="totalTabs"
      :tabs="tabs"
      :currentActive="currentActive"
      :changeTab="changeTab"
    />
  </div>
</template>

<script>
import WizardNavigation from './WizardNavigation';
import ButtonGroup from './ButtonGroup';
import { wizardHeader } from '../constants/data'

export default {
  components: {
    WizardNavigation,
    ButtonGroup
  },
  props: ["currentActive", "changeTab" , "transition"],
  data() {
    return {
      wizardHeader,
      tabs: [],
      totalTabs: 0,
      isCompleted: false,
    };
  },
  mounted() {
    this.totalTabs = this.$slots.default.length;
    this.tabs = this.$slots.default.map(x=>x.child);
  },
};
</script>





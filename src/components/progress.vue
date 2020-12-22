 <template>
  <ol class="step-indicator">
    <li
      v-for="(tab, ix) in tabs"
      is="WizardNavigationItem"
      :key="$t(`${tab.title}`)"
      :step="tab"
      :currentActive="currentActive"
      :ix="ix"
    ></li>
  </ol>
</template>

<script>
import WizardNavigationItem from './WizardNavigationItem'
export default {
    components:{
        WizardNavigationItem
    },
    props: ["tabs", "currentActive"],
}
</script>
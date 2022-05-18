<template>
  <label
    v-bind="$attrs"
    :class="computedClasses"
  >
    <slot />
  </label>
</template>

<script>
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [prop.size('sm', ['sm', 'lg'])],
  inheritAttrs: false,
  computed: {
      computedClasses() {
      const styles = {
        display: 'inline-block',
        margin: 'mb-1',
        // fontColor: 'text-secondary-600',
        fontSize: this.size === 'sm' ? 'text-xs' : 'text-sm',
        lineHeight: this.size === 'sm' ? 'leading-4.5' : '',
      }
      return generateClasses([{ ...styles }])
    }
  },
}
</script>

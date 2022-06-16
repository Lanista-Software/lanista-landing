<template>
  <span :class="computedClasses" />
</template>

<script>
import { generateClasses, generateVariant } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [prop.variant(), prop.boolean('border'), prop.size(), prop.filter()],
  computed: {
    computedClasses() {
      const classes = {
        width:
          this.size === '2xs'
            ? 'w-2'
            : this.size === 'xs'
            ? 'w-3'
            : this.size === 'sm'
            ? 'w-4'
            : this.size === 'md'
            ? 'w-5'
            : 'w-6',
        height:
          this.size === '2xs'
            ? 'h-2'
            : this.size === 'xs'
            ? 'h-3'
            : this.size === 'sm'
            ? 'h-4'
            : this.size === 'md'
            ? 'h-5'
            : 'h-6',
        backgroundColor: generateVariant(this.variant, this.filter)
          .backgroundColor,
        border: this.border ? 'border border-white' : '',
        display: 'inline-block',
        borderRadius: 'rounded-full',
      }
      return generateClasses([{ ...classes }])
    },
  },
}
</script>

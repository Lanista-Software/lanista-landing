<template>
  <div v-bind="$attrs" class="lui-card" :class="computedClasses">
    <img v-if="img !== 'none'" :src="img" :alt="imgAlt" :class="imgClasses" />
    <div v-if="$slots.default" class="lui-card--body p-6">
      <slot />
    </div>
  </div>
</template>
<script>
import { generateClasses, generateColorVariant } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [
    prop.string('img', ''),
    prop.string('imgAlt', 'imgAlt'),
    prop.boolean('border', false),
    prop.boolean('rounded'),
    prop.filter('borderFilter'),
    prop.filter('bgFilter'),
    prop.filter('textFilter'),
    prop.variant('bgVariant', 'light'),
    prop.variant('textVariant', 'dark'),
    prop.variant('borderVariant', 'secondary'),
  ],
  computed: {
    computedClasses() {
      const classes = {
        backgroundColor: generateColorVariant(
          this.bgVariant,
          this.bgFilter,
          'bg'
        ).colorClasses,
        backgroundClip: 'bg-clip-border',
        border: this.border ? 'border' : '',
        borderStyle: this.border ? 'border-solid' : '',
        borderColor: this.border
          ? generateColorVariant(
              this.borderVariant,
              this.borderFilter,
              'border'
            ).colorClasses
          : '',
        color: generateColorVariant(this.textVariant, this.textFilter, 'text')
          .colorClasses,
        borderRadius: this.rounded ? 'rounded-2xl' : '',
        flexDirection: 'flex-col',
        display: 'flex',
        minWidth: 'min-w-0',
        position: 'relative',
        wordBreak: 'break-words',
        overflow: '',
      }
      return generateClasses([{ ...classes }])
    },
    imgClasses() {
      const classes = {
        width: 'w-full',
        height: 'h-full',
      }
      return generateClasses([{ ...classes }])
    },
  },
}
</script>

<style></style>

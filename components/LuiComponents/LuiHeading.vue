<template>
  <component :is="setLevel" :class="computedClasses" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
import * as prop from '../../mixins/props'
import { generateClasses } from '../../mixins/methods'
export default {
  mixins: [
    prop.string('level', '2', ['1', '2', '3', '4', '5', '6']),
    prop.size('default', ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', 'default']),
    prop.boolean('display'),
  ],
  computed: {
    setLevel() {
      return `h${this.level}`
    },
    computedClasses() {
      const classes = {
        fontSize:
          this.size === 'default'
            ? this.findFontSize(this.level, this.display)
            : this.findFontSize(this.size, this.display),
        lineHeight: this.display
          ? ''
          : this.size === 'default'
          ? this.findLineHeight(this.level)
          : this.findLineHeight(this.size),

        // fontSize:
        //   this.display === false
        //     ? this.level === '6'
        //       ? 'text-sm leading-4.5'
        //       : this.level === '5'
        //       ? 'text-base leading-5'
        //       : this.level === '4'
        //       ? 'text-lg leading-6'
        //       : this.level === '3'
        //       ? 'text-xl leading-6'
        //       : this.level === '2'
        //       ? 'text-2xl leading-8'
        //       : 'text-3xl leading-9'
        //     : this.display === true // display true
        //     ? this.level === '6'
        //       ? 'text-4xl'
        //       : this.level === '5'
        //       ? 'text-5xl'
        //       : this.level === '4'
        //       ? 'text-6xl'
        //       : this.level === '3'
        //       ? 'text-7xl'
        //       : this.level === '2'
        //       ? 'text-8xl'
        //       : 'text-9xl'
        //     : '',
      }
      return generateClasses([{ ...classes }])
    },
  },
  methods: {
    findLineHeight(size) {
      const sizes = {
        6: 'leading-4.5',
        5: 'leading-5',
        4: 'leading-6',
        3: 'leading-6',
        2: 'leading-8',
        1: 'leading-9',
        '2xs': 'leading-4.5',
        xs: 'leading-5',
        sm: 'leading-6',
        md: 'leading-6',
        lg: 'leading-8',
        xl: 'leading-9',
      }
      return sizes[size]
    },
    findFontSize(size, isDisplay) {
      const display = isDisplay ? 'display' : 'normal'

      const sizes = {
        6: {
          normal: 'text-sm',
          display: 'text-4xl',
        },
        5: {
          normal: 'text-base',
          display: 'text-5xl',
        },
        4: {
          normal: 'text-lg',
          display: 'text-6xl',
        },
        3: {
          normal: 'text-xl',
          display: 'text-7xl',
        },
        2: {
          normal: 'text-2xl',
          display: 'text-8xl',
        },
        1: {
          normal: 'text-3xl',
          display: 'text-9xl',
        },
        '2xs': {
          normal: 'text-sm',
          display: 'text-4xl',
        },
        xs: {
          normal: 'text-base',
          display: 'text-5xl',
        },
        sm: {
          normal: 'text-lg',
          display: 'text-6xl',
        },
        md: {
          normal: 'text-xl',
          display: 'text-7xl',
        },
        lg: {
          normal: 'text-2xl',
          display: 'text-8xl',
        },
        xl: {
          normal: 'text-3xl',
          display: 'text-9xl',
        },
      }
      return sizes[size][display]
    },
  },
}
</script>

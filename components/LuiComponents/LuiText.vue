<template>
  <component :is="tag" :class="computedClasses" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
import * as prop from '../../mixins/props'
import { generateClasses } from '../../mixins/methods'
export default {
  mixins: [
    prop.string('tag', 'p', [
      'p',
      'span',
      'br',
      'strong',
      'em',
      'quotes',
      'blockquote',
      'code',
      'pre',
      'mark',
      'ins',
      'del',
      'sup',
      'sub',
      'small',
      'i',
      'b',
      'abbr',
      'address',
      'bdi',
      'bdo',
      'cite',
      'dfn',
      'kbs',
      'meter',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'time',
      'u',
      'var',
      'wbr',
    ]),
    prop.size('md', ['2xs', 'xs', 'sm', 'md', 'lg']),
    // prop.variant('variant', 'dark'),
  ],
  computed: {
    computedClasses() {
      const classes = {
        // fontColor: `text-${this.variant}-600`,
        fontSize:
          this.size === '2xs'
            ? 'text-2xs'
            : this.size === 'xs'
            ? 'text-xs'
            : this.size === 'sm'
            ? 'text-sm'
            : this.size === 'md'
            ? 'text-base'
            : 'text-xl',
        lineHeight: 'leading-normal',
        // lineHeight:
        //   this.size === '2xs'
        //     ? 'leading-3'
        //     : this.size === 'xs'
        //     ? 'leading-3.5'
        //     : this.size === 'sm'
        //     ? 'leading-4.5'
        //     : this.size === 'md'
        //     ? ''
        //     : '',
      }
      return generateClasses([{ ...classes }])
    },
  },
}
</script>

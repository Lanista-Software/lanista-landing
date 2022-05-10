<template>
  <i :class="classes" v-bind="$attrs" />
</template>
<script>
import * as prop from '../../mixins/props'
export default {
  mixins: [
    prop.string('name', ''),
    prop.boolean('fill'),
    prop.boolean('line'),
    prop.size('none', [
      'lg',
      'xl',
      'xxs',
      'xs',
      'sm',
      '1x',
      '2x',
      '3x',
      '4x',
      '5x',
      '6x',
      '7x',
      '8x',
      '9x',
      '10x',
      'fw',
      'fwh',
      'none',
    ]),
  ],
  computed: {
    classes() {
      return [
        `ri-${this.name}${this.fill ? '-fill' : ''}${this.line ? '-line' : ''}`,
        this.size !== 'none' ? `ri-${this.size}` : '',
      ]
    },
  },
}
</script>

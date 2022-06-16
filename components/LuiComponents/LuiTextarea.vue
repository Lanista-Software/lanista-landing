<template>
  <div class="relative">
    <textarea
      v-bind="$attrs"
      :class="computedClasses"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <slot />
  </textarea
    >
    <lui-icon
      v-if="state !== null"
      :name="iconClasses.name"
      :class="[
        iconClasses.size,
        iconClasses.color,
        iconClasses.position,
        iconClasses.state,
      ]"
      line
    />
  </div>
</template>
<script>
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [prop.size('sm', ['sm', 'md', 'lg'])],
  props: {
    state: {
      type: [String, Boolean, null],
      default: null,
      validator(value) {
        return [null, 'warning', true, false].includes(value)
      },
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedClasses() {
      const classes = {
        paddingLeft: this.size === 'lg' ? 'pl-3' : 'pl-2',
        paddingRight:
          this.state === null
            ? this.size === 'lg'
              ? 'pr-3'
              : 'pr2'
            : this.size === 'lg'
            ? 'pr-11'
            : this.size === 'md'
            ? 'pr-9'
            : 'pr-8',
        paddingY:
          this.size === 'sm' ? 'py-1.5' : this.size === 'md' ? 'py-2' : 'py-3',
        border:
          this.state === 'warning'
            ? 'border border-warning'
            : this.state === true
            ? 'border border-success'
            : this.state === false
            ? 'border border-danger'
            : 'border border-info-200',
        ring:
          this.state === 'warning'
            ? 'ring-4 ring-warning-100'
            : this.state === true
            ? 'ring-4 ring-success-100'
            : this.state === false
            ? 'ring-4 ring-danger-100'
            : '',
        borderRadius: `rounded-${this.size}`,
        fontSize: this.size === 'sm' ? 'text-xs' : 'text-base',
        lineHeight: this.size === 'sm' ? 'leading-4.5' : 'leading-6',
        fontColor: 'placeholder-info-400 text-info-600',
        width: 'w-full',
        resize: 'resize-y',
      }
      const stateClasses = {
        focus: {
          ring:
            this.state === null ? 'focus:ring-4 focus:ring-primary-100' : '',
          outline: 'outline-none',
          border: this.state === null ? 'focus:border-primary' : '',
        },
        disabled: {
          border: 'disabled:border-info',
          backgroundColor: 'disabled:bg-info-100',
          fontColor: 'disabled:text-info-300',
          ring: 'disabled:ring-0 disabled:ring-transparent',
        },
      }
      const { focus, disabled } = stateClasses

      return generateClasses([{ ...classes }, { ...focus }, { ...disabled }])
    },
    iconClasses() {
      return {
        name:
          !!this.$attrs.disabled === true
            ? 'forbid'
            : this.state === 'warning'
            ? 'feedback'
            : this.state === false
            ? 'error-warning'
            : this.state === true
            ? 'checkbox-circle'
            : '',
        size:
          this.size === 'sm'
            ? 'text-base'
            : this.size === 'md'
            ? 'text-xl'
            : 'text-2xl',
        color:
          !!this.$attrs.disabled === true
            ? 'text-info-300'
            : this.state === 'warning'
            ? 'text-warning'
            : this.state === false
            ? 'text-danger'
            : this.state === true
            ? 'text-success'
            : '',
        // position: 'absolute top-2/4 transform -translate-y-1/2',
        position: 'absolute top-3 right-3',
        prepend:
          this.size === 'lg' ? 'text-info-400 left-3' : 'text-info-400 left-2',
        state: this.size === 'lg' ? 'right-3' : 'right-2',
        clear:
          this.state === null
            ? this.size === 'lg'
              ? 'right-3'
              : 'right-2'
            : // sm:56 md:64 - 16 lg:48 = 20
            this.size === 'lg'
            ? 'right-12'
            : this.size === 'md'
            ? 'right-9'
            : 'right-8',
      }
    },
  },
}
</script>

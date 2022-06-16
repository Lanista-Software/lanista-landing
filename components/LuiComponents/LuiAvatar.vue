<template>
  <div
    class="lui-avatar"
    :class="[computedClasses]"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <lui-icon v-if="icon !== 'none'" :name="icon" line :class="iconClasses" />
    <img
      v-if="img !== 'none'"
      :src="img"
      :class="imgClasses"
      alt="Lui avatar"
    />
    <span v-else>
      {{ text.toUpperCase().slice(0, 2) }}
    </span>
    <lui-badge
      v-if="badge.variant !== '' && badge.position !== ''"
      :class="badgeClasses"
      :variant="badge.variant"
      border
      :size="['2xs', 'xs', 'sm'].includes(size) ? '2xs' : 'xs'"
    />
  </div>
</template>
<script>
import { generateClasses, generateVariant } from '../../mixins/methods'
import * as prop from '../../mixins/props'
import LuiBadge from './LuiBadge.vue'
import LuiIcon from './LuiIcon.vue'
export default {
  components: {
    LuiIcon,
    LuiBadge,
  },
  mixins: [
    prop.variant(),
    prop.filter(),
    prop.size(),
    prop.boolean('rounded'),
    prop.boolean('roundedFull'),
    prop.boolean('border'),
    prop.string('icon', 'none'),
    prop.string('img', 'none'),
  ],
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: '',
      validator(value) {
        return value.length <= 2
      },
    },
    badge: {
      type: [Object],
      default() {
        return {
          position: '',
          variant: '',
        }
      },
      validator(obj) {
        return (
          [
            '',
            'primary',
            'secondary',
            'info',
            'success',
            'warning',
            'danger',
          ].includes(obj.variant) &&
          ['', 'top', 'bottom'].includes(obj.position)
        )
      },
    },
  },
  emits: ['click'],
  computed: {
    computedClasses() {
      const classes = {
        width:
          this.size === '2xs'
            ? 'w-5'
            : this.size === 'xs'
            ? 'w-6'
            : this.size === 'sm'
            ? 'w-8'
            : this.size === 'md'
            ? 'w-12'
            : this.size === 'lg'
            ? 'w-16'
            : 'w-12',
        height:
          this.size === '2xs'
            ? 'h-5'
            : this.size === 'xs'
            ? 'h-6'
            : this.size === 'sm'
            ? 'h-8'
            : this.size === 'md'
            ? 'h-12'
            : this.size === 'lg'
            ? 'h-16'
            : 'h-12',
        display: 'flex',
        justifyContent: 'justify-center',
        alignItems: 'items-center',
        verticalAlign: 'align-middle',
        textAlign: 'text-center',
        position: 'relative',
        borderSize: this.border
          ? ['2xs', 'xs', 'sm'].includes(this.size)
            ? 'border'
            : 'border-2'
          : '',
        borderColor: this.border ? 'border-white' : '',
        borderStyle: this.border ? 'border-solid' : '',
        borderRadius: this.roundedFull
          ? 'rounded-full'
          : this.rounded
          ? `rounded-${this.size}`
          : '',
        backgroundColor: generateVariant(this.variant, this.filter)
          .backgroundColor,
        fontColor: generateVariant(this.variant, this.filter).fontColor,
        fontSize:
          this.size === '2xs'
            ? 'text-2xs'
            : this.size === 'xs'
            ? 'text-2xs'
            : this.size === 'sm'
            ? 'text-sm'
            : this.size === 'md'
            ? 'text-md'
            : this.size === 'lg'
            ? 'text-xl'
            : '',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-none',
      }
      return generateClasses([{ ...classes }])
    },
    iconClasses() {
      const classes = {
        fontSize: ['2xs', 'xs'].includes(this.size)
          ? 'text-2xs'
          : this.size === 'sm'
          ? 'text-sm'
          : this.size === 'md'
          ? 'text-xl'
          : 'text-2xl',
      }
      return generateClasses([{ ...classes }])
    },
    imgClasses() {
      const classes = {
        width: 'w-full',
        height: 'h-full',
        borderRadius: this.roundedFull
          ? 'rounded-full'
          : this.rounded
          ? `rounded-${this.size}`
          : '',
        objectFit: 'object-cover',
      }
      return generateClasses([{ ...classes }])
    },
    badgeClasses() {
      const classes = {
        position: 'absolute',
        top: this.badge.position === 'top' ? 'bottom-full' : 'top-full',
        left: 'left-full',
        transform:
          this.badge.position === 'top'
            ? '-translate-x-1/2 translate-y-1/2'
            : '-translate-x-1/2 -translate-y-1/2',
        margin: this.roundedFull
          ? this.badge.position === 'top'
            ? this.size === 'lg'
              ? '-ml-2 -mb-2'
              : this.size === 'md'
              ? '-ml-1.5 -mb-1.5'
              : this.size === 'sm'
              ? '-ml-1 -mb-1'
              : this.size === 'xs'
              ? '-ml-0.5 -mb-0.5'
              : '-ml-0.5 -mb-0.5'
            : this.size === 'lg'
            ? '-ml-2 -mt-2'
            : this.size === 'md'
            ? '-ml-1.5 -mt-1.5'
            : this.size === 'sm'
            ? '-ml-1 -mt-1'
            : this.size === 'xs'
            ? '-ml-0.5 -mt-0.5'
            : '-ml-0.5 -mt-0.5'
          : '',
      }
      return generateClasses([{ ...classes }])
    },
  },
}
</script>

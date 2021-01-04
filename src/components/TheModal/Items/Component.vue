<template>
  <ul class="the-modal-items list-group">
    <li
      v-for="item in items"
      :key="item.id"
      class="list-group-item"
    >
      <div class="custom-control custom-checkbox">
        <input
          :id="'check_' + item.id"
          :checked="item.isChecked"
          @input="onCheck({ shouldBeChecked: $event.target.checked, targetItem: item })"
          type="checkbox"
          class="custom-control-input"
        >
        <label
          :for="'check_' + item.id"
          class="custom-control-label"
        >
          {{ item.name }}
        </label>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { ItemCheckable } from '@/types'

import { Options, Vue, prop } from 'vue-class-component'

class Props {
  public items = prop({
    required: true,
    type: Array as PropType<ItemCheckable[]>
  })
}
@Options({
  emits: ['on-check']
})
export default class TheModalItems extends Vue.with(Props) {
  private onCheck ({ shouldBeChecked, targetItem }: { shouldBeChecked: boolean; targetItem: ItemCheckable }) {
    this.$emit('on-check', { shouldBeChecked, targetItem })
  }
}
</script>

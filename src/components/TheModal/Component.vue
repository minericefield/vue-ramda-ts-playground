<template>
  <transition name="the-modal-fade" appear>
    <div class="the-modal d-flex align-items-center justify-content-center fixed-top w-100 h-100 p-5">
      <div class="the-modal-content d-flex flex-column w-100 rounded overflow-hidden bg-white">
        <the-modal-items
          :items="editingItems"
          @on-check="checkItem"
          class="flex-grow-1 overflow-auto rounded-0"
        />
        <nav class="navbar navbar-light bg-light">
          <button
            @click="$emit('on-cancel-click')"
            type="button"
            class="btn btn-secondary ml-auto mr-3"
          >
            Cancel
          </button>
          <button
            @click="onDeleteClick"
            type="button"
            class="btn btn-danger"
          >
            Delete
          </button>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Item, ItemCheckable } from '@/types'

import { assoc, equals, map, when } from 'ramda'
import { Options, Vue, prop } from 'vue-class-component'
import { getCheckedItemIds } from './module'

import TheModalItems from '@/components/TheModal/Items/Component.vue'

class Props {
  public items = prop({
    required: true,
    type: Array as PropType<Item[]>
  })
}
@Options({
  components: {
    TheModalItems
  },
  emits: ['on-cancel-click', 'on-delete-click']
})
export default class TheModal extends Vue.with(Props) {
  private editingItems: ItemCheckable[] = []

  public created () {
    // https://qiita.com/minericefield/items/25b7ff953149e224ae75#%E9%96%A2%E6%95%B0%E5%9E%8B
    this.editingItems = map(
      assoc('isChecked', false)
    )(this.items)
  }

  private checkItem ({ shouldBeChecked, targetItem }: { shouldBeChecked: boolean; targetItem: ItemCheckable }) {
    // https://qiita.com/minericefield/items/25b7ff953149e224ae75#%E9%96%A2%E6%95%B0%E5%9E%8B
    this.editingItems = map(
      when(
        equals(targetItem),
        assoc('isChecked', shouldBeChecked)
      )
    )(this.editingItems)
  }

  private onDeleteClick () {
    this.$emit('on-delete-click', getCheckedItemIds(this.editingItems))
  }
}
</script>

<style lang="scss" scoped>
.the-modal-fade-enter-from {
  opacity: 0;
}
.the-modal-fade-enter-active {
  transition: opacity .4s;
}
.the-modal {
  background-color: rgba($color: #111, $alpha: .8); 
  &-content {
    max-height: 100%;
  }
}
</style>

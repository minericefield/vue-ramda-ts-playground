<template>
  <transition name="the-modal-fade" appear>
    <div class="the-modal d-flex align-items-center justify-content-center fixed-top w-100 h-100 p-5">
      <div class="the-modal-content d-flex flex-column w-100">
        <the-modal-items
          :items="editingItems"
          @on-check="checkItem"
          class="flex-grow-1 overflow-auto"
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

import { Options, Vue, prop } from 'vue-class-component'
import { getCheckedItems, getInitializedEditingItems } from './module'

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
  emits: ['on-cancel-click']
})
export default class TheModal extends Vue.with(Props) {
  private editingItems: ItemCheckable[] = []

  public created () {
    this.editingItems = getInitializedEditingItems(this.items)
  }

  private checkItem ({ shouldBeChecked, targetItem }: { shouldBeChecked: boolean; targetItem: ItemCheckable }) {
    this.editingItems = getCheckedItems(shouldBeChecked, targetItem)(this.editingItems)
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

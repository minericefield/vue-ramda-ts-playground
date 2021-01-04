import { Item, ItemCheckable } from '@/types'

import { equals, filter, map, pipe, pluck, when } from 'ramda'
import { addIsChecked, isChecked } from '@/utilities'

export const getCheckedItemIds = pipe<ItemCheckable[], ItemCheckable[], number[]>(
  filter(isChecked),
  pluck('id')
)

export const getCheckedItems = (shouldBeChecked: boolean, targetItem: ItemCheckable) => map(
  when(
    equals(targetItem),
    addIsChecked(shouldBeChecked)
  )
)

export const getInitializedEditingItems = map<Item, ItemCheckable>(
  addIsChecked(false)
)

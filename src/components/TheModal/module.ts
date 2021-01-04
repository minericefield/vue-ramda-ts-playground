import { Item, ItemCheckable } from '@/types'

import { equals, map, when } from 'ramda'
import { addIsChecked } from '@/utilities'

export const getCheckedItems = (shouldBeChecked: boolean, targetItem: ItemCheckable) => map(
  when(
    equals(targetItem),
    addIsChecked(shouldBeChecked)
  )
)

export const getInitializedEditingItems = map<Item, ItemCheckable>(
  addIsChecked(false)
)

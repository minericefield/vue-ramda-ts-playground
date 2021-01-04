import { Item, ItemCheckable } from '@/types'

import { map } from 'ramda'
import { addIsChecked } from '@/utilities'

export const getInitializedEditingItems = map<Item, ItemCheckable>(
  addIsChecked(false)
)

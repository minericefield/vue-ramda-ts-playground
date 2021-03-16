import { Item } from '@/types'

import { __, andThen, applySpec, concat, curry, identity, includes, pipe, prop, reject, times, toString } from 'ramda'
import { delay } from '@/utilities'

const createItemNameFromNumber = pipe<number, string, string>(
  toString,
  concat('Item ')
)

const createItemFromNumber = applySpec({
  id: (num: number) => num,
  name: createItemNameFromNumber
})

const createItemsFromNumber = times(createItemFromNumber)

const isItemIncludedInIds = curry(
  (ids: number[], item: Item) => pipe(
    prop<'id', number>('id'),
    includes(__, ids)
  )(item)
)

export const fetchItems = pipe<number, Promise<number>, Promise<Item[]>>(
  delay(1000, identity),
  andThen(
    createItemsFromNumber
  )
)

export const fetchRemainedItems = (deleteTargetIds: number[]) => pipe(
  delay<[Item[]], Item[]>(1000, identity),
  andThen(
    reject<Item>(isItemIncludedInIds(deleteTargetIds))
  )
)

// export const fetchItems = pipe(
//   delay<[number], number>(1000, identity),
//   andThen(
//     times(createItemFromNumber)
//   )
// )

// export const fetchRemainedItems = (rejectTargetIds: number[]) => pipe<Item[], Promise<Item[]>, Promise<Item[]>>(
//   delay(1000, identity),
//   andThen(
//     reject<Item>(isItemIncludedInIds(rejectTargetIds))
//   )
// )

// export const fetchRemainedItems = (rejectTargetIds: number[], items: Item[]) => pipe(
//   delay<[Item[]], Item[]>(1000, identity),
//   andThen(
//     reject<Item>(isItemIncludedInIds(rejectTargetIds))
//   )
// )(items)

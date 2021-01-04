import { Item } from '@/types'

import { andThen, applySpec, concat, identity, pipe, times, toString } from 'ramda'
import { delay } from '@/utilities'

const createItemNameFromNumber = pipe<number, string, string>(
  toString,
  concat('Item ')
)

const createItemFromNumber = applySpec({
  id: (num: number) => num,
  name: createItemNameFromNumber
})

export const fetchItems = pipe<number, Promise<number>, Promise<Item[]>>(
  delay(1000, identity),
  andThen(
    times(createItemFromNumber)
  )
)

// export const fetchItems = pipe(
//   delay<[number], number>(1000, identity),
//   andThen(
//     times(createItemFromNumber)
//   )
// )

import { assoc } from 'ramda'

export const addIsChecked = (shouldBeChecked: boolean) => assoc('isChecked', shouldBeChecked)

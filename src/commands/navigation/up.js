import { store } from '../../store.js'
import { EOL } from 'node:os'
import path from 'node:path'

export const name = 'up'

/**
 * @description Is executed command `UP`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandNavigationUp = (input) => {
  return input.toLowerCase() === `${name}${EOL}`
}

/**
 * @description Navigation `UP` command handler
 * @returns {Promise<void>}
 */
export const navigationUpHandler = async () => {
  store.directory = path.join(store.directory, '..')
}

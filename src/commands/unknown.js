import { displayInvalidInput } from '../helpers/common.js'

/**
 * @description Unknown command handler
 * @returns {Promise<void>}
 */
export const unknownHandler = async () => {
  displayInvalidInput()
}

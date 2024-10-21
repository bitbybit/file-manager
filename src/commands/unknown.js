import { displayInvalidInput } from '../helpers/messages.js'

/**
 * @description Unknown command handler
 * @returns {Promise<void>}
 */
export const unknownHandler = async () => {
  displayInvalidInput()
}

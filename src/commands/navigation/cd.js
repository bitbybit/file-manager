import { COMMAND_SEPARATOR, isCommand } from '../../helpers/cli.js'
import { isDirectory } from '../../helpers/fs.js'
import { store } from '../../store.js'
import path from 'node:path'

export const name = 'cd'

/**
 * @description Is executed command `CD`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandNavigationCd = (input) => {
  return isCommand(input, name)
}

/**
 * @description Navigation `CD` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const navigationCdHandler = async (input) => {
  const props = input
    .substring(name.length + COMMAND_SEPARATOR.length)
    .trim()

  const newDirectory = path.isAbsolute(props) ?
    path.resolve(props) : path.join(store.directory, props)

  const canAccess = await isDirectory(newDirectory)

  if (!canAccess) {
    throw new Error(`Can not access ${newDirectory}`)
  }

  store.directory = newDirectory
}

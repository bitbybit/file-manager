import { COMMAND_SEPARATOR, isCommand } from '../../helpers/cli.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const name = 'rm'

/**
 * @description Is executed command `RM`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandFsRm = (input) => {
  return isCommand(input, name)
}

/**
 * @description FS `RM` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const fsRmHandler = async (input) => {
  const props = input
    .substring(name.length + COMMAND_SEPARATOR.length)
    .trim()

  const pathToFile = path.isAbsolute(props) ?
    path.resolve(props) : path.join(store.directory, props)

  await fs.rm(pathToFile)
}

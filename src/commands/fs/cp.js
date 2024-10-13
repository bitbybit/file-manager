import { COMMAND_SEPARATOR, isCommand } from '../../helpers/common.js'
import { copyFileToDirectory } from '../../helpers/fs.js'
import { store } from '../../store.js'
import path from 'node:path'

export const name = 'cp'

/**
 * @description Is executed command `CP`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandFsCp = (input) => {
  return isCommand(input, name)
}

/**
 * @description FS `CP` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const fsCpHandler = async (input) => {
  const props = input.substring(name.length).trim().split(COMMAND_SEPARATOR)

  const fileName = props[0]
  const directory = props.slice(1).join(COMMAND_SEPARATOR)

  const pathToFile = path.isAbsolute(fileName) ?
    path.resolve(fileName) : path.join(store.directory, fileName)

  const pathToDirectory = path.isAbsolute(directory) ?
    path.resolve(directory) : path.join(store.directory, directory)

  await copyFileToDirectory({
    pathToFile,
    pathToDirectory
  })
}

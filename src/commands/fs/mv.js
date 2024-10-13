import { COMMAND_SEPARATOR, isCommand } from '../../helpers/common.js'
import { copyFileToDirectory } from '../../helpers/fs.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const name = 'mv'

/**
 * @description Is executed command `MV`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandFsMv = (input) => {
  return isCommand(input, name)
}

/**
 * @description FS `MV` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const fsMvHandler = async (input) => {
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

  await fs.rm(pathToFile)
}

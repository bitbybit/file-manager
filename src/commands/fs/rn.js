import { COMMAND_SEPARATOR, isCommand } from '../../helpers/common.js'
import { canAccessPath, isForbiddenFileName } from '../../helpers/fs.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const name = 'rn'

/**
 * @description Is executed command `RN`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandFsRn = (input) => {
  return isCommand(input, name)
}

/**
 * @description FS `RN` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const fsRnHandler = async (input) => {
  const props = input.substring(name.length).trim().split(COMMAND_SEPARATOR)

  const fileName = props[0]
  const fileNameRenamed = props.slice(1).join(COMMAND_SEPARATOR)

  if (isForbiddenFileName(fileNameRenamed)) {
    throw new Error(`${fileNameRenamed} is not a valid file name`)
  }

  const pathToFile = path.isAbsolute(fileName) ?
    path.resolve(fileName) : path.join(store.directory, fileName)

  const pathToFileRenamed = path.join(path.dirname(pathToFile), fileNameRenamed)

  const fileRenamedExists = await canAccessPath(pathToFileRenamed)

  if (fileRenamedExists) {
    throw new Error(`${fileNameRenamed} already exists`)
  }

  await fs.rename(pathToFile, pathToFileRenamed)
}

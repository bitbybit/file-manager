import { COMMAND_SEPARATOR, isCommand } from '../../helpers/common.js'
import { canAccessPath, isDirectory } from '../../helpers/fs.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
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

  const isNotFile = await isDirectory(pathToFile)

  if (isNotFile) {
    throw new Error(`${pathToFile} is not a file`)
  }

  const pathToDirectory = path.isAbsolute(directory) ?
    path.resolve(directory) : path.join(store.directory, directory)

  const isMissingDirectory = !(await isDirectory(pathToDirectory))

  if (isMissingDirectory) {
    throw new Error(`${pathToDirectory} is missing`)
  }

  const pathToFileCopy = path.join(pathToDirectory, path.basename(pathToFile))

  const fileCopyExists = await canAccessPath(pathToFileCopy)

  if (fileCopyExists) {
    throw new Error(`${pathToFileCopy} already exists`)
  }

  const file = await fs.open(pathToFile, 'r')
  const fileCopy = await fs.open(pathToFileCopy, 'w')

  const stream = file.createReadStream()
  const streamCopy = fileCopy.createWriteStream()

  await pipeline(stream, streamCopy)
}

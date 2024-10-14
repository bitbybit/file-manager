import { COMMAND_SEPARATOR, isCommand } from '../../helpers/cli.js'
import { store } from '../../store.js'
import { pipeline } from 'node:stream/promises'
import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'

export const name = 'compress'

/**
 * @description Is executed command `COMPRESS`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandArchiveCompress = (input) => {
  return isCommand(input, name)
}

/**
 * @description Archive `COMPRESS` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const archiveCompressHandler = async (input) => {
  const props = input
    .substring(name.length + COMMAND_SEPARATOR.length)
    .trim()
    .split(COMMAND_SEPARATOR)

  const fileName = props[0]
  const fileNameArchived = props.slice(1).join(COMMAND_SEPARATOR)

  const pathToFile = path.isAbsolute(fileName) ?
    path.resolve(fileName) : path.join(store.directory, fileName)

  const pathToFileArchived = path.isAbsolute(fileNameArchived) ?
    path.resolve(fileNameArchived) : path.join(store.directory, fileNameArchived)

  const file = await fs.open(pathToFile, 'r')
  const archive = await fs.open(pathToFileArchived, 'w')

  const stream = file.createReadStream()
  const streamArchive = archive.createWriteStream()

  const archiveFile = zlib.createBrotliCompress()

  await pipeline(stream, archiveFile, streamArchive)
}

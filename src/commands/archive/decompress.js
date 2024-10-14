import { COMMAND_SEPARATOR, isCommand } from '../../helpers/cli.js'
import { store } from '../../store.js'
import { pipeline } from 'node:stream/promises'
import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'

export const name = 'decompress'

/**
 * @description Is executed command `DECOMPRESS`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandArchiveDecompress = (input) => {
  return isCommand(input, name)
}

/**
 * @description Archive `DECOMPRESS` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const archiveDecompressHandler = async (input) => {
  const props = input
    .substring(name.length + COMMAND_SEPARATOR.length)
    .trim()
    .split(COMMAND_SEPARATOR)

  const fileNameArchived = props[0]
  const fileName = props.slice(1).join(COMMAND_SEPARATOR)

  const pathToFileArchived = path.isAbsolute(fileNameArchived) ?
    path.resolve(fileNameArchived) : path.join(store.directory, fileNameArchived)

  const pathToFile = path.isAbsolute(fileName) ?
    path.resolve(fileName) : path.join(store.directory, fileName)

  const archive = await fs.open(pathToFileArchived, 'r')
  const file = await fs.open(pathToFile, 'w')

  const streamArchive = archive.createReadStream()
  const stream = file.createWriteStream()

  const archiveFile = zlib.createBrotliDecompress()

  await pipeline(streamArchive, archiveFile, stream)
}

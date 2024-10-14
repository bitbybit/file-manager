import { COMMAND_SEPARATOR, isCommand } from '../helpers/cli.js'
import { store } from '../store.js'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

export const name = 'hash'

/**
 * @description Is executed command `HASH`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandHash = (input) => {
  return isCommand(input, name)
}

/**
 * @description `HASH` command handler
 * @param {string} input
 * @param {string} algorithm
 * @returns {Promise<void>}
 */
export const hashHandler = async (input, algorithm = 'sha256') => {
  const props = input
    .substring(name.length + COMMAND_SEPARATOR.length)
    .trim()

  const pathToFile = path.isAbsolute(props) ?
    path.resolve(props) : path.join(store.directory, props)

  const file = await fs.open(pathToFile, 'r')

  const stream = file.createReadStream()

  const hash = crypto.createHash(algorithm)

  hash.setEncoding('hex')

  stream.pipe(hash)

  await new Promise((resolve, reject) => {
    stream.on('error', error => reject(error))

    stream.on('end', () => {
      hash.end()

      const result = hash.read()

      console.log(result)

      resolve()
    })
  })
}

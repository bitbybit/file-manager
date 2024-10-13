import { isCommand } from '../../helpers/common.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const name = 'cat'

/**
 * @description Is executed command `CAT`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandFsCat = (input) => {
  return isCommand(input, name)
}

/**
 * @description FS `CAT` command handler
 * @param {string} input
 * @returns {Promise<void>}
 */
export const fsCatHandler = async (input) => {
  const props = input.substring(name.length).trim()

  const pathToFile = path.isAbsolute(props) ?
    path.resolve(props) : path.join(store.directory, props)

  const file = await fs.open(pathToFile, 'r')

  const stream = file.createReadStream()

  await new Promise((resolve, reject) => {
    const chunks = []

    stream.on('error', error => reject(error))

    stream.on('data', (chunk) => {
      chunks.push(chunk)
    });

    stream.on('end', () => {
      const content = chunks.join()

      console.log(content)

      resolve()
    })
  })
}

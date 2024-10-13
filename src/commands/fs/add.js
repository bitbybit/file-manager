import { isCommand } from '../../helpers/common.js'
import { isForbiddenFileName } from '../../helpers/fs.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const name = 'add'

/**
 * @description Is executed command `ADD`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandFsAdd = (input) => {
  return isCommand(input, name)
}

/**
 * @description FS `ADD` command handler
 * @param {string} input
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const fsAddHandler = async (input) => {
  const props = input.substring(name.length).trim()

  if (isForbiddenFileName(props)) {
    throw new Error(`${props} is not a valid file name`)
  }

  const pathToFile = path.join(store.directory, props)

  await fs.writeFile(pathToFile, '', { flag: 'wx' })
}

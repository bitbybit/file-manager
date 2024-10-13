import { isCommand } from '../../helpers/common.js'
import { getFileType } from '../../helpers/fs.js'
import { store } from '../../store.js'
import fs from 'node:fs/promises'

export const name = 'ls'

/**
 * @description Is executed command `LS`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandNavigationLs = (input) => {
  return isCommand(input, name)
}

/**
 * @description Navigation `LS` command handler
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const navigationLsHandler = async () => {
  const files = await fs.readdir(store.directory, {
    withFileTypes: true
  })

  const result = files
    .map((file) => ({
      Name: file.name,
      Type: getFileType(file)
    }))
    .sort((a, b) => a.Type.localeCompare(b.Type))

  console.table(result)
}

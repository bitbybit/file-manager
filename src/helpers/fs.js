import fs from 'node:fs/promises'

/**
 * @description Try to access specified path
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
export const canAccessPath = async (path) => {
  let canAccess = true

  try {
    await fs.access(path)
  } catch (e) {
    if (e?.code === 'ENOENT') {
      canAccess = false
    } else {
      throw e
    }
  }

  return canAccess
}

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

/**
 * @description Check if path is a directory
 * @param {string} path
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
export const isDirectory = async (path) => {
  try {
    const stat = await fs.stat(path)

    return stat.isDirectory()
  } catch (e) {
    if (e?.code === 'ENOENT') {
      return false
    } else {
      throw e
    }
  }
}

/**
 * @description Get file type description
 * @param {Dirent} file
 * @returns {string}
 */
export const getFileType = (file) => {
  switch (true) {
    case file.isFile():
      return 'file'

    case file.isDirectory():
      return 'directory'

    case file.isSymbolicLink():
      return 'symbolic link'

    default:
      return 'unknown'
  }
}

/**
 * @description Validate entered file name
 * @param {string} fileName
 * @returns {boolean}
 */
export const isForbiddenFileName = (fileName) => {
  return (fileName.match(/[\/\\:]/)?.length ?? 0) > 0
}

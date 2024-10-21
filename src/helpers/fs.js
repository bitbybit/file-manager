import { pipeline } from 'node:stream/promises'
import fs from 'node:fs/promises'
import path from 'node:path'

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

/**
 * @description Copy file to specified directory using Readable and Writable streams
 * @param {Object} payload
 * @param {string} payload.pathToFile
 * @param {string} payload.pathToDirectory
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const copyFileToDirectory = async ({
  pathToFile,
  pathToDirectory
}) => {
  const isNotFile = await isDirectory(pathToFile)

  if (isNotFile) {
    throw new Error(`${pathToFile} is not a file`)
  }

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

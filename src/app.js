import { EOL } from 'node:os'
import {
  displayGoodbye,
  displayGreeting,
  displayOperationFailed,
  displayWorkingDirectory
} from './helpers/common.js'
import { store } from './store.js'
import { unknownHandler } from './commands/unknown.js'
import { isCommandNavigationUp, navigationUpHandler } from './commands/navigation/up.js'
import { isCommandNavigationCd, navigationCdHandler } from './commands/navigation/cd.js'
import { isCommandNavigationLs, navigationLsHandler } from './commands/navigation/ls.js'
import { fsCatHandler, isCommandFsCat } from './commands/fs/cat.js'
import { fsAddHandler, isCommandFsAdd } from './commands/fs/add.js'

/**
 * @description After program work finished (`ctrl` + `c` pressed or user sent `.exit` command into console) the program displays the following text in the console
 */
const exitHandler = () => {
  displayGoodbye()

  process.exit(0)
}

/**
 * @description Executed command handler
 * @param {string} input
 * @returns {Promise<void>}
 */
const commandHandler = async (input) => {
  try {
    switch (true) {
      case isCommandNavigationUp(input):
        await navigationUpHandler()
        break

      case isCommandNavigationCd(input):
        await navigationCdHandler(input)
        break

      case isCommandNavigationLs(input):
        await navigationLsHandler()
        break

      case isCommandFsCat(input):
        await fsCatHandler(input)
        break

      case isCommandFsAdd(input):
        await fsAddHandler(input)
        break

      default:
        await unknownHandler()
        break
    }
  } catch {
    displayOperationFailed()
  } finally {
    displayWorkingDirectory(store.directory)
  }
}

/**
 * @description Input handler
 * @param chunk
 * @returns {Promise<void>}
 */
const inputHandler = async (chunk) => {
  const input = chunk.toString()

  const isClosing = input === `.exit${EOL}` || input === `exit${EOL}`

  if (isClosing) {
    exitHandler()
  } else {
    await commandHandler(input)
  }
}

/**
 * @description Initialize an app
 */
const app = () => {
  displayGreeting()
  displayWorkingDirectory(store.directory)

  process.stdin.on('data', inputHandler)
  process.on('SIGINT', exitHandler)
}

app()

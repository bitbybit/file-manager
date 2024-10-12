import { EOL } from 'node:os'
import {
  displayGoodbye,
  displayGreeting,
  displayOperationFailed,
  displayWorkingDirectory
} from './helpers/common.js'
import { store } from './store.js'
import { isCommandNavigationUp, navigationUpHandler } from './commands/navigation/up.js'
import { unknownHandler } from './commands/unknown.js'

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

      default:
        unknownHandler()
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
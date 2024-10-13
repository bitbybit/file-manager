import { getArgsValue } from './cli.js'

const USERNAME_ARG_DEFAULT = '--username'

export const COMMAND_SEPARATOR = ' '

/**
 * @description Display greeting message
 * @param {string} userNameArg
 */
export const displayGreeting = (userNameArg = USERNAME_ARG_DEFAULT) => {
  const userName = getArgsValue(userNameArg)

  console.log(`Welcome to the File Manager, ${userName}!`)
}

/**
 * @description Display goodbye message
 * @param {string} userNameArg
 */
export const displayGoodbye = (userNameArg = USERNAME_ARG_DEFAULT) => {
  const userName = getArgsValue(userNameArg)

  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
}

/**
 * @description Display invalid input message
 */
export const displayInvalidInput = () => {
  console.log('Invalid input')
}

/**
 * @description Display operation failed message
 */
export const displayOperationFailed = () => {
  console.log('Operation failed')
}

/**
 * @description Display current working directory message
 * @param {string} path
 */
export const displayWorkingDirectory = (path) => {
  console.log(`You are currently in ${path}`)
}

/**
 * @description Determine which command was executed
 * @param {string} input
 * @param {string} name
 * @returns {boolean}
 */
export const isCommand = (input, name) => {
  return input.toLowerCase().startsWith(name)
}

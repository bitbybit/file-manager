import { ARG_NAME_USERNAME, getArgsValue } from './cli.js'

/**
 * @description Display greeting message
 * @param {string} userNameArg
 */
export const displayGreeting = (userNameArg = ARG_NAME_USERNAME) => {
  const userName = getArgsValue(userNameArg)

  console.log(`Welcome to the File Manager, ${userName}!`)
}

/**
 * @description Display goodbye message
 * @param {string} userNameArg
 */
export const displayGoodbye = (userNameArg = ARG_NAME_USERNAME) => {
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

import { store } from '../store.js'

/**
 * @description Display greeting message
 * @param {string} userName
 */
export const displayGreeting = (userName = store.userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`)
}

/**
 * @description Display goodbye message
 * @param {string} userName
 */
export const displayGoodbye = (userName = store.userName) => {
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
 * @param {string} directory
 */
export const displayWorkingDirectory = (directory = store.directory) => {
  console.log(`You are currently in ${directory}`)
}

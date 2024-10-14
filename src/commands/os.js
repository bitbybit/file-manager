import { COMMAND_SEPARATOR, isCommand } from '../helpers/cli.js'
import { displayInvalidInput } from '../helpers/messages.js'
import { hasPropEol, osEolHandler } from './os/eol.js'
import { hasPropCpus, osCpusHandler } from './os/cpus.js'
import { hasPropHomedir, osHomeDirHandler } from './os/homedir.js'
import { hasPropUsername, osUsernameHandler } from './os/username.js'
import { hasPropArchitecture, osArchitectureHandler } from './os/architecture.js'

export const name = 'os'

/**
 * @description Is executed command `OS`
 * @param {string} input
 * @returns {boolean}
 */
export const isCommandOs = (input) => {
  return isCommand(input, name)
}

/**
 * @description `OS` command handler
 * @param {string} input
 * @returns {Promise<void>}
 */
export const osHandler = async (input) => {
  const props = input
    .substring(name.length + COMMAND_SEPARATOR.length)
    .trim()

  switch (true) {
    case hasPropEol(props):
      osEolHandler()
      break

    case hasPropCpus(props):
      osCpusHandler()
      break

    case hasPropHomedir(props):
      osHomeDirHandler()
      break

    case hasPropUsername(props):
      osUsernameHandler()
      break

    case hasPropArchitecture(props):
      osArchitectureHandler()
      break

    default:
      displayInvalidInput()
      break
  }
}

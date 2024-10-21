import { hasProp } from '../../helpers/cli.js'
import { homedir } from 'node:os'

export const prop = 'homedir'

/**
 * @description Check if property `homedir` was provided
 * @param {string} props
 */
export const hasPropHomedir = (props) => {
  return hasProp(props, prop)
}

/**
 * @description Display home directory
 */
export const osHomeDirHandler = () => {
  console.log(homedir())
}

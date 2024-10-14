import { hasProp } from '../../helpers/cli.js'
import { arch } from 'node:os'

export const prop = 'architecture'

/**
 * @description Check if property `architecture` was provided
 * @param {string} props
 */
export const hasPropArchitecture = (props) => {
  return hasProp(props, prop)
}

/**
 * @description Display CPU architecture for which Node.js binary has compiled
 */
export const osArchitectureHandler = () => {
  console.log(arch())
}

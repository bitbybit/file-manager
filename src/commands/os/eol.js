import { hasProp } from '../../helpers/cli.js'
import { EOL} from 'node:os'

export const prop = 'EOL'

/**
 * @description Check if property `EOL` was provided
 * @param {string} props
 */
export const hasPropEol = (props) => {
  return hasProp(props, prop)
}

/**
 * @description Display EOL (default system End-Of-Line)
 */
export const osEolHandler = () => {
  console.log(EOL)
}

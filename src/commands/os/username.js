import { hasProp } from '../../helpers/cli.js'
import { userInfo } from 'node:os'

export const prop = 'username'

/**
 * @description Check if property `username` was provided
 * @param {string} props
 */
export const hasPropUsername = (props) => {
  return hasProp(props, prop)
}

/**
 * @description Display current system user name
 */
export const osUsernameHandler = () => {
  const { username } = userInfo()

  console.log(username)
}

export const COMMAND_SEPARATOR = ' '

export const ARG_SEPARATOR = '='
export const ARG_PREFIX = '--'

export const ARG_NAME_USERNAME = `${ARG_PREFIX}username`

/**
 * @description Determine which command was executed
 * @param {string} input
 * @param {string} name
 * @returns {boolean}
 */
export const isCommand = (input, name) => {
  return input.toLowerCase().startsWith(name)
}

/**
 * @description Get value of the specified CLI argument formatted as `--key=value`
 * @param {string} argsKey
 * @param {string} separator
 * @returns {undefined|string}
 */
export const getArgsValue = (argsKey, separator = ARG_SEPARATOR) => {
  const args = process.argv

  return args.find((item) => item.startsWith(argsKey))?.split(separator)?.[1]
}

/**
 * @description Check if property was provided
 * @param {string} props
 * @param {string} propKey
 * @returns {boolean}
 */
export const hasProp = (props, propKey) => {
  return props
    .split(COMMAND_SEPARATOR)
    .find(
      (prop) => prop === `${ARG_PREFIX}${propKey}`
    ) !== undefined
}

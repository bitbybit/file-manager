/**
 * @description Get value of the specified CLI argument formatted as `--key=value`
 * @param {string} argsKey
 * @param {string} separator
 * @returns {undefined|string}
 */
export const getArgsValue = (argsKey, separator = '=') => {
  const args = process.argv

  return args.find((item) => item.startsWith(argsKey))?.split(separator)?.[1]
}

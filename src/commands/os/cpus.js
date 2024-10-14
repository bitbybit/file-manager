import { hasProp } from '../../helpers/cli.js'
import { cpus } from 'node:os'

export const prop = 'cpus'

/**
 * @description Check if property `cpus` was provided
 * @param {string} props
 */
export const hasPropCpus = (props) => {
  return hasProp(props, prop)
}

/**
 * @description Display host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
 */
export const osCpusHandler = () => {
  const cores = cpus()
  const amount = cores.length

  console.log(`Amount of CPUS: ${amount}`)

  for (const core of cores) {
    const model = core.model
    const clockRate = (core.speed / 1000).toFixed(2)

    console.log(`${model} (Clock rate is ${clockRate} GHz)`)
  }
}

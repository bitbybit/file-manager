import path from 'node:path'
import { spawn } from 'node:child_process'

const appPath = `${import.meta.dirname}/app.js`

/**
 * @description Receives array of arguments `args` and creates child process from argument `app`, passing these `args` to it. This function creates IPC-channel between `stdin` and `stdout` of master process and child process:
 *  - child process `stdin` receives input from master process `stdin`
 *  - child process `stdout` sends data to master process `stdout`
 * @param {Object} payload
 * @param {string[]} payload.args
 * @param {string} payload.app
 */
const spawnApp = ({
  args,
  app
} = {
  args: process.argv.slice(2),
  app: path.resolve(appPath)
}) => {
  spawn('node', [app, ...args], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
}

spawnApp()

import { homedir } from 'node:os'
import { ARG_NAME_USERNAME, getArgsValue } from './helpers/cli.js'

export const store = {
  directory: '',
  userName: ''
}

export const setUserName = () => {
  store.userName = getArgsValue(ARG_NAME_USERNAME)
}

export const setDefaultDirectory = () => {
  store.directory = homedir()
}

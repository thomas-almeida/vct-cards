import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const teamsDB = path.join(__dirname, '..', 'db', 'teams.json')
const playersDB = path.join(__dirname, '..', 'db', 'players.json')


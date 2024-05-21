import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import generateId from '../scripts/generateId.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const teamsDB = path.join(__dirname, '..', 'db', 'teams.json')
const playersDB = path.join(__dirname, '..', 'db', 'players.json')
const packsDB = path.join(__dirname, '..', 'db', 'packs.json')

//pacote de regiao
//pacote de time (bem mais caro)
//✅ pacote por OV (preço relativo)

async function createNewPacks() {

    let teams = []
    let packs = []
    let players = []

    const teamsData = fs.readFileSync(teamsDB, 'utf-8')
    const playersData = fs.readFileSync(playersDB, 'utf-8')
    const packsData = fs.readFileSync(packsDB, 'utf-8')

    players = playersData ? JSON.parse(playersData) : []
    teams = teamsData ? JSON.parse(teamsData) : []
    packs = packsData ? JSON.parse(packsData) : []

    // begginner pack ov <> 30 && 65
    // medium pack ov <> 65 && 72
    // high pack ov <> 72 && 79
    // pro pack ov <> 79 && 86

    let begginnerPack = {
        id: generateId.generateExtenseId(packs),
        name: "Begginner Pack",
        description: "Pacote de primeiros jogadores",
        value: 5000,
        isOpened: false,
        content: []
    }

    let mediumPack = {
        id: generateId.generateExtenseId(packs),
        name: "Medium Pack",
        description: "Pacote de jogadores MID tier",
        value: 7000,
        isOpened: false,
        content: []
    }

    let highPack = {
        id: generateId.generateExtenseId(packs),
        name: "High Pack",
        description: "Pacote de jogadores HIGH tier",
        value: 12000,
        isOpened: false,
        content: []
    }

    let proPack = {
        id: generateId.generateExtenseId(packs),
        name: "Pro Pack",
        description: "Pacote dos melhores jogadores de Valorant",
        value: 25000,
        isOpened: false,
        content: []
    }

    players.forEach((player, index) => {

        let currentPlayer = players[index]

        if (currentPlayer.overall >= 30 && currentPlayer.overall <= 65) {
            begginnerPack.content.push(players[index])
        }

        if (currentPlayer.overall >= 65 && currentPlayer.overall <= 72) {
            mediumPack.content.push(players[index])
        }

        if (currentPlayer.overall >= 72 && currentPlayer.overall <= 79) {
            highPack.content.push(players[index])
        }

        if (currentPlayer.overall >= 79 && currentPlayer.overall <= 86) {
            proPack.content.push(players[index])
        }

    })

    packs.push(begginnerPack)
    packs.push(mediumPack)
    packs.push(highPack)
    packs.push(proPack)

    fs.writeFileSync(packsDB, JSON.stringify(packs), null, 2)
}

createNewPacks()
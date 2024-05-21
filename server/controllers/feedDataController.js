import generateId from '../scripts/generateId.js'
import agentData from '../scripts/agents.js'

import api from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'players.json')
const dbTeams = path.join(__dirname, '..', 'db', 'teams.json')
const dbCountries = path.join(__dirname, '..', 'db', 'countries.json')


async function bruteCollect() {
    const response = await api.get('https://www.vlr.gg/stats')
    const $ = cheerio.load(response.data)

    const playerRow = $('tr')
    let players = []

    playerRow.each((_, element) => {

        const playerData = {
            id: null,
            name: '',
            overall: 0,
            acs: 0,
            kd: 0,
            kast: '',
            adr: 0,
            agents: '',
            country: '',
            link: '',
            teamLink: '',
            playerPicture: '',
            teamPicture: '',
            teamName: '',
            rating: 0
        }

        const $element = $(element)

        let classimg = $element.find('.mod-player i').attr("class")
        let imageCountry = `https://www.vlr.gg/img/icons/flags/16/${classimg}`

        playerData.id = generateId.generateUniqueId(players)

        playerData.name = `${$element.find('.text-of').text().trim().replace(/\n/g, '').replace(/\t/g, '')} ${$element.find('.stats-player-country').text().trim().replace(/\n/g, '').replace(/\t/g, '')}`;
        playerData.rating = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(0, 4) ? $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(0, 4) : '0.45'
        playerData.acs = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(4, 9) ? $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(4, 9) : '100'
        playerData.kd = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(9, 13) ? $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(9, 13) : '0.50'
        playerData.kast = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(13, 16) ? $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(13, 16) : '25%'
        playerData.adr = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(16, 21) ? $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(16, 21) : '40'
        playerData.agents = `https://www.vlr.gg/${$element.find('.mod-agents div img').attr("src")}`
        playerData.country = `${imageCountry.replace('flag mod-', '')}.png`
        playerData.link = `https://www.vlr.gg${$element.find('.mod-player a').attr("href")}`

        if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf-8')
            players = data ? JSON.parse(data) : []
        }

        players.push(playerData)
        fs.writeFileSync(dbPath, JSON.stringify(players, null, 2), 'utf-8')
    })

    console.log(players)
}

async function collectImages() {

    let players = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    players = data ? JSON.parse(data) : []

    players.forEach(async (player, index) => {

        const currentPlayer = players[index]
        const response = await api.get(player.link)
        const $ = cheerio.load(response.data)
        const playerInfo = $('.col-container')

        playerInfo.each((_, element) => {

            const $element = $(element)
            let playerImage = $element.find('.wf-avatar img').attr("src")
            let playerName = $element.find('.wf-title').text().trim().replace(/\n/g, '').replace(/\t/g, '')
            let teamImage = $element.find('.wf-module-item img').attr("src")
            let teamLink = $element.find('.wf-module-item').attr("href")

            if (playerImage.includes('ph/sil')) {
                playerImage = 'https://www.vlr.gg/img/base/ph/sil.png'
            } else {
                playerImage = `https:${$element.find('.wf-avatar img').attr("src")}`
            }

            console.log({
                img: 'https:' + teamImage,
                name: teamLink
            })

            currentPlayer.playerPicture = playerImage
            currentPlayer.teamPicture = `https:${teamImage}`
            currentPlayer.teamLink = `https://www.vlr.gg${teamLink}`
            currentPlayer.name = playerName

            // fs.writeFileSync(dbPath, JSON.stringify(players, null, 2))
        })

    })

}

async function getTeamFullName() {
    let players = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    players = data ? JSON.parse(data) : []

    players.forEach(async (player, index) => {
        const currentPlayer = players[index]
        console.log(player.teamName)
        const response = await api.get(player.teamName)
        const $ = cheerio.load(response.data)
        const teamInfo = $('.team-header')

        teamInfo.each((_, element) => {
            const $element = $(element)
            let teamName = $element.find('.team-header-name h1').text()
            let teamCountry = $element.find('.team-header-country').text()
            console.log(teamName)
            currentPlayer.teamName = teamName

            //fs.writeFileSync(dbPath, JSON.stringify(players, null, 2))
        })

    })
}

async function calculateOverAll() {

    let players = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    players = data ? JSON.parse(data) : []


    players.forEach(async (player, index) => {

        const currentPlayer = players[index]

        // OV = (Rating - 0.00) / (1.50 - 0.00) * 100
        let overall = ((currentPlayer.rating - 0.00) / (1.5 - 0.00) * 100)

        currentPlayer.overall = overall.toFixed(0)
        fs.writeFileSync(dbPath, JSON.stringify(players, null, 2))
    })
}

async function feedTeams() {

    let players = []
    let vutTeams = []
    let teams = {}
    let teamNames = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    const teamData = fs.readFileSync(dbTeams, 'utf-8')

    players = data ? JSON.parse(data) : []
    vutTeams = teamData ? JSON.parse(teamData) : []

    players.forEach((player, index) => {

        let team = players[index].teamName

        if (teams[team] !== undefined) {
            teams[team]++
        } else {
            teams[team] = 1
        }
    })

    Object.keys(teams).forEach((item) => {
        teamNames.push(item)
    })

    for (let i = 0; i <= teamNames.length; i++) {
        let teamInfo = {
            teamName: '',
            teamPicture: '',
            teamPlayers: [],
            teamOverall: 0,
            teamCountry: '',
            link: '',
            region: ''
        }

        teamInfo.teamName = teamNames[i]
        players.forEach((player, index) => {
            if (players[index].teamName === teamNames[i]) {
                teamInfo.teamPlayers.push(players[index])
                teamInfo.teamPicture = players[index].teamPicture
                teamInfo.link = players[index].teamLink
            }
        })
        teamInfo.teamOverall = (teamInfo.teamPlayers.reduce((sum, player) => sum + parseInt(player.overall), 0) / teamInfo.teamPlayers.length).toFixed(0)

        vutTeams.push(teamInfo)
    }

    console.log(vutTeams)
    fs.writeFileSync(dbTeams, JSON.stringify(vutTeams, null, 2))

}

function onlyBruteCaps(string) {
    return string.replace(/[^A-Z]+/g, " ")
}

async function feedCountries() {
    let players = []
    let countries = []
    let allCountries = []
    let country = {}

    const data = fs.readFileSync(dbPath, 'utf-8')
    const countrieData = fs.readFileSync(dbCountries, 'utf-8')

    players = data ? JSON.parse(data) : []
    countries = countrieData ? JSON.parse(countrieData) : []

    players.forEach(async (player, index) => {

        const currentPlayer = players[index]
        const response = await api.get(player.link)
        const $ = cheerio.load(response.data)

        const playerInfo = $('.player-header')

        playerInfo.each((_, element) => {
            const $element = $(element)

            let countryName = ""
            let classimg = $element.find('.ge-text-light').children().attr("class")
            let imageCountry = `https://www.vlr.gg/img/icons/flags/16/${classimg}`
            let countryBruteData = onlyBruteCaps($element.find('.ge-text-light').text().trim().replace(/\n/g, '').replace(/\t/g, ''))
            let flag = `${imageCountry.replace('flag mod-', '')}.png`

            countries.forEach(country => {
                if (countryBruteData.toLowerCase().includes(country.name.toLowerCase())) {
                    countryName = country.name
                }
            })

            country = {
                name: countryName,
                flag: flag
            }

            allCountries.push(country)
            currentPlayer.country = country
            fs.writeFileSync(dbPath, JSON.stringify(players), null, 2)
        })


    })

}

async function groupTeamsByRegion() {

    let teams = []
    const data = fs.readFileSync(dbTeams, 'utf-8')
    teams = data ? JSON.parse(data) : []

    teams.forEach(async (team, index) => {
        const currentTeam = teams[index]
        if (currentTeam.link !== '') {
            const response = await api.get(currentTeam.link)
            const $ = cheerio.load(response.data)
            const teamData = $('.team-header')

            let region = {
                name: '',
                flag: ''
            }

            let flagUrl = 'https://www.vlr.gg/img/icons/flags/16/'
            teamData.each((_, element) => {
                const $element = $(element)
                let name = $element.find('.team-header-country').text().trim()
                let flag = $element.find('.team-header-country i').attr("class")

                region.name = name
                region.flag = `${flagUrl}${flag.replace('flag mod-', '')}.png`

                currentTeam.region = region

                console.log(currentTeam)
                fs.writeFileSync(dbTeams, JSON.stringify(teams), null, 2)
            })
        }
    })

}

function teamPerRegion() {
    let teams = []
    let regions = {}
    let flags = {}

    const data = fs.readFileSync(dbTeams, 'utf-8')
    teams = data ? JSON.parse(data) : []

    teams.forEach((team, index) => {

        let regionName = teams[index].region.name
        let regionFlag = teams[index].region.flag

        if (regions[regionName] !== undefined) {
            regions[regionName]++
        } else {
            regions[regionName] = 1
        }

        if (flags[regionFlag] !== undefined) {
            flags[regionFlag]++
        } else {
            flags[regionFlag] = 1
        }

    })

    console.log({
        region: Object.keys(regions),
        flag: Object.keys(flags)
    })
}

function addAgentRole() {

    let teams = []
    const data = fs.readFileSync(dbTeams, 'utf-8')
    teams = data ? JSON.parse(data) : []

    teams.forEach((team, index) => {
        team.teamPlayers.forEach((player, index) => {
            let currentPlayer = player
            let agentName = player.agents.slice(40).replace('.png', '')
            agentData.agents.forEach(agent => {
                if (agentName === agent.name.toLocaleLowerCase()) {
                    currentPlayer.role = agent.role
                    fs.writeFileSync(dbTeams, JSON.stringify(teams), null, 2)
                }
            })
        })
    })

}

function addPriceToAPlayer() {

    let players = []
    const data = fs.readFileSync(dbPath, 'utf-8')
    players = data ? JSON.parse(data) : []

    players.forEach((player, index) => {

        let playerOverall = players[index].overall
        let coinUnit = 0

        if (playerOverall < 40) {
            coinUnit = 4
        } else if (playerOverall >= 40 && playerOverall < 59) {
            coinUnit = 6
        } else if (playerOverall >= 50 && playerOverall < 69) {
            coinUnit = 8
        } else if (playerOverall >= 69 && playerOverall < 79) {
            coinUnit = 12
        } else if (playerOverall >= 79 && playerOverall < 89) {
            coinUnit = 15
        } else if (playerOverall >= 89) {
            coinUnit = 18
        }

        let playerValue = playerOverall * coinUnit
        players[index].value = playerValue

        fs.writeFileSync(dbPath, JSON.stringify(players), null, 2)
    })

}

//bruteCollect()
//collectImages()
//calculateOverAll()
//getTeamFullName()
//feedTeams()
//feedCountries()
//groupTeamsByRegion()
//teamPerRegion()
//addAgentRole()
addPriceToAPlayer()
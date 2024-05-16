const api = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../..', 'db', 'players.json')


function generateUniqueId(users) {
    let id = -1
    do {
        id++
    } while (users.some(user => user.id === id))
    return id
}

async function bruteCollect() {
    const response = await api.get('https://www.vlr.gg/stats/?event_group_id=all&event_id=2004&series_id=all&region=all&country=all&min_rounds=200&min_rating=1550&agent=all&map_id=all&timespan=60d')
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
            playerPicture: '',
            teamPicture: '',
            rating: 0
        }

        const $element = $(element)

        let classimg = $element.find('.mod-player i').attr("class")
        let imageCountry = `https://www.vlr.gg/img/icons/flags/16/${classimg}`

        playerData.id = generateUniqueId(players)

        playerData.name = `${$element.find('.text-of').text().trim().replace(/\n/g, '').replace(/\t/g, '')} ${$element.find('.stats-player-country').text().trim().replace(/\n/g, '').replace(/\t/g, '')}`;
        playerData.rating = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(0, 4)
        playerData.acs = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(4, 9)
        playerData.kd = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(9, 13)
        playerData.kast = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(13, 16)
        playerData.adr = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(16, 21)
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
            let teamImage = $element.find('.wf-module-item img').attr("src")

            if (playerImage.includes('ph/sil')) {
                playerImage = 'https://www.vlr.gg/img/base/ph/sil.png'
            } else {
                playerImage = `https:${$element.find('.wf-avatar img').attr("src")}`
            }

            console.log('https:' + teamImage)

            currentPlayer.playerPicture = playerImage
            currentPlayer.teamPicture = `https:${teamImage}`
            fs.writeFileSync(dbPath, JSON.stringify(players, null, 2))
        })

    })

}

async function calculateOverAll() {

    let players = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    players = data ? JSON.parse(data) : []
    

    players.forEach(async (player, index) => {

        // OV = (Rating - 0.00) / (1.50 - 0.00) * 100
        const currentPlayer = players[index]
        let overall = ((currentPlayer.rating - 0.00) / (1.5 - 0.00) * 100)

        currentPlayer.overall = overall.toFixed(0)
        fs.writeFileSync(dbPath, JSON.stringify(players, null, 2))
    })
}

//bruteCollect()
//collectImages()
//calculateOverAll()

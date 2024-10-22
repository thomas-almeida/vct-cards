import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import generateId from '../scripts/generateId.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const teamsDB = path.join(__dirname, '..', 'db', 'teams.json')
const usersDB = path.join(__dirname, '..', 'db', 'users.json')
const packsDB = path.join(__dirname, '..', 'db', 'packs.json')
const marketDB = path.join(__dirname, '..', 'db', 'market.json')

async function playersByRegion(req, res) {

    try {

        const region = req.params.region.toLowerCase().replace(/\s/g, '-')
        const userId = req.params.userId

        let teams = []
        let users = []
        let teamByRegion = []
        let players = []
        let randomPlayers = []
        let role = {}

        const teamData = fs.readFileSync(teamsDB, 'utf-8')
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        teams = teamData ? JSON.parse(teamData) : []
        users = usersData ? JSON.parse(usersData) : []

        const userExist = users.some(user => user.id === userId)

        if (!userExist) {
            return res.status(409).json({ message: 'user not exist' })
        }

        teams.forEach(team => {

            console.log(team?.region?.name)
            let teamRegion = team?.region?.name.toLowerCase().replace(/\s/g, '-')

            let isPacific = region === 'pacific' && (teamRegion === 'singapore' || teamRegion === 'australia' || teamRegion === 'south-korea' || teamRegion === 'japan' || teamRegion === 'Bangladesh' || teamRegion === 'india' || teamByRegion === 'saudi-arabia')
            let isAmericas = region === 'americas' && (teamRegion === 'chile' || teamRegion === 'argentina' || teamRegion === 'canada' || teamRegion === 'brazil' || teamRegion === 'united-states' || teamRegion === 'mexico')
            let isChina = region === 'china' && (teamRegion === 'china')
            let isEmea = region === 'emea' && (teamRegion === 'europe')
            let isWorld = region === undefined  

            if (teamRegion === region || isAmericas || isEmea || isPacific || isChina || isWorld) {
                teamByRegion.push(team)
            }

        })

        teamByRegion.forEach(team => {
            team.teamPlayers.forEach(player => {
                players.push(player)
            })
        })

        while (randomPlayers.length < 7) {
            let index = Math.floor(Math.random() * players.length)
            let playerRole = players[index].role

            if (!role[playerRole]) {
                role[playerRole] = 1
            } else if (role[playerRole] < 3) {
                role[playerRole]++
            } else {
                continue
            }

            randomPlayers.push(players[index])
        }

        users.forEach((user, index) => {

            if (users[index].id === userId) {
                randomPlayers.forEach(player => {
                    users[index].team.players.push(player)
                })
            }

            fs.writeFileSync(usersDB, JSON.stringify(users), null, 2)
        })

        if (teamByRegion.length > 0) {
            return res.status(200).json({
                message: 'success',
                players: randomPlayers
            })
        } else {
            return res.status(409).json({ message: 'region not found, try again' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

async function getTeamPictures(req, res) {

    try {

        let teams = []

        let randomPictures = []
        const teamData = fs.readFileSync(teamsDB, 'utf-8')
        teams = teamData ? JSON.parse(teamData) : []

        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * teams.length)
            randomPictures.push({
                name: teams[randomIndex].teamName,
                picture: teams[randomIndex].teamPicture
            })
        }

        console.log(randomPictures)

        if (randomPictures.length > 0) {
            return res.status(200).json({
                message: 'success',
                pictures: randomPictures
            })
        } else {
            return res.status(409).json({
                message: 'team not found'
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }

}

async function chooseTeamPicture(req, res) {
    try {

        let users = []
        const { pictureLink, userId } = req.body
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        users = usersData ? JSON.parse(usersData) : []

        const userExist = users.some(user => user.id === userId)

        if (!userExist) {
            res.status(409).json({ message: 'user not found' })
        }

        users.forEach((user, index) => {
            if (users[index].id === userId) {
                users[index].team.picture = pictureLink
                fs.writeFileSync(usersDB, JSON.stringify(users), null, 2)
                return res.json({
                    message: 'success',
                    picture: pictureLink
                })
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

async function buyPack(req, res) {
    try {

        let users = []
        let packs = []

        const { userId, packId } = req.body
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        const packsData = fs.readFileSync(packsDB, 'utf-8')
        users = usersData ? JSON.parse(usersData) : []
        packs = packsData ? JSON.parse(packsData) : []

        const userExist = users.some(user => user.id === userId)
        let targetPack
        let targetUser

        if (!userExist) {
            res.status(409).json({ message: 'user not found' })
        }

        users.forEach((user, index) => {
            if (users[index].id === userId) {
                targetUser = users[index]
            }
        })

        packs.forEach((pack, index) => {
            if (packs[index].id === packId) {
                targetPack = packs[index]
            }
        })

        if (targetUser.coins >= targetPack.value) {

            let newCoinsBalance = targetUser.coins - targetPack.value
            targetUser.coins = newCoinsBalance
            targetUser.packs.push(targetPack)
            fs.writeFileSync(usersDB, JSON.stringify(users), null, 2)

            console.log(`User [${targetUser.id}]:${targetUser.name} bought a new pack: [${targetPack.id}]${targetPack.name}`)

            res.status(200).json({
                message: 'success',
                user: targetUser
            })

        } else {
            res.status(409).json({
                message: 'user not have coins for this transaction'
            })
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

async function openPack(req, res) {
    try {

        const { userId, packId } = req.body

        let users = []
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        users = usersData ? JSON.parse(usersData) : []

        const userExist = users.some(user => user.id === userId)

        if (!userExist) {
            res.status(409).json({ message: 'user not found' })
        }

        let targetUser
        let randomPackPlayer = []

        users.forEach((user, index) => {
            if (users[index].id === userId) {

                targetUser = users[index]

                targetUser.packs.forEach((pack, index) => {
                    if (pack.id === packId) {

                        while (randomPackPlayer.length < 5) {
                            let index = Math.floor(Math.random() * pack.content.length)
                            let playerInPack = pack.content[index]
                            randomPackPlayer.push(playerInPack)
                        }

                        randomPackPlayer.forEach(player => {
                            users[index].team.players.push(player)
                        })

                        targetUser.packs.splice(index, 1)

                        console.log(`player [${targetUser.id}]:${targetUser.name} open ${pack.id}:${pack.name} pack`)
                        fs.writeFileSync(usersDB, JSON.stringify(users), null, 2)
                    }
                })
            }
        })

        return res.status(200).json({
            message: 'success',
            pack: targetUser
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

async function sellPlayer(req, res) {
    try {

        const { userId, playerId } = req.body

        let users = []
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        users = usersData ? JSON.parse(usersData) : []

        let targetUser
        let targetPlayer

        users.forEach((user, index) => {

            if (users[index] === userId) {
                targetUser = users[index]
            }

            users[index].team.players.forEach((player, id) => {

                if (player.id === playerId) {
                    targetPlayer = player
                    users[index].coins += targetPlayer.value
                    users[index].team.players.splice(id, 1)

                    res.status(200).json({
                        message: 'success',
                        coinsGained: targetPlayer.value,
                        user: users[index]
                    })

                    fs.writeFileSync(usersDB, JSON.stringify(users, null, 2))
                }
            })

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server Error"
        })
    }
}

async function submitPlayerToMarket(req, res) {

    try {

        const { userId, playerId, tradeValue } = req.body

        let users = []
        let market = []
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        const marketData = fs.readFileSync(marketDB, 'utf-8')
        users = usersData ? JSON.parse(usersData) : []
        market = marketData ? JSON.parse(marketData) : []

        let targetUser
        let targetPlayer

        users.forEach((user, index) => {

            if (users[index] === userId) {
                targetUser = users[index]
            }

            users[index].team.players.forEach((player) => {

                if (player.id === playerId && player.inMarket === false) {

                    targetPlayer = player
                    player.inMarket = true

                    let tradeItem = {
                        id: generateId.generateExtenseId(market),
                        playerData: player,
                        tradeValue: tradeValue,
                        createdAt: new Date(),
                        user: {
                            id: users[index].id,
                            name: users[index].name,
                            team: users[index].team.name,
                            picture: users[index].team.picture
                        },
                        requests: [],
                        isOpened: true
                    }

                    market.push(tradeItem)

                    res.status(200).json({
                        message: 'success',
                        tradeItem: tradeItem
                    })

                    fs.writeFileSync(usersDB, JSON.stringify(users, null, 2))
                    fs.writeFileSync(marketDB, JSON.stringify(market, null, 2))
                }
            })

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'internal server error'
        })
    }

}

async function makeTradeRequest(req, res) {
    try {

        const { marketItemId, userId, userCoins } = req.body

        let marketItems = []
        let users = []
        const marketData = fs.readFileSync(marketDB, 'utf-8')
        const usersData = fs.readFileSync(usersDB, 'utf-8')
        marketItems = marketData ? JSON.parse(marketData) : []
        users = usersData ? JSON.parse(usersData) : []

        let targetItem

        marketItems.forEach((item, index) => {
            if (
                marketItems[index].id === marketItemId && 
                userCoins >= marketItems[index].tradeValue && 
                marketItems[index].isOpened === true
            ) {
                targetItem = marketItems[index]

                let requestData = {
                    id: generateId.generateExtenseId(marketItems[index].requests),
                    user: users.find(user => user.id === userId),
                    value: userCoins,
                    createdAt: new Date(),
                    isAccepted: false
                }

                marketItems[index].requests.push(requestData)

                res.status(200).json({
                    message: 'success',
                    request: requestData,
                    marketItem: marketItems[index]
                })

                fs.writeFileSync(marketDB, JSON.stringify(marketItems, null, 2))

            } else {
                res.status(409).json({
                    message: 'You do not have enough coins or this trade is closed'
                })
            }
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function acceptTradeRequests(req, res) {
    try {

        const { marketItemId, requestId, userBuyerId, userTraderId } = req.body

        let marketItems = []
        let users = []

        const marketData = fs.readFileSync(marketDB, 'utf-8')
        const usersData = fs.readFileSync(usersDB, 'utf-8')

        marketItems = marketData ? JSON.parse(marketData) : []
        users = usersData ? JSON.parse(usersData) : []

        let userBuyer = {}
        let userTrader = {}
        let playerBoughted = {}

        users.forEach((user, index) => {
            if (users[index].id === userBuyerId) {
                userBuyer = users[index]
            }
        })

        users.forEach((user, index) => {
            if (users[index].id === userTraderId) {
                userTrader = users[index]
            }
        })

        marketItems.forEach((item, index) => {
            if (marketItems[index].id === marketItemId) {
                marketItems[index].requests.forEach(request => {
                    if (request.id === requestId) {

                        playerBoughted = marketItems[index].playerData

                        marketItems[index].isOpened = false
                        playerBoughted.inMarket = false

                        userTrader.coins += request.value
                        userBuyer.coins -= request.value
                        userBuyer.team.players.push(playerBoughted)

                        const playerIndex = userTrader.team.players.findIndex(player => player.id === playerBoughted.id)
                        if (playerIndex !== -1) {
                            userTrader.team.players.splice(playerIndex, 1)
                        }

                    }
                })
            }

            fs.writeFileSync(usersDB, JSON.stringify(users, null, 2))
            fs.writeFileSync(marketDB, JSON.stringify(marketItems, null, 2))

            console.log(`Player [${playerBoughted.overall}]${playerBoughted.name} has traded between [${userTrader.id}]${userTrader.name} and [${userBuyer.id}]${userBuyer.name}`)
        })

        res.status(200).json({
            message: 'trade realized with success',
            playerBoughted: playerBoughted,
            userBuyer: userBuyer.name,
            userTrader: userTrader.name
        })

    } catch (error) {
        console.error(error)
        res.status(500)
    }
}

async function getMarketItems(req, res) {
    try {

        let market = []
        const marketData = fs.readFileSync(marketDB, 'utf-8')
        market = marketData ? JSON.parse(marketData) : []

        let items = []
        market.forEach((item, index) => {
            items.push(market[index])
        })

        res.status(200).json({
            message: 'success',
            items: items
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


export default {
    playersByRegion,
    getTeamPictures,
    chooseTeamPicture,
    buyPack,
    openPack,
    sellPlayer,
    submitPlayerToMarket,
    getMarketItems,
    makeTradeRequest,
    acceptTradeRequests
}
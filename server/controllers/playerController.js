import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const teamsDB = path.join(__dirname, '..', 'db', 'teams.json')
const usersDB = path.join(__dirname, '..', 'db', 'users.json')
const packsDB = path.join(__dirname, '..', 'db', 'packs.json')

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

            let teamRegion = team.region.name.toLowerCase().replace(/\s/g, '-')

            let isPacific = region === 'pacific' && (teamRegion === 'singapore' || teamRegion === 'australia' || teamRegion === 'south-korea' || teamRegion === 'japan' || teamRegion === 'Bangladesh' || teamRegion === 'india' || teamByRegion === 'saudi-arabia')
            let isAmericas = region === 'americas' && (teamRegion === 'chile' || teamRegion === 'argentina' || teamRegion === 'canada' || teamRegion === 'brazil' || teamRegion === 'united-states' || teamRegion === 'mexico')
            let isChina = region === 'china' && (teamRegion === 'china')
            let isEmea = region === 'emea' && (teamRegion === 'europe')

            if (teamRegion === region || isAmericas || isEmea || isPacific || isChina) {
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
                users[index].team.players.push(randomPlayers)
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

export default {
    playersByRegion,
    getTeamPictures,
    chooseTeamPicture,
    buyPack
}
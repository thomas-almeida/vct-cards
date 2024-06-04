import { Router } from "express"
import userController from "../controllers/userController.js"
import playerController from "../controllers/playerController.js"
//import matchController from "../controllers/matchController.js"

const api = Router()

//User
api.post('/users/sign-up', userController.signUp)
api.post('/users/sign-in', userController.signIn)
api.get('/users/get-user-by-id/:id', userController.getUser)

//game
api.get('/game/sort-players-by-region/:userId/:region', playerController.playersByRegion)
api.get('/game/get-team-pictures', playerController.getTeamPictures)
api.post('/game/choose-team-picture', playerController.chooseTeamPicture)
api.post('/game/buy-pack', playerController.buyPack)
api.post('/game/open-pack', playerController.openPack)
api.post('/game/sell-player', playerController.sellPlayer)
api.post('/game/market/submit-item', playerController.submitPlayerToMarket)
api.get('/game/market/get-market-items', playerController.getMarketItems)

// match AI RNG
//api.post('/match/testing-ai', matchController.testAI)

export default api
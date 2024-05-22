import { Router } from "express"
import userController from "../controllers/userController.js"
import playerController from "../controllers/playerController.js"

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

export default api
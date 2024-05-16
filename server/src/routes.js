import { Router } from "express"
import userController from "./controllers/userController"

const api = Router()

//User
api.post('/users/sign-up', userController.signUp)
api.post('/users/sing-in', userController.signIn)
api.get('/users/get-user-by-id/:id', userController.getUser)

export default api
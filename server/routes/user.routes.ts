import router from "express"
import { hashPassword } from "../middlewares/hashPass";
import { createUser, getAllUsers, loginUser, logoutUser } from "../controllers/user.controller";

const route = router()

route.post("/register", hashPassword, createUser);
route.post("/login", loginUser)
route.post("/logout", logoutUser)
route.get("/users", getAllUsers)


export default route
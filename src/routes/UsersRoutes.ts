import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { ensureAuthenticated } from "@/middlewares/EnsureAuthenticated"; 
import { verifyUserPermission } from "@/middlewares/VerifyUserPermission";

const usersRoutes = Router()
const usersController = new UsersController()


usersRoutes.post("/", 
    ensureAuthenticated,
    verifyUserPermission(["ADMIN"]),
    usersController.create)

usersRoutes.get("/",
    ensureAuthenticated,
    verifyUserPermission(["ADMIN", "MEMBER"]),
    usersController.findAll)

usersRoutes.patch("/:id",
    ensureAuthenticated,
    verifyUserPermission(["ADMIN"]),
    usersController.updatePermission
)

export {usersRoutes}
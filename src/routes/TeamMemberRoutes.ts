import { Router } from "express"
import { ensureAuthenticated } from "@/middlewares/EnsureAuthenticated"
import { verifyUserPermission } from "@/middlewares/VerifyUserPermission"
import { TeamMembersController } from "@/controllers/TeamMembersController"


const teamMemberRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMemberRoutes.post("/add", ensureAuthenticated, verifyUserPermission(["ADMIN"]), teamMembersController.addMembers)
teamMemberRoutes.get("/list", ensureAuthenticated, verifyUserPermission(["ADMIN"]), teamMembersController.findAllMembersTeam)


export {teamMemberRoutes}
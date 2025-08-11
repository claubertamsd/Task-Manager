import { Router } from "express";
import { usersRoutes } from "./UsersRoutes";
import { sessionsRoutes } from "./SessionRoutes";
import { teamRoutes } from "./TeamRoutes";
import { teamMemberRoutes } from "./TeamMemberRoutes";
import { taskRoutes } from "./TaskControllerRoutes";

const routes = Router()

routes.use("/user", usersRoutes)
routes.use("/login", sessionsRoutes)
routes.use("/team", teamRoutes)
routes.use("/team", teamMemberRoutes)
routes.use("/task", taskRoutes)
export {routes}
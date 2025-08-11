import { Router } from "express";
import { TaskController } from "@/controllers/TasksController";
import { verifyUserPermission } from "@/middlewares/VerifyUserPermission";
import { ensureAuthenticated } from "@/middlewares/EnsureAuthenticated";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserPermission(["ADMIN"]),
  taskController.createTask
);
taskRoutes.get("/",ensureAuthenticated, verifyUserPermission(["MEMBER", "ADMIN"]), taskController.findAllTasks);

export { taskRoutes };

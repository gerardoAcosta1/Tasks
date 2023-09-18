import { Router } from "express";
import { createUser, createCategory, createTask, getUserTasks, changeDone, deleteTask} from "./tasks.controllers.js";

const router = Router();

router.route('/users')
    .post(createUser)

router.route('/categories')
    .post(createCategory)

router.route('/task/:id')
    .post(createTask)
    .get(getUserTasks)
    .delete(deleteTask)

router.route('/done/:id')
    .put(changeDone)

export default router
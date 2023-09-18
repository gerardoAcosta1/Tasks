import Categorie from "./catagories.model.js";
import User from "./users.model.js";
import Task from "./tasks.model.js";

const initModels = () => {
    //relacions users y task, 
    //un usuario puede tener muchas tareas, y muchas tareas pueden pertenecer a muchos usuarios

    User.belongsToMany(Task, {through: 'users_tasks'});
    Task.belongsToMany(User, {through: 'users_tasks'});

    //relacion Task y categorie
    // una tarea puede tener muchas categorias y una categoria puede pertenecer a muchas tareas

    Task.belongsToMany(Categorie, {through: 'tasks_categories'});
    Categorie.belongsToMany(Task, {through: 'tasks_categories'});
}
export default initModels
import Task from "../models/tasks.model.js";
import User from "../models/users.model.js";
import Category from "../models/catagories.model.js";


const getUserTasks = async (req, res) => {

    try {

        const {id} = req.params

        const user = await User.findOne({

            where: {id},

            attributes: ["username"],

            include:[
                {
                    model:Task,
                    attributes: ["id","title","description","completed"],
                    include: [
                        {
                            model:Category,
                            attributes: ["name", "description"]
                        }
                    ]
                }
            ]
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        if(user.tasks.length == 0 || !user){
           return res.status(404).json({message: 'conflict, tasks not found for this user'})
        }
        res.json(user)

    } catch (error) {

        console.log(error)

        res.status(400).json(error)
    }
};

const createUser = async (req, res) => {

    try {

        const {username, email, password} = req.body

        const userFind = await User.findOne({

            where: {username: username},

        });

        if(userFind){

            res.status(409).json({err: 'conflict, because the user already exist'})
        }

        await User.create({username, email, password})

        res.json('created user')

    } catch (error) {

        res.status(400).json(error)
    }
};

const createCategory = async (req, res) => {

    try {

       const {name, description} = req.body

       const findCategory = await Category.findOne({

        where: {name: name}

       });

       if(findCategory){

        res.status(409).json({err: 'conflict, because the category already exist'})
       }

       await Category.create({name, description})

       res.json('created category')

    } catch (error) {

        res.status(400).json(error)
    }
};

const createTask = async (req, res) => {
    
    try {

       const {categoryId, ...task} = req.body

       const {id} = req.params 

       const findCategory = await Category.findOne({

        where: {id: categoryId}

       });

       const user = await User.findOne({

        where:{id}

       })

       if(!user){

        res.status(409).json({err: 'conflict, because the user are not exist'})
       }
       if(!findCategory){

        res.status(409).json({err: 'conflict, because the category are not exist'})
       }

       const newTask = await Task.create(task)

       await newTask.addCategory(findCategory)

       await user.addTask(newTask)

       res.json('created Task')

    } catch (error) {
     
        res.status(400).json(error)
    }
};

const changeDone = async (req, res) => {

    try {

        const {id} = req.params

        const {completed} = req.body

        let task = await Task.findOne({
            where: {id},
        })

        if(!task){

            res.status(404).json({err: 'conflict, because the task are not exist'})
        }
        
        task.completed = completed;
       
        await task.save();

        res.status(200).json({message: 'added new value'})

    } catch (error) {
       
        res.status(400).json(error)
    }
};

const deleteTask = async (req, res) => {
    try {
        
        const {id} = req.params

        await Task.destroy({
            where: {id}
        })
        res.status(200).json({message: 'destroyed'})
    } catch (error) {
        res.status(400).json(error)
    }
}
export { 

    getUserTasks,
    createUser,
    createCategory,
    createTask,
    changeDone,
    deleteTask
}
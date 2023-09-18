import express  from "express";
import 'dotenv/config';
import initModels from "./models/initModels.js";
import taskRoutes from "./components/tasks.routes.js"
import db from "./utils/database.js";
initModels();

const PORT = process.env.PORT || 8000;

db.authenticate()
.then(res => console.log('base de datos conectada correctamente'))
.catch(err => console.log(err))

db.sync()// force: borra toda la base de datos y la vuelve a crear
.then(() => console.log('Base de datos sincronizada'))
.catch(err => console.log(err))

const app = express();

app.use(express.json());

app.use(taskRoutes); 
app.get('/', (req, res) => {
    res.send('ok');
})
app.get('/users', (req, res) => {
    res.send('ok, users');
})

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})
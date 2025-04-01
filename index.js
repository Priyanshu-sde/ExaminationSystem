import express from 'express';
import userRoutes from './routes/users';

const app = express();
app.use(express.json());

app.use(userRoutes);

app.use("/", (req,res) => {
    res.json({message: "Hello there"})
});

app.listen(3000, ()=> {
    console.log("server started");
});
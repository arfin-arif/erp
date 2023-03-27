const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route");
const usersRoutes = require("./routes/users.route");
const errorHandler = require("./middleware/errorHandler");
const courseRoutes = require("./routes/course.route");
const semesterRegRouter = require("./routes/courseRegistation.route");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URL
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`DB Connected to ${uri}`);
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/registration", semesterRegRouter);



app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);


app.get('/', async (req, res) => {
    res.send('ERP Server is Running')
})



app.all('*', (req, res) => {
    res.send("No Route Found")
});

app.use(errorHandler); // global error handler 


// if any error occur that can't handel by express like database error
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    })
})


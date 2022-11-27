const express = require('express');
const bodyparser = require('body-parser');
const route = require("./routes/route");
const { default: mongoose } = require('mongoose');
const app = express()
var multer = require('multer');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(multer().any());


mongoose.connect("mongodb+srv://NikitaRoy23:Z3jVv5PFclEHjgDs@cluster0.pmjudc4.mongodb.net/internshipproject",{
    useNewUrlParser: true
})
    .then(() => console.log("Mongoose is connected"))
    .catch(err => console.log(err));

app.use("/", route)

app.listen(process.env.PORT || 3001, function () {
    console.log("Express app running on port" + (process.env.PORT || 3001))
})


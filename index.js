const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return Recipe.create({
      title: "Papas Fritas con Huevo y Jamón",
      level: "UltraPro Chef",
      ingredients: ["patatas", "huevo", "jamon", "aceite", "sal"],
      cuisine: "española",
      dishType: "main_course",
      image:
        "https://canalcocina.es/medias/_cache/zoom-ff9a680f7ec353b538d48c7f95353953-920-518.jpg",
      duration: 40,
      creator: "Arguiñano",
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100},  {new : true})
  })
  .then(()=>{
    return Recipe.findOneAndDelete({title:"Carrot Cake"})
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .then(()=>{
    console.log("La conexion se ha terminado");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

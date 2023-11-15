const mongoose =require('mongoose');

//ULR of mongoDB compass
// const mongoURI = "mongodb://localhost:27017/inotebook"
//ULR of mongoDB Atlas
const mongoURI = "mongodb+srv://ayushkanani711:SowhWPNoyRvHb4FF@cluster0.k7qqbvc.mongodb.net/iNotebook"


const connetToMongo = async () => {
        try {
            await mongoose.connect(mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB successfully.\n");
          } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
          }
        };
        
module.exports = connetToMongo;
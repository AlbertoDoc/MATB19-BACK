import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connect = async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@matb19-database.blqykb7.mongodb.net/?retryWrites=true&w=majority&appName=matb19-database`,
      {dbName: 'matb19-database'}
    );
    console.log("Banco conectado com sucesso!");
  } catch (error) {
    console.log(error)
  }
};

export default { connect };

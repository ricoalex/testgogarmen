var mysql = require('mysql');

const connectDB = async() => {

  try{
    const con = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "testgogarmen"
    });

    con.connect(err => {
      if(err) throw err;
      console.log("Connected");
    })
  } catch(err) {
    console.log(err.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
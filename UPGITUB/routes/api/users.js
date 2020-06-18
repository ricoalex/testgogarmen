const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// (1): require User Model
// const User    = require('../../models/User');
const jwt     = require('jsonwebtoken');
const config  = require('config');
const bcrypt = require('bcryptjs');
const connection = require('../../conn');

// @ route-> POST api/users
// @desc -> -> Register User
// @access -> Public

router.post('/', [
  check('username' , 'Nama Harus Di isi').notEmpty(),
  check('password' , 'Password minimal 6 atau lebih karakter').isLength({
    min: 6
  }),
  check('role','Pilih Role').notEmpty()
], 
// (2) menggunakan promise async/await
async(req, res) => {
  // handle request
  // console.log(req.body);return false;
  const errors  = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  //(3) : membuat variable menggunakan destructure
  // const { name, email, password } = req.body;
  // (4) : membuat try catch
  try {
    let username = req.body.name;
    const salt  = bcrypt.genSalt(10);
    let password = bcrypt.hash(req.body.password, salt);
    let role = req.body.role;
  
    let sql = `INSERT INTO users (username, password, role)
        values(?, ?, ?)`;
    // console.log(sql);
  
    let user = ((resolve) =>
        connection.query(sql,
            [username, password, role], function (error, rows) {
            if(error){
                //Check terlebih dahulu untuk data yang sudah ada.
                if(error.code === 'ER_DUP_ENTRY'){
                    return response.badRequest('', `Username ${username} telah digunakan!`, res)
                }

                //Jika bukan duplicate entry maka cetak error yang terjadi.
                console.log(error);
                return response.badRequest('', `${error}`, res)
            }

            return resolve({ username: username, password: password, role :  role});
        })
    );

    return response.ok(user, `Berhasil registrasi pengguna baru - ${username}`, res);
    // user exis
    // if (user) {
    //   return res.status(400).json({error : [{msg: "User email sudah terdaftar"}] });
    // }


    // Encrypt Password dengan bcrypt
    // // membuat format hash dengan "salt"
    // const salt  = await bcrypt.genSalt(10);

    // user.password = await bcrypt.hash(password, salt);

    // await user.save();

    // Return jsonwebtoken
    // const payload = {
    //   user : {
    //     id: user.id
    //   }
    // };
    // jwt.sign(
    //   payload, 
    //   config.get('jwtSecret'),
    //   {expiresIn: 360000},
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // )

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }

  // res.send('User Route');
});

//export route
module.exports = router;
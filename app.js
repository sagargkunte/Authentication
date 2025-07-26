const cookieparser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cookieparser()); //! This is required to parse the data like cookies

//? This is nothing but encrypting the password like sagar
// app.get("/", function (req, res) {
//   bcrypt.genSalt(10, (err, salt) => {
//     //* Output of console.log(salt) is $2b$10$CQYB/goPO49XfmRPUyK83O -> which is a random string
//     bcrypt.hash("sagar", salt, function (err, hash) {
//       //* assume sagar is password we have to encrypt it by using salt i.e, the out put is
//       console.log(hash); //* output => $2b$10$cris253XnVLEagOFzXOSyOG7E/SzS08zhd05PHxPlkMu/ncQFRb2a (which is nothing but the password sagar)
//     });
//   });

//   //? This is nothing but decripting the password like sagar
//   bcrypt.compare(
//     "sagar",
//     "$2b$10$cris253XnVLEagOFzXOSyOG7/SzS08zhd05PHxPlkMu/ncQFRb2a",
//     (err, res) => {
//       //? Comparing the two string "sagar" and "$2b$10$cris253XnVLEagOFzXOSyOG7E/  SzS08zhd05PHxPlkMu/ncQFRb2a" and result is stored in res
//       // res === true
//       console.log(res);
//     }
//   );
// });


app.get("/", function (req, res) {
  let token = jwt.sign({ email: "abcd@gmail.com" }, "thisIsSecretString");
  console.log(token); //? Output = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIiwiaWF0IjoxNzUzNTUwNjE2fQ.doJf4_W4ON4ayb6oEOzsVOLxwkKhgdD8G1foTXmtvUs
  res.cookie("token",token);
  res.send("Done");
});


app.get("/read",function (req,res){
    // console.log(req.cookies);
    let data = jwt.verify(req.cookies.token, "thisIsSecretString");
    console.log(data);
})

app.listen(3000);
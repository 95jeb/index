

const express = require ("express") 
const BodyParser = require("body-parser") 
const cors = require('cors') 
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')


const database = knex({
    client: 'mysql',
    // version: '15.1',
    
    connection: {  
        host : "process.env.HOST",
        user : "process.env.USERNAME",
        password : "process.env.PASSWORD",
        database : "process.env.DATABASE",
        timezone: 'utc',
        port: "3306"
}
  });  
  
    
  
const app = express()

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(cors())


// for login
app.get ('/' , (req,res)=>{
    res.send('hello')
})

app.post ('/signin', (req,res) => {
    const{email ,password} = req.body
    if (!email  || !password) {
        return res.status(400).json("incorrect form submission")
    }
  database.select('email' , "password")
  .from('login')
  .where('email' , "=" , email)
  .then(data =>{
    const isValid = true // bcrypt.compareSync(password , data[0].password)
    if (isValid) {
   
        res.status(200).json('log in successful')
        
    }else{
        res.status(400).json("Wrong credentials")
    }
  })
 
  
  .catch(err => res.status(400).json("Wrong credentials"))
})

// for register (if needed)

// app.post('/register',(req,res) =>{
//     const{email, name ,password} = req.body
//     if (!email || !name || !password) {
//         return res.status(400).json("incorrect form submission")
//     }
//     const hash = bcrypt.hashSync(password)
//     database.transaction(trx =>{
//         trx.insert({
//             password:hash,
//             email:email
//         })
//         .into('user_details') 
//         .then(loginEmail =>{
//             return trx('persons')
//             .insert({
//                 Email:email,
//                 Name:name
//             }) 
//             .then(user =>{ 
//                 res.status(200).json("success")
//                 })
//             })
//         .then(trx.commit)
//         .catch(trx.rollback)
//     })
//         .catch(err => res.status(400).json(err))
    
// })
// app.post("/update" , (req, res) =>{
//     const {companyname ,testname,item,itemid,refnumber,expires,certnumber} = req.body 
//    database('addcertificate')
//   .where("CertificateNumber", "=", certnumber)
//   .then(user=>{
//       const isCorrect = certnumber === user[0].CertificateNumber
//     if(isCorrect){
//     database('addcertificate')
//     .where("CertificateNumber", "=", certnumber)
//     .update({
//     CompanyName: companyname,
//     TestName: testname,
//     Item: item,
//     ItemIdentification : itemid,
//     RefNumber : refnumber,
//     Expires:expires
//   }).then(user =>{ 
//     res.status(200).json("user")
//     }) 
//     .catch(err=> res.status(400).json("error"))
//     }
    
//   })
//  .catch(err=> res.status(400).json("invalid"))
// })


   
app.listen(process.env.PORT || 3030)

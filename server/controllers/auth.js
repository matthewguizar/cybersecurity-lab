const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
         const existingUser = bcrypt.compareSync(password, users[i].hash)
         if (existingUser) {
            let userToReturn = {...users[i]}
           delete userToReturn.hash
         res.status(200).send(userToReturn)
         console.log('success')
         return
         }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body
      const salt = bcrypt.genSaltSync(5)
      const hash = bcrypt.hashSync(password, salt)
      let user = {
        username,
        email,
        firstName,
        lastName,
        hash
      }
        // console.log('Registering User')
        users.push(user)
        let userToReturn = {...user}
        delete userToReturn.hash
        res.status(200).send(userToReturn)
        return
     
      }
} 
    
    
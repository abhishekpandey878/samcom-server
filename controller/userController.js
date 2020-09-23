const User = require('../model/user');

/*
     @des Login to user DB.
*/
const login = async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        await user.generateAuthToken()

        res.send({ user })

    } catch (error) {
        res.status(400).send("Not a valid user")
    }

}

/*
     @des Signup to user DB.
*/
const signup = async(req, res) => {
     // Create a new user
     try {
         console.log(req.body)
        const { userName, email, password, mobile } = req.body
          const user = new User({ userName, email, password, mobile});
          const token = await user.generateAuthToken()
          await user.save()
          res.status(201).send({ user, token })
      } catch (error) {
          console.log(error)
          res.status(400).send(error)
      }
}

module.exports = { login, signup }
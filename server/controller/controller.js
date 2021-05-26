var Userdb = require ('../model/model');

// create and save new user
exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message : "Content Can not be empty !"});
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone_number: req.body.phone_number

    })

    //save user in bdd
    user
      .save(user)
      .then(data=>{
        res.send(data)
      })
      .catch(err=>{
          res.status(500).send({
              message: err.message || "Some error when creating this user"
          })
      });

}

// return all users
exports.find = (req, res)=>{
    Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "There is no users" })
            })
}

// modify a user
exports.update = (req, res)=>{
    //if request is empty
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error when updating user informations"})
        })
}

// delete a user
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
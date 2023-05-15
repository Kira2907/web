exports.addUser = async (req, res, next) =>{
    try
    {
        if(!req.body.phone)
        {
            throw new Error('phone number is mandatory')
        }
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phone;
    
        const data= await User.create( {name: name, email: email, phonenumber:phonenumber});
        res.status(200).json({newUserDetail: data});
    }
    catch(err){
        res.status(500).json({error:err});
    }    
};

exports.getUsers =  async (req, res, next) => {
    try{ 
        const users = await User.findAll();
        res.status(205).json({allUsers: users});
    }
    catch(err){
        res.status(500).json({error: err});
    } 
};

exports.deleteUser = async (req, res, next) => {
    try{
     if(!req.params.id)
     {
         console.log("Id is missing");
         res.status(400).json({err :'ID is missing'});
     }
     
     const uId = req.params.id;
     await User.destroy({where: {id: uId}});
     res.status(200);
    } 
    catch(err){
     console.log(err);
     res.status(500).json(err);
    }
     
 };
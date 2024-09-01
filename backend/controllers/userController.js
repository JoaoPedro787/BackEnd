const userModel = require('../models/userModel');

const getAllUsers = async(_req,res)=>{
    try{
        users = await userModel.getAllUsers();
        return res.status(200).json(users);
    }
    catch (err){
        return res.status(500).json({message: "Ocorreu um erro", error: err.message});
    };
};

const postUser = async (req, res) => {
    try {
        const { UserName, Email, Password } = req.body;

        await userModel.postUser( UserName, Email, Password );

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

    } catch (err) {
        return res.status(400).json({ message: "Ocorreu um erro", error: err.message });
    }
};


const putUser = async (req,res) =>{
    try{    
        const {ID} = req.params;
        const {UserName,Email,Password} = req.body;

        await userModel.putUser(ID,UserName,Email,Password);

        return res.status(204).json()
    }
    catch(err){
        return res.status(400).json({message: "Ocorreu um erro", error: err.message});
    }
};

const deleteUser = async (req,res) =>{
    try{
        const {ID} = req.params;
        await userModel.deleteUser(ID);
        
        return res.status(204).json()
    }catch (err){
        return res.status(400).json({message: "Ocorreu um erro", error: err.message});
    }
};

module.exports = {
    getAllUsers,
    postUser,
    putUser,
    deleteUser
}
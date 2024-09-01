const connection = require('./connection');

const getAllUsers = async () => {
    try {
        const [users] = await connection.execute('SELECT * FROM Usuarios');
        return users;
    } catch (error) {
        throw error;
    }
};

const postUser = async (name, email, password) => {
    try {
        const userInfo = [name, email, password];
        const [user] = await connection.execute(
            'INSERT INTO Usuarios (UserName, Email, Password) VALUES (?, ?, ?)',
            userInfo
        );
        return user;
        
    } catch (error) {
        throw error;
    }
};

const putUser = async (id,name,email,password)=>{
    try {
        const [result] = await connection.execute('UPDATE Usuarios SET Username = ?, Email = ?, Password = ? WHERE ID = ?',
        [name,email,password,id]);
    
        return result;
    }
    catch (error){
        throw error;
    };
};

const deleteUser = async (id) => {
    try{
        return await connection.execute('DELETE FROM Usuarios WHERE ID = ?',
        [id]
        );
        
    }catch (error){
        throw error;
    }
    
}
module.exports = {
    getAllUsers,
    postUser,
    putUser,
    deleteUser
};

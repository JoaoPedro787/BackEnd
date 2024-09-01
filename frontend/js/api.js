const fetchUsers = async () => {
    try {
        const res = await fetch('http://localhost:5000/users');
        const users = await res.json();
        return users;
    } catch (err) {
        console.log('Error', err);
    }
};

const fetchPostUser = async (name, email, password) => {
    try {
        const UserData = {
            UserName: name,
            Email: email,
            Password: password
        };

        return await fetch('http://localhost:5000/postUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserData)
        });
    } catch (err) {
        console.log('Error', err);
    }
};

const fetchDelUser = async (id) => {
    try {
        return await fetch(`http://localhost:5000/deleteUser/${id}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.log('Error', err);
    }
};

const fetchPutUser = async (id, name, email, password) => {
    try {
        const UserData = {
            UserName: name,
            Email: email,
            Password: password
        };
        return await fetch(`http://localhost:5000/updateUser/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserData)
        });
    } catch (err) {
        console.log('Error', err);
    }
};

export { fetchUsers, fetchPostUser, fetchDelUser, fetchPutUser };
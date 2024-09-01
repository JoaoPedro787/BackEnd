import { fetchUsers, fetchPostUser, fetchDelUser, fetchPutUser } from './api.js';

const txtName = document.querySelector('#txtUserName');
const txtEmail = document.querySelector('#txtEmail');
const txtPassword = document.querySelector('#txtPassword');
const btnAdd = document.querySelector('.add');
const btnBackup = btnAdd.innerHTML;
let editingUserId = null;

async function updateContent() {
    try {
        const users = await fetchUsers();
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        users.forEach(user => {
            const el = document.createElement('tr');
            el.innerHTML = `
                <td>${user.ID}</td>
                <td>${user.UserName}</td>
                <td>${user.Email}</td>
                <td>${user.Password}</td>
                <td>
                    <div class="actionWrapper">
                        <button class="edit">
                            <span class="material-symbols-outlined icon">edit</span>
                        </button>
                        <button class="delete">
                            <span class="material-symbols-outlined icon">delete</span>
                        </button>
                    </div>
                </td>
            `;
            el.querySelector('.delete').addEventListener('click', () => deleteUser(user.ID));
            el.querySelector('.edit').addEventListener('click', () => swapInfo(user.ID, user.UserName, user.Email, user.Password));
            tbody.appendChild(el);
        });
    } catch (err) {
        console.error('Error updating content:', err);
    }
}

function buttonSwap() {
    btnAdd.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!btnAdd.classList.contains('confirm')) {
            addNewUser();
        } else {
            if (editingUserId) {
                updateUser(editingUserId);
            }
        }
    });
}

async function addNewUser() {
    const UserName = txtName.value.trim();
    const Email = txtEmail.value.trim();
    const Password = txtPassword.value.trim();

    if (UserName === '' || Email === '' || Password === '') {
        return alert('Entradas inválidas');
    }

    try {
        const res = await fetchPostUser(UserName, Email, Password);

        if (res.ok) {
            updateContent();

            alert('Sucesso ao adicionar usuário');
        } else {
            alert('Erro ao adicionar usuário');
        }

        txtName.value = '';
        txtEmail.value = '';
        txtPassword.value = '';

    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function deleteUser(id) {
    try {
        const res = await fetchDelUser(id);

        if (res.ok) {
            updateContent();

            return alert(`Usuário com id ${id} deletado`);
        } else {
            return alert('Erro ao deletar usuário');
        }
    } catch (err) {
        return console.error('Error deleting user:', err);
    }
}

function swapInfo(id, name, email, password) {
    txtName.value = name;
    txtEmail.value = email;
    txtPassword.value = password;

    editingUserId = id;

    btnAdd.innerHTML = `
        <span class="material-symbols-outlined icon">check</span>
    `;
    btnAdd.classList.add('confirm');
}

async function updateUser(id) {
    const UserName = txtName.value.trim();
    const Email = txtEmail.value.trim();
    const Password = txtPassword.value.trim();

    if (UserName === '' || Email === '' || Password === '') {
        return alert('Entradas inválidas');
    }

    try {
        const res = await fetchPutUser(id, UserName, Email, Password);

        if (res.ok) {
            btnAdd.classList.remove('confirm');
            btnAdd.innerHTML = btnBackup;

            txtName.value = '';
            txtEmail.value = '';
            txtPassword.value = '';

            editingUserId = null;

            updateContent();
            
            alert(`Não houve erros na requisição de atualizar`);
        } else {
            alert('Houve um erro ao atualizar o usuário');
        }
    } catch (err) {
        alert('Error:', err);
    }
}

export { updateContent, buttonSwap };
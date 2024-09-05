const btnEditar = (id) => `<button type="button" class="btn btn-warning text-light" data-bs-toggle="modal" data-bs-target="#editModal" onclick="populateEditForm(${id})">Editar</button>`;
const btnDeletar = (id) => `<button type="button" class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="confirmDelete(${id})">Deletar</button>`;

const createUserRow = (user) => {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.textContent = user.id;
    tr.appendChild(th);

    const tdName = document.createElement('td');
    tdName.textContent = user.name;
    tr.appendChild(tdName);

    const tdUsername = document.createElement('td');
    tdUsername.textContent = user.username;
    tr.appendChild(tdUsername);

    const tdEmail = document.createElement('td');
    tdEmail.textContent = user.email;
    tr.appendChild(tdEmail);

    const tdStreet = document.createElement('td');
    tdStreet.textContent = user.address.street;
    tr.appendChild(tdStreet);

    const tdCompany = document.createElement('td');
    tdCompany.textContent = user.company.name;
    tr.appendChild(tdCompany);

    const tdActions = document.createElement('td');
    tdActions.innerHTML = btnEditar(user.id) + ' ' + btnDeletar(user.id);
    tr.appendChild(tdActions);

    return tr;
};

const getUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data;
            const tbody = document.querySelector('#tbody');
            tbody.innerHTML = '';

            users.forEach(user => {
                tbody.appendChild(createUserRow(user));
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
};

const searchUser = () => {
    const id = document.getElementById('idUser').value;

    if (!id) {
        getUsers();
        return;
    }

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            const user = response.data;
            const tbody = document.querySelector('#tbody');
            tbody.innerHTML = '';
            tbody.appendChild(createUserRow(user));
        })
        .catch(error => console.error('Erro ao buscar usuário:', error));
};

const clearData = () => {
    const tbody = document.querySelector('#tbody');
    tbody.innerHTML = ''; 

    document.getElementById('idUser').value = '';
};

const populateEditForm = (id) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            const user = response.data;
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editName').value = user.name;
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editStreet').value = user.address.street;
            document.getElementById('editCompany').value = user.company.name;
        })
        .catch(error => console.error('Erro ao buscar dados do usuário para editar:', error));
};

const editUser = () => {
    const id = document.getElementById('editUserId').value;
    const updatedUser = {
        name: document.getElementById('editName').value,
        username: document.getElementById('editUsername').value,
        email: document.getElementById('editEmail').value,
        address: {
            street: document.getElementById('editStreet').value
        },
        company: {
            name: document.getElementById('editCompany').value
        }
    };

    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
        .then(() => {
            getUsers();
            alert('Usuário atualizado com sucesso!');
            const editModal = document.getElementById('editModal');
            const modal = bootstrap.Modal.getInstance(editModal);
            modal.hide();
        })
        .catch(error => console.error('Erro ao atualizar usuário:', error));
};

const confirmDelete = (id) => {
    document.getElementById('deleteUserId').value = id;
};

const deleteUser = () => {
    const id = document.getElementById('deleteUserId').value;

    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
            getUsers();
            alert('Usuário deletado com sucesso!');
            const deleteModal = document.getElementById('deleteModal');
            const modal = bootstrap.Modal.getInstance(deleteModal);
            modal.hide();
        })
        .catch(error => console.error('Erro ao deletar usuário:', error));
};

document.addEventListener('DOMContentLoaded', () => {
    getUsers(); 
});

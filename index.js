const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const users = data;
            const tbody = document.querySelector('#tbody');
            tbody.innerHTML = '';

            users.forEach(u => {
                const tr = document.createElement('tr');

                const th = document.createElement('th');
                th.textContent = u.id;
                tr.appendChild(th);

                const tdName = document.createElement('td');
                tdName.textContent = u.name;
                tr.appendChild(tdName);

                const tdUsername = document.createElement('td');
                tdUsername.textContent = u.username;
                tr.appendChild(tdUsername);

                const tdEmail = document.createElement('td');
                tdEmail.textContent = u.email;
                tr.appendChild(tdEmail);

                const tdStreet = document.createElement('td');
                tdStreet.textContent = u.address.street;
                tr.appendChild(tdStreet);

                const tdCompany = document.createElement('td');
                tdCompany.textContent = u.company.name;
                tr.appendChild(tdCompany);

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
};

const searchUser = () => {
    const id = document.getElementById('idUser').value;

    if (!id) {
        // Se o ID estiver vazio, reexibe todos os usuários
        getUsers();
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tbody');
            tbody.innerHTML = '';

            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.textContent = data.id;
            tr.appendChild(th);

            const tdName = document.createElement('td');
            tdName.textContent = data.name;
            tr.appendChild(tdName);

            const tdUsername = document.createElement('td');
            tdUsername.textContent = data.username;
            tr.appendChild(tdUsername);

            const tdEmail = document.createElement('td');
            tdEmail.textContent = data.email;
            tr.appendChild(tdEmail);

            const tdStreet = document.createElement('td');
            tdStreet.textContent = data.address.street;
            tr.appendChild(tdStreet);

            const tdCompany = document.createElement('td');
            tdCompany.textContent = data.company.name;
            tr.appendChild(tdCompany);

            tbody.appendChild(tr);
        })
        .catch(error => console.error('Erro ao buscar usuário:', error));
};

const clearData = () => {
    const tbody = document.querySelector('#tbody');
    tbody.innerHTML = ''; 

    document.getElementById('idUser').value = '';
};

document.addEventListener('DOMContentLoaded', () => {
    getUsers(); 
});

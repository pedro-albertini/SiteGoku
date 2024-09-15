function dados() {
    const ds = [
        { id: 1, login: "eduardo", password: "1234@", email: "eduardo@gmail.com" },
        { id: 2, login: "bobby", password: "1234@", email: "bobby@gmail.com" },
        { id: 3, login: "endrick", password: "1234@", email: "endrick@gmail.com" },
        { id: 4, login: "plinio", password: "1234@", email: "plinio@gmail.com" },
        { id: 5, login: "pedro", password: "1234@", email: "pedro@gmail.com" }
    ]

    return ds;
}

const usuarios = dados()

function login() {
    let log = document.querySelector('#login').value
    let senha = document.querySelector('#password').value

    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = '';

    let eCorreto = false;

    for (let i = 0; i < usuarios.length; i++) {
        if (log == usuarios[i].login && senha == usuarios[i].password) {
            const p = document.createElement('p');
            p.innerHTML = `Seja Bem-Vindo ${usuarios[i].login}!`;
            resultado.appendChild(p);
            eCorreto = true;
            break;
        }
    }

    if (!eCorreto) {
        const p = document.createElement('p');
        p.innerHTML = 'Login ou senha incorretos';
        resultado.appendChild(p);
    }
}
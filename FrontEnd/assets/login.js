const connect = document.querySelector('.connect')
connect.addEventListener('click', e => {
    e.preventDefault();


    const connect = document.querySelector("#connect").addEventListener("click", function (event) {
        const user = {
            "email": document.querySelector('input[type="email]').value,
            "password": document.querySelector('input[type="password').value
        };
    
        fetch('http://localhost:5678/api/users/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charsert=utf-8'
            },
            body: JSON.stringify(user)
        })

        .then(response => {
            if(!response.ok) {
                window.alert("Identifiants incorrect")
                throw new Error('Identifiants incorrects');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            window.location.href = "/index.html"
        })
        .catch(error => {
            console.error(error);
        })
    
    });
},false);
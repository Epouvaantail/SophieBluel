const connect = document.querySelector("#connect").addEventListener("click", function (event) {
    const user = {
        "email": document.querySelector('input[type="email"]').value,
        "password": document.querySelector('input[type="password"]').value
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
        sessionStorage.setItem('token', data.token);
        window.location.href = "/index.html"
    })
    .catch(error => {
        console.error(error);
    })

});


    const submit = document.querySelector("#connect");
    submit.addEventListener("click", async function(event) {
        event.preventDefault();
})

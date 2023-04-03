// Récuperation des travaux depuis l'API, et implémentation sur la page
const works = fetch('http://localhost:5678/api/works',{ method:'get'})
.then(works => works.json())
.then(data => {
	const gallery = document.querySelector('.gallery');
            gallery.innerHTML = '';
            for (let d in data) {
                function generate(data) {
                    for (let d in data){
                    // const filtered = data.filter(obj => obj.categoryId === 1);
                    gallery.insertAdjacentHTML('beforeend', `
                        <figure>
                            <img src="${data[d].imageUrl}" alt="${data[d].title}">
                                <figcaption>${data[d].title}</figcaption>
	                    </figure`)
                        // console.log(filtered);
                }}
            };
    generate(data)

    // boutons pour filtrer les travaux
    const Tous = document.querySelector("#Tous");
    Tous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        generate(data);
    })

    const Objets = document.querySelector("#Objets");
    Objets.addEventListener("click", function () {
        const objetsFilter = data.filter(function (data) {
            return data.categoryId === 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generate(objetsFilter);
    })

    const Appartements = document.querySelector("#Appartements");
    Appartements.addEventListener("click", function () {
        const appartFilter = data.filter(function (data) {
            return data.categoryId === 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        generate(appartFilter);
    })

    const Hôtels = document.querySelector("#Hôtels");
    Hôtels.addEventListener("click", function () {
        const hotelFilter = data.filter(function (data) {
            return data.categoryId === 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generate(hotelFilter);
    })

    // changement de la couleur du boutton filtre sélectionné
    const filter = document.querySelectorAll(".filter");
    for (let i = 0; i < filter.length; i++) {
        const element = filter[i];
        element.addEventListener("click", function(e) {
            if (e.target.classList.contains("filter_active")){
                return;
            }
            else{
                const boutons = document.querySelectorAll(".filter");
                for(let j = 0; j < boutons.length; j++){
                    boutons[j].classList.remove("filter_active");
                };
                e.target.classList.add("filter_active");
            }
        })
    }
})

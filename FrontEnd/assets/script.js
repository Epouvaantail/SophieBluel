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

const submit = document.querySelector("#submit");
submit.addEventListener("click", async function(event) {
    event.preventDefault();
})

if (sessionStorage.getItem('token')) {
    const body = document.querySelector('body');
        body.insertAdjacentHTML('afterbegin', `
        <div class="editionMod">
		    <img src="/assets/icons/pen-to-square-regular.svg" alt="pen logo">
		    <p>Mode édition</p>
		    <button class="publish" id="publish"> publier les changements </button>
	    </div>`);
    document.querySelector("#project").remove("#project")
    const portfolio = document.querySelector('#portfolio');
        portfolio.insertAdjacentHTML('afterbegin', `
        <div class="modification">
			<h2>Mes Projets</h2>
			<img class"pen_logo" src="/assets/icons/pen-to-square-regular.svg" alt="pen logo">
			<p class="modify_2" >modifier</p>
		</div>`);
    document.querySelector(".filters").remove(".filters")
    const mainImg = document.querySelector('#introduction figure');
        mainImg.insertAdjacentHTML('beforeend', `
            <div class="modify_picture">
				<img class="pen_logo" src="/assets/icons/pen-to-square-regular.svg" alt="pen logo">
				<p class="modify_1" >modifier</p>
			</div>`);
    const loginBtn = document.querySelector("#login");
            loginBtn.innerText = 'logout';
}

document.querySelector("#login").addEventListener("click", function (e) {
    if (sessionStorage.getItem("token")) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        const logBtn = document.querySelector("#login");
        logBtn.innerText = "login";
    }
});
function openModal() {
    const body = document.querySelector('body');
        body.insertAdjacentHTML('afterbegin', `
            <div class="modale_back">
            </div>
            <div class="modale_center">
                <form class="modale">
                    <header>
                        <img src="assets/icons/xmark-solid.svg" class="x_logo">
                    </header>
                    <p class="modale_title"> Galerie photo </p> 
                    <section class="gallery_work">
    
                    </section>
                    <div class="line" ><hr></div>
                    <div class="modale_btn">
                        <input id="submit_pic" type="submit" value="Ajouter une photo">
                        <p id="delete">Supprimer la galerie</p>
                    </div>
                </form>
            </div>
	        ` );
        const works = fetch('http://localhost:5678/api/works',{ method:'get'})
        .then(works => works.json())
        .then(data => {
	    const galleryWork = document.querySelector(".gallery_work");
            galleryWork.innerHTML = '';
                function generate(data) {
                    for (let d in data){
                    galleryWork.insertAdjacentHTML('beforeend', `
                        <figure class="work">
                            <div class="work_pic">
                                <img class="work_img" src="${data[d].imageUrl}" alt="${data[d].title}">
                                <div class="bin_box">
                                    <img class="bin" src="assets/icons/bin-svgrepo-com.svg">
                                </div>
                                <div class="mult_arrow_box">
                                    <img class="mult_arrow" src="assets/icons/up-down-left-right-solid.svg">
                                </div>
                            </div>
                            <p>éditer</p>
	                    </figure`)}
                }
        generate(data);
        })

        const x_logo = document.querySelector(".x_logo");
        x_logo.addEventListener("click", async function(event){
            document.querySelector(".modale_back").remove('.modale_back');
            document.querySelector(".modale").remove('.modale');
        });

        const mod_back = document.querySelector(".modale_back");
        mod_back.addEventListener("click", async function(event){
            document.querySelector(".modale_back").remove('.modale_back');
            document.querySelector(".modale").remove('.modale');
        });
    
        const submit_pic = document.querySelector("#submit_pic");
        submit_pic.addEventListener("click", async function(event) {
            event.preventDefault()
            document.querySelector(".modale header").insertAdjacentHTML('afterbegin', `<img src="assets/icons/arrow-left.svg" class="arrow_left">`);
            document.querySelector("#submit_pic").remove("#submit_pic");
            document.querySelector("#delete").remove("#delete");
            document.querySelector(".modale_title").innerText = "Ajout photo";
            document.querySelector(".gallery_work").remove(".gallery_work");
            document.querySelector("div hr").remove("div hr");
            document.querySelector(".modale_btn").remove(".modale_btn");
            // document.querySelector(".modale_btn").insertAdjacentHTML('afterbegin', `<button class="valid_btn">Valider</button>`);
            const modale_send = document.querySelector(".modale");
            modale_send.insertAdjacentHTML('beforeend', `
            <div class="send_pic">
                <form class="send_pic" action="#" method="post">
                    <div class="blue_box">
                    <img class="blue_box_img" src="assets/icons/Group.svg">
                    <span class="add_pic_btn">
                        <input id="upload" class="add_pic_btn" type="file" name="file">
                        + Ajouter photo"
                    </span>
                    <p> jpg. png :4mo max</p>
                    <output></output>
                    </div>
                    <div class="form_place">
			            <label class="title_titre" for="titre">Titre</label>
			            <input type="text" name="titre" id="titre">
                    </div>
                    <div class="form_place">
			            <label for="category">Catégorie</label>
			            <select name="category" id="select_category">
                            <option value=""> </option>
                            <option value="objets">Objets</option>
                            <option value="appartements">Appartements</option>
                            <option value="hotels&restaurants">Hôtels & Restaurants</option>
                        </select>
                    </div>
                    <div class="line"><hr></div>
                    <input type="submit" value="Se connecter" id="valid_btn">
		        </form>
            </div`);
            document.addEventListener("click", function (e) {
                if (e.target.classList.contains("arrow_left")) {
                    const modal = document.querySelector(".rewrite-modal");
                    document.querySelector(".modale").remove(".modale");
                    document.querySelector(".modale_back").remove(".modale_back");
                    openModal();
                } 
            const input = document.querySelector("input")
            const output = document.querySelector("output")
            let imagesArray = []
            input.addEventListener("change", () => {
                const file = input.files
                imagesArray.push(file[0])
                displayImages()
                function displayImages() {
                    let images = ""
                    imagesArray.forEach((image, index) => {
                      images += `<img src="${URL.createObjectURL(image)}" class="output_img" alt="image">`
                    })
                    output.innerHTML = images
                  }
              })
            });
        
            const validBtn = document.querySelector("#valid_btn");
            validBtn.addEventListener("click", async function(event) {
                event.preventDefault()
                const user = {
                    "Image": document.querySelector('input[type="file"]').value,
                    "Titre": document.querySelector('input[type="text"]').value,
                    "Catégorie": document.querySelector('select[name="category"]').value
                };
                console.log(user)
            });
        });
        };
            const modifyBtn = document.querySelector(".modification");
            modifyBtn.addEventListener("click", async function() { openModal()})
            
                // fetch('http://localhost:5678/api/works',{
                //     method:'POST',
                //     headers:{
                //         'Content-Type': 'application/json;charsert=utf-8'
                //     },
                //     body: JSON.stringify(user)
                // })
            
                // .then(response => {
                //     if(!response.ok) {
                //         window.alert("Données manquantes ou incorrects")
                //         throw new Error('Données manquantes ou incorrects');
                //     }
                //     return response.json();
                // })
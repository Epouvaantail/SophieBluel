// liens de la barre de navigation
document.querySelector("#projet__nav").onclick=function() {window.location.href = '#'}
document.querySelector("#contact__nav").onclick=function() {window.location.href = '#contact'}
document.querySelector("#login__nav").onclick=function() {window.location.href = 'login_page.html'}
document.querySelector("#instagram__nav").onclick=function() {window.location.href = '#'}

// Récuperation des travaux depuis l'API, et implémentation sur la page
const works = fetch('http://localhost:5678/api/works',{ method:'get'})
.then(works => works.json())
.then(data => {
	const gallery = document.querySelector('.gallery');
            gallery.innerHTML = '';
            for (let d in data) {
                function generate(data) {
                    for (let d in data){
                    gallery.insertAdjacentHTML('beforeend', `
                        <figure>
                            <img src="${data[d].imageUrl}" alt="${data[d].title}">
                                <figcaption>${data[d].title}</figcaption>
	                    </figure`)
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

// si le token est bien présent, changement de la page en mode édition
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
            //modifier bouton login en logout
    const loginBtn = document.querySelector("#login__nav");
            loginBtn.innerText = 'logout';
};

//logout (supprimer le token)
document.querySelector("#login__nav").addEventListener("click", function (e) {
    if (sessionStorage.getItem("token")) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        const logBtn = document.querySelector("#login__nav");
        logBtn.innerText = "login";
    }
});

document.querySelector("#publish").addEventListener("click", function (e) {
    if (sessionStorage.getItem("token")) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        location.reload()
    }
});

// fonction pour créer la modale
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
                                <img class="work_img" src="${data[d].imageUrl}" id="${data[d].id}" alt="${data[d].title}">
                                <div class="bin_box" id="${data[d].id}">
                                    <img class="bin" src="assets/icons/bin-svgrepo-com.svg">
                                </div>
                                <div class="mult_arrow_box">
                                    <img class="mult_arrow" src="assets/icons/up-down-left-right-solid.svg">
                                </div>
                            </div>
                            <p>éditer</p>
	                    </figure`)
                    }
                };
        generate(data);

        // supprimer travaux
        const dlt = document.querySelectorAll(".bin_box");
        dlt.forEach(element => {
            element.addEventListener("click", () => {
                FetchDeleteWorks(element.id)
            });
        });
        async function FetchDeleteWorks(id) {
            const response = await fetch("http://" + window.location.hostname + `:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            const getWorks = await fetch("http://localhost:5678/api/works");
            const works = await getWorks.json();

            function generateProjects(projects) {
                document.querySelector(".gallery").innerHTML = "";
                for (let i = 0; i < projects.length; i++) {
                    const project = projects[i];
                    const gallery = document.querySelector(".gallery");
                    const figureElement = document.createElement("figure");
                    const imgElement = document.createElement("img");
                    imgElement.src = project.imageUrl;
                    const textElement = document.createElement("figcaption");
                    textElement.innerHTML = project.title;
                    gallery.appendChild(figureElement);
                    figureElement.appendChild(imgElement);
                    figureElement.appendChild(textElement)
                };
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
                                            <img class="work_img" src="${data[d].imageUrl}" id="${data[d].id}" alt="${data[d].title}">
                                            <div class="bin_box" id="${data[d].id}">
                                                <img class="bin" src="assets/icons/bin-svgrepo-com.svg">
                                            </div>
                                            <div class="mult_arrow_box">
                                                <img class="mult_arrow" src="assets/icons/up-down-left-right-solid.svg">
                                            </div>
                                        </div>
                                        <p>éditer</p>
                                    </figure`)
                                }
                            };
                    generate(data);
                })
            }
            generateProjects(works);
        }
    });

    // quitter/effacer le html de la modale en cliquant sur la croix
    const x_logo = document.querySelector(".x_logo");
    x_logo.addEventListener("click", async function(event){
        document.querySelector(".modale_back").remove(".modale_back");
        document.querySelector(".modale").remove(".modale");
    });

    // quitter/effacer le html de la modale en cliquant hors de la modale
    const mod_back = document.querySelector(".modale_back");
    mod_back.addEventListener("click", async function(event){
        document.querySelector(".modale_back").remove(".modale_back");
        document.querySelector(".modale").remove(".modale");
    });
        
        // modifier la modale pour afficher la modale d'ajout de travail
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
        const modale_send = document.querySelector(".modale");
        modale_send.insertAdjacentHTML('beforeend', `
            <div class="send_pic">
                <form id="send_pic" action="#" method="post">
                    <div class="blue_box">
                    <img class="blue_box_img" src="assets/icons/Group.svg">
                    <span class="add_pic_btn">
                        <input id="upload" class="add_pic_btn" type="file" name="file" accept="image/jpg, image/png">
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
                    <button type="submit" id="valider" class="valid_btn">Valider</button>
		        </form>
                <p class="error"> Le formulaire n’est pas correctement rempli </p>
        </div`);

        // flèche retour pour afficher la modale principale
        document.addEventListener("click", function (e) {
        if (e.target.classList.contains("arrow_left")) {
            const modal = document.querySelector(".rewrite-modal");
            document.querySelector(".modale").remove(".modale");
            document.querySelector(".modale_back").remove(".modale_back");
            openModal();
        } 
            
        // pour afficher sur la modale la photo que l'on ajoute
        const input = document.querySelector("input")
        const output = document.querySelector("output")
        let imagesArray = []
        input.addEventListener("change", () => {
            const file = input.files
            imagesArray.push(file[0])
            displayImages()
            function displayImages() {
                document.querySelector(".add_pic_btn").style.opacity='0';
                let images = ""
                imagesArray.forEach((image, index) => {
                    images += `<img src="${URL.createObjectURL(image)}" class="output_img" alt="image">`
                })
                output.innerHTML = images
            }
            function VerifyUploadSizeIsOK() {
                var UploadFieldID = "#upload";
                var MaxSizeInBytes = 4000000;
                var fld = document.getElementById(UploadFieldID);
                if( input.files && input.files.length == 1 && input.files[0].size > MaxSizeInBytes ){
                   alert("The file size must be no more than 4mo");
                   document.querySelector(".output_img").remove("img")
                   document.querySelector(".add_pic_btn").style.opacity='1';
                }
             }
             VerifyUploadSizeIsOK()
          })
        });

        // récupérer les données et les envoyer à l'api pour l'ajout d'un nouveau travail 
        const AddPicModal = document.querySelector("#upload")
        const AddTitle = document.querySelector("#titre")
        const AddCategorie = document.querySelector("#select_category")
        const Submit = document.querySelector("#valider")
        const form = document.querySelector(".send_pic")
        let imgPreview = "";
        let inputCategory = "";
        let inputTitle="";
    
    
        function addImage() {
            AddPicModal.addEventListener("input", (e) => {
                imgPreview = e.target.files[0];
                const img = URL.createObjectURL(AddPicModal.files[0]);
            });
            AddTitle.addEventListener("input", (e) => {
                inputTitle = e.target.value;
            });
            AddCategorie.addEventListener("input", (e) => {
                inputCategory = e.target.selectedIndex;
            });
            // Si tout est remplie alors le bouton valider change de couleur
            form.addEventListener("change", () => {
                if (imgPreview !== "" && inputTitle !== "" && inputCategory !== "") {
                    Submit.style.background = "#1D6154";
                }
                else {
                    Submit.style.backgroundColor = ''; 
                }
            });
    
    
        //Submit
        async function fetchDataWorks() {
            const response = await fetch("http://" + window.location.hostname + ":5678/api/works")
            const data = await response.json()
        };
        Submit.addEventListener("click", (e) => {
            e.preventDefault();
            if (imgPreview && inputTitle && inputCategory) {
                const formData = new FormData();
                formData.append("image", imgPreview);
                formData.append("title", inputTitle);
                formData.append("category", inputCategory);
    
                fetchDataSubmit()
                async function fetchDataSubmit() {
                    try {
                        // Fetch ajout des travaux
                        const response = await fetch("http://" + window.location.hostname + ":5678/api/works", {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem("token")}`
                            },
                            body: formData,
                        });
                        const dataresponse = await response.json()
                        Submit.style.background = "#1D6154"
    
                        const getWorks = await fetch("http://localhost:5678/api/works");
                        const works = await getWorks.json();
                        
                        function generateProjects(projects) {
                            document.querySelector(".gallery").innerHTML = "";
                            for (let i = 0; i < projects.length; i++) {
                                const project = projects[i];
                                const gallery = document.querySelector(".gallery");
                                const figureElement = document.createElement("figure");
                                const imgElement = document.createElement("img");
                                imgElement.src = project.imageUrl;
                                const textElement = document.createElement("figcaption");
                                textElement.innerHTML = project.title;
                                gallery.appendChild(figureElement);
                                figureElement.appendChild(imgElement);
                                figureElement.appendChild(textElement)
                            };
                        }
                        generateProjects(works);
                        document.querySelector(".modale_back").remove(".modale_back");
                        document.querySelector(".modale").remove(".modale");
                    }
                    catch (error) {
                        console.log("Il y a eu une erreur sur le Fetch: " + error)
                    }
                }
            }
            else {
                document.querySelector(".error").style.display = "inline"
            }
        });
    }
    addImage()
    });
};

const modifyBtn = document.querySelector(".modification");
    modifyBtn.addEventListener("click", async function() {
        openModal()
    });

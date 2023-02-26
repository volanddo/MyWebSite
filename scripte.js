var path = "https://volanddo.github.io/"

function animateMenu(){
    let menuToggle = document.querySelector("header .toggle");
    let menuContent = document.querySelector("header ul");
    menuToggle.onclick = function(){
        menuToggle.classList.toggle("active");
        menuContent.classList.toggle("active");
    };
    let liclickable = document.querySelectorAll("header ul li");
    
    liclickable.forEach((li) => {
        li.onclick = function(){
            cv =  document.querySelector("#MyCV");
            project =  document.querySelector("#MyProject");
            titleH1 =  document.querySelector("header div .titleh1");
            if (li.id == "CvButton"){
                cv.style.display = "block";
                project.style.display = "none";
                titleH1.innerHTML = "Mon CV"
            }
            else{
                cv.style.display = "none";
                project.style.display = "block";
                titleH1.innerHTML = "Mes Projets"
            }
        }
    });
}

function changeLanguage(){
    englishButton = document.querySelector("header #lang");

    //Preload
    document.querySelectorAll(".en").forEach((block) => {
        block.style.display = "none";
    });
    document.querySelectorAll(".fr").forEach((block) => {
        block.style.display = "";
    });
    englishButton.src="images/anglais.webp"

    // add event
    englishButton.onclick = function(){
        englishButton.classList.toggle("en");
        if (englishButton.classList.contains("en")){
            document.querySelectorAll(".en").forEach((block) => {
                block.style.display = "";
            });
            document.querySelectorAll(".fr").forEach((block) => {
                block.style.display = "none";
            });
            englishButton.src="images/francais.webp"
        }
        else{
            document.querySelectorAll(".en").forEach((block) => {
                block.style.display = "none";
            });
            document.querySelectorAll(".fr").forEach((block) => {
                block.style.display = "";
            });
            englishButton.src="images/anglais.webp"
        }
    }
}

class Article{
    title;
    presentation;
    competence;
    image;
    externButton;
    constructor(title, presentation, competence, image, externButton){
        this.title = title;
        this.presentation = presentation;
        this.image = image;
        this.competence = competence;
        this.externButton = externButton;
    }

    createArticle(){
        let article = document.createElement("article");
        article.classList.add("article");
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let ul = document.createElement("ul");
        // generation title
        div.classList.add("title");
        article.appendChild(div);
        h2.innerHTML = this.title["h2"];
        div.appendChild(h2);
        div.appendChild(ul);
        this.title["ul"].forEach(liText => {
            let li = document.createElement("li");
            li.innerHTML = liText;
            ul.appendChild(li);
        });
        // Presentation
        this.presentation.forEach(textPres =>{
            let p = document.createElement("p");
            p.classList.add("presentation")
            p.innerHTML = textPres;
            article.appendChild(p);
        });
        //externButton
        //<p class="externButton fr"> <a href="">Fichier source non disponible (accord avec l'ENSIMAG)</a></p>
        if (this.externButton != null){
            let p = document.createElement("p");
            article.appendChild(p);
            p.classList.add("externButton");
            let a = document.createElement("a");
            p.appendChild(a);
            a.href = this.externButton["link"];
            a.innerHTML = this.externButton["text"];
        }
        //image
        div = document.createElement("div");
        div.classList.add("image");
        article.appendChild(div);
        this.image.forEach(imagePath =>{
            let img = document.createElement("img");
            img.src = imagePath;
            div.appendChild(img);
        });
        //competence
        div = document.createElement("div");
        div.classList.add("competence");
        article.appendChild(div);
        h2 = document.createElement("h2");
        h2.innerHTML = this.competence["title"];
        div.appendChild(h2);
        ul = document.createElement("ul");
        div.appendChild(ul);
        this.competence["ul"].forEach(liText => {
            let li = document.createElement("li");
            li.innerHTML = liText;
            ul.appendChild(li);
        });
        return article;
    }
}

function readJson(filePath, baliseToAdd){
    fetch(path+filePath)
  .then(response => response.json())
  .then(data => {
    
    let a = new Article(data["cv-fr"].title, data["cv-fr"].presentation, data["cv-fr"].competence, data["cv-fr"].image, data["cv-fr"].externButton);
    baliseToAdd.appendChild(a.createArticle());
  })
  .catch(error => console.error(error));
  
}


window.addEventListener('load', function() {
    animateMenu();
    readProject();
    readJson('project.json', document.getElementById("MyProject"));
    readJson('cv-fr.json', document.getElementById("MyCV"));
});
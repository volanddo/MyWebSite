const pathLocal = "http://localhost:8080/";
const pathGlobal = "https://volanddo.github.io/";
var currentPath = pathGlobal;

let isProject = true;
let isFrench = true;

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
            if (li.id === "CvButton"){
                isProject = false;
                cv.style.display = "block";
                project.style.display = "none";
                if (isFrench){
                    titleSection.innerHTML = "Mon CV"
                }else{
                    titleSection.innerHTML = "My CV"
                }
            }
            else{
                isProject = true;
                cv.style.display = "none";
                project.style.display = "block";
                if (isFrench){
                    titleSection.innerHTML = "Mes Projets"
                }else{
                    titleSection.innerHTML = "My projects"
                }
            }
        }
    });
}

function changeLanguage(){
    englishButton = document.querySelector("header #lang");

    // add event
    englishButton.onclick = function(){
        // remove previous content:
        let cv = document.getElementById("MyCV")
        while (cv.firstChild) {
            cv.removeChild(cv.firstChild);
            }
        let projet = document.getElementById("MyProject")
        while (projet.firstChild) {
            projet.removeChild(projet.firstChild);
        }
        // make a new content
        isFrench = !isFrench;
        if (!isFrench){
            englishButton.src= currentPath + "images/francais.webp";
            if(isProject){
                document.getElementById("titleSection").innerHTML = "My projects";
            }
            else{
                document.getElementById("titleSection").innerHTML = "My CV";
            }
            document.getElementById("CvButton").innerHTML="My CV"
            document.getElementById("PjButton").innerHTML="My Projects"
            readJson('project-en.json', projet, 'project-en');
            readJson('cv-en.json', cv, 'cv-en');
        }
        else{
            englishButton.src= currentPath + "images/anglais.webp";
            if(isProject){
                document.getElementById("titleSection").innerHTML = "Mes Projets";
            }
            else{
                document.getElementById("titleSection").innerHTML = "Mon CV";
            }
            document.getElementById("CvButton").innerHTML="Mon CV"
            document.getElementById("PjButton").innerHTML="Mes Projets"
            readJson('project-fr.json', projet, 'project-fr');
            readJson('cv-fr.json', cv, 'cv-fr');
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
        if (this.image != null){
            div = document.createElement("div");
            div.classList.add("image");
            article.appendChild(div);
            this.image.forEach(imagePath =>{
                let img = document.createElement("img");
                img.src = imagePath;
                div.appendChild(img);
            });
        }
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

function readJson(filePath, baliseToAdd, startName){
    fetch(currentPath+"jsonFile/"+filePath)
  .then(response => response.json())
  .then(data => {
    data[startName].forEach(objet =>{
        let a = new Article(objet["title"], objet["presentation"], objet["competence"], objet["image"], objet["externButton"]);
        baliseToAdd.appendChild(a.createArticle());
    });
  })
  .catch(error => console.error(error));
}


window.addEventListener('load', function() {
    animateMenu();
    changeLanguage();
    readJson('project-fr.json', document.getElementById("MyProject"), 'project-fr');
    readJson('cv-fr.json', document.getElementById("MyCV"), 'cv-fr');
});
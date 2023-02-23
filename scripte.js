var CheckedButtonColor = "blue"

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



window.addEventListener('load', function() {
    animateMenu();
    changeLanguage();
});
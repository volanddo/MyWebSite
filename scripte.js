var CheckedButtonColor = "blue"

function animateMenu(){
    let menuToggle = document.querySelector("header .toggle");
    let menuContent = document.querySelector("header ul");
    menuToggle.onclick = function(){
        menuToggle.classList.toggle("active");
        menuContent.classList.toggle("active");
    }
    let liclickable = document.querySelectorAll("header ul li");
    
    liclickable.forEach((li) => {
        console.log(li);
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



window.addEventListener('load', function() {
    animateMenu();
});
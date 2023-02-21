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
            if (li.id == "CvButton"){
                cv.style.display = "block";
                project.style.display = "none";
            }
            else{
                cv.style.display = "none";
                project.style.display = "block";
            }
        }
    });
}



window.addEventListener('load', function() {
    animateMenu();
});
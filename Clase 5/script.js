document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("mostrarBtn");
    let cards = document.querySelectorAll(".card");

    btn.addEventListener("click", function () {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.display = "block";
                card.classList.add("c-animate-zoomIn");
            }, index * 300); 
        });
    });
});

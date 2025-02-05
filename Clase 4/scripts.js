document.getElementById("petsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const petNameField = document.getElementById("petName");
    const petTypeField = document.getElementById("petType");
    
    const petName = petNameField.value.trim();
    const petType = petTypeField.value;
    
    if (petName === "") return;
    
    const newItem = document.createElement("li");
    newItem.innerHTML = `<strong>${petName}</strong> - <em>${petType}</em>`;


    newItem.addEventListener("mouseover", () => {
        newItem.style.backgroundColor = "lightblue";
    });
    
    newItem.addEventListener("mouseout", () => {
        newItem.style.backgroundColor = "lightgray";
    });

    newItem.addEventListener("click", () => {
        newItem.remove();
    });
    
    document.getElementById("petsList").appendChild(newItem);
    
    petNameField.value = "";
});

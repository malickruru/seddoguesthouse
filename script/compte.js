document.querySelectorAll(".tab-paiement").forEach((tab,index) =>{
    tab.addEventListener('click',() => {
        document.querySelectorAll(".tab-paiement").forEach((t) => {
            t.classList.remove("tab-paiement-active")
        })
        tab.classList.add("tab-paiement-active");
        if(index == 0){
            document.querySelector("#compte-card").innerHTML = "Tableau de bord" 
        }else if(index == 1){
            document.querySelector("#compte-card").innerHTML = "Réservation" 
        }else if(index == 2){
            document.querySelector("#compte-card").innerHTML = "Adresse" 
        }else if(index == 3){
            document.querySelector("#compte-card").innerHTML = "Moyen de paiement" 
        }else  if(index == 4){
            document.querySelector("#compte-card").innerHTML = "Détails de compte" 
        }
    })
})

document.querySelector("#compte-card").innerHTML = "Tableau de bord" 
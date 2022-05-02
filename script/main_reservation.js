var appartement = JSON.parse(sessionStorage.getItem('SGH-appartement'));
var facture = JSON.parse(sessionStorage.getItem('SGH-facture'));
var infoClient = {};


//Affichage 
//le titre de la page
document.querySelector('#pageTitle').innerHTML = "Réservation";

//arriver

var Debutday = moment(facture.dateDebut).format('D');
var Debutmonth = moment(facture.dateDebut).format('MMM [,] YY');
var Debutweekday = moment(facture.dateDebut).format('dddd');
document.querySelector('#arrive').innerHTML = `
<span>${Debutday}</span>
<span>${Debutmonth}</span>
<span>${Debutweekday}</span>`;

//depart
var Departday = moment(facture.dateFin).format('D');
var Departmonth = moment(facture.dateFin).format('MMM [,] YY');
var Departweekday = moment(facture.dateFin).format('dddd');
document.querySelector('#depart').innerHTML = `
<span>${Departday}</span>
<span>${Departmonth}</span>
<span>${Departweekday}</span>`;

//voyageur
document.querySelector('#voyageur').innerHTML += "<span>"+facture.voyageur + "Voyageur </span>";

//total
document.querySelector('#total').innerHTML = "<div><span>"+facture.total + " $ </span> <span>/total</span></div>";

//La facture
function displayBill(){
    document.querySelector('#FactureTable').innerHTML = `
    <table>
    
<tr>
<td style="text-decoration:underline;">Logement</td>
<td style="text-align:right">$${facture.logement}</td>
</tr>


<tr>
<td style="text-decoration:underline;">Réduction mensuelle de 38%</td>
<td style = "color : green; text-align:right;font-weight : bold;">${ 0 - facture.reduction_logement}</td>
</tr>
<tr>
<td style="text-decoration:underline;">Frais de ménage</td>
<td style="text-align:right">$${facture.menage}</td>
</tr>
<tr>
<td style="text-decoration:underline;">Frais de services</td>
<td style="text-align:right">$${facture.service}</td>
</tr>
<tr>
<td style="text-decoration:underline;">Taxe de séjour et frais</td>
<td style="text-align:right">$${facture.taxes}</td>
</tr>

</table> 

<span class="separator-vertical"></span>

<table>
<tr style="font-weight : bold; ">
<td>Total</td>
<td style="text-align:right">$${facture.total}</td>
</tr>
</table>
`
} 

displayBill();

document.querySelector("#modify").addEventListener('click', () => {
    history. back()
})


//validation du formulaire
document.querySelector("#valider").addEventListener('click',()=>{
    let invalidItems = [];
    document.querySelector("#nom").value == ""? invalidItems.push(document.querySelector("#nom")) : infoClient.nom = document.querySelector("#nom").value;
    document.querySelector("#prenom").value == ""? invalidItems.push(document.querySelector("#prenom")) : infoClient.prenom = document.querySelector("#prenom").value;
    document.querySelector("#mail").value == ""? invalidItems.push(document.querySelector("#mail")) : infoClient.mail = document.querySelector("#mail").value;
    document.querySelector("#telephone").value == ""? invalidItems.push(document.querySelector("#telephone")) : infoClient.telephone = document.querySelector("#telephone").value;
    document.querySelector("#adresse").value == ""? invalidItems.push(document.querySelector("#adresse")) : infoClient.adresse = document.querySelector("#adresse").value;
    document.querySelector("#confidentialite").checked == false? invalidItems.push(document.querySelector("#confidentialite")) : null;

    console.log(invalidItems);
    if(invalidItems.length > 0){
        invalidItems.forEach((item) => {
            item.classList.add("invalid")
        })
    }else{
        infoClient.nom = document.querySelector("#nom").value;
        infoClient.prenom = document.querySelector("#prenom").value ;
        infoClient.mail = document.querySelector("#mail").value ;
        infoClient.telephone = document.querySelector("#telephone").value ;
        infoClient.adresse = document.querySelector("#adresse").value ;
        infoClient.demande = document.querySelector("#Demande").value  ;
       validation();
       payingType();
       document.querySelector("#paiement").innerHTML = `
                <input type="text" name="" id="" placeholder="numero de carte">
                <button class="btn-primary" id="CheckPaiement">VALIDER LE PAIEMENT</button>
                `
    }
})


function validation(){
    document.querySelector("#navigationPath").innerHTML = "Accueil > Validation paiement"

    document.querySelector("#ContactForm").innerHTML = "<h2>Ajouter vos informations</h2>"
    document.querySelector("#ContactForm").innerHTML += `
                                                    <div class='flex-spaceBetween'>
                                                        <span><b>Nom : </b> ${infoClient.nom}</span>
                                                        <span><b>Prenom : </b> ${infoClient.prenom}</span>
                                                        <span><b>Mail : </b> ${infoClient.mail}</span>
                                                    </div>
                                                    <div class='flex-spaceBetween'>
                                                        <span><b>Telephone : </b> ${infoClient.telephone}</span>
                                                        <span><b>Adresse : </b> ${infoClient.adresse}</span>
                                                    </div>
                                                    <div >
                                                        <span><b>Demande : </b> </span>
                                                        <p>${infoClient.demande}</p>
                                                    </div>
                                                    `
    document.querySelector("#ContactForm").innerHTML += "<h2>Type de paiement :</h2>";
    
    document.querySelector("#ContactForm").innerHTML += `<div  class='flex-spaceAround'> 
                                                            <span class="tab-paiement tab-paiement-active"> Carte de crédit </span>
                                                            <span class="tab-paiement "> virement </span>
                                                            <span class="tab-paiement "> paypal </span>
                                                            <span class="tab-paiement "> paiement à l'arrivée </span>
                                                        </div>`
    document.querySelector("#ContactForm").innerHTML += "<div id='paiement'></div>";
    
}

function payingType(){
    document.querySelectorAll(".tab-paiement").forEach((tab,index) =>{
        tab.addEventListener('click',() => {
            document.querySelectorAll(".tab-paiement").forEach((t) => {
                t.classList.remove("tab-paiement-active")
            })
            tab.classList.add("tab-paiement-active");
            if(index == 0){
                document.querySelector("#paiement").innerHTML = `
                <input type="text" name="" id="" placeholder="numero de carte">
                <button class="btn-primary" id="CheckPaiement">VALIDER LE PAIEMENT</button>
                `
            }else if (index == 1){
                document.querySelector("#paiement").innerHTML = `
                <p>Votre réservation sera confirmée à réception du virement bancaire, ci-dessous nos coordonnées :</p>
                <div class="flex-spaceBetween">
                    <span><b>Nom de la banque : </b> HSBC</span>
                    <span><b>Nom du titulaire : </b> Jane Doe</span>
                </div>
                <div class="flex-spaceBetween">
                    <span><b>Code SWIFT: </b> 876432</span>
                    <span><b>Ville de banque : </b> Melbourne </span>
                </div>
                <button class="btn-primary" id="CheckPaiement">VALIDER LE PAIEMENT</button>
                `
            }else if (index == 2){
                document.querySelector("#paiement").innerHTML = `
                <p>Votre réservation sera confirmée à réception du virement bancaire, ci-dessous nos coordonnées :</p>
                <button class="btn-primary" id="CheckPaiement">PAYER MAINTENANT</button>
                `
            }else {
                document.querySelector("#paiement").innerHTML = `
                <p>REMARQUE : Vous pouvez payer directement dans notre structure avec n'importe quel type de carte de crédit ou en espèces.</p>
                <button class="btn-primary" id="CheckPaiement">CONFIRMER</button>
                `
            } 
        })
    })
}


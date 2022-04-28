var appartement = JSON.parse(sessionStorage.getItem('SGH-appartement'));
var facture = JSON.parse(sessionStorage.getItem('SGH-facture'));



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
document.querySelector('#total').innerHTML = "<span>"+facture.total + " </span> <span>/total</span>";

//La facture
function displayBill(){
    document.querySelector('#FactureTable').innerHTML = `
    <table>
<thead>
<tr>
<td>Logement</td>
<td>${facture.logement}</td>
</tr>
</thead>
<tbody>
<tr>
<td>Réduction mensuelle de 38%</td>
<td style = "color : green">${ 0 - facture.reduction_logement}</td>
</tr>
<tr>
<td>Frais de ménage</td>
<td>${facture.menage}</td>
</tr>
<tr>
<td>Frais de services</td>
<td>${facture.service}</td>
</tr>
<tr>
<td>Taxe de séjour et frais</td>
<td>${facture.taxes}</td>
</tr>
<tr style="font-weight : bold">
<td>Total</td>
<td>${facture.total}</td>
</tr>
</tbody>
</table>`
} 

displayBill();

document.querySelector("#modify").addEventListener('click', () => {
    history. back()
})
var appartement = JSON.parse(sessionStorage.getItem('SGH-appartement'));

//calculer la note moyenne de chaque villa
VILLA.forEach((item) => {
    item.noteMoyenne = _.mean(item.note);
})

//prix mensuel 
let FACTURE = {};

//calculer la facture

function StayDuration(){
    var dateDebut = new moment(document.getElementById('date-debut').value)
    var dateFin = new moment(document.getElementById('date-fin').value)
    var duration = Math.round((dateFin.diff(dateDebut, 'days') / 30)*100)/100;
    if(!isNaN(duration)) {
        calculFacture(duration);
        displayBill()
    }
}

function calculFacture(duration){
    //logement
    FACTURE.logement = Math.round(appartement.prix * duration); 
    //reductionlogement
    FACTURE.reduction_logement = Math.round(((appartement.prix / 100) * 38)*duration) ;
    //menage
    FACTURE.menage = Math.round(53 * duration);
    //service
    FACTURE.service = Math.round(128 * duration);
    //taxe
    FACTURE.taxes = Math.round(72 * duration);
    //total
    FACTURE.total =  FACTURE.logement - FACTURE.reduction_logement + FACTURE.menage +FACTURE.service + FACTURE.taxes ;
}

document.getElementById('date-debut').addEventListener('change',StayDuration);

document.getElementById('date-fin').addEventListener('change',StayDuration);

    
    


//afficher

    //le carousel
    appartement.photo.forEach((photo) => {
        document.querySelector('#bigCarousel').innerHTML += `<li class="splide__slide"><img src=${photo} /></li>`;
        document.querySelector('#smallCarousel').innerHTML += `<li class="splide__slide"><img src=${photo} /></li>`;
    })
   splide();
    //le titre de la page
    document.querySelector('#pageTitle').innerHTML = appartement.nom;
    //le prix mensuel
    document.querySelector('#PrixMensuel').innerHTML = `<span style="text-decoration: line-through; color:gray">$${appartement.prix}</span>
    <span>$${ appartement.prix - Math.round((appartement.prix / 100) * 38) }</span>
    <span style="color:gray; font-size:0.7em;">/mois</span>`;
    //le rating
    let moy = _.mean(appartement.note);
    document.querySelector('#Rating').innerHTML = `
    <i class="fa fa-star starChecked star" ></i> <b>${moy}</b> <span style="color:gray;">(${appartement.note.length})</span>`
    //La facture
    function displayBill(){
        document.querySelector('#FactureTable').innerHTML = `
        <table>
<thead>
  <tr>
    <td>Logement</td>
    <td>${FACTURE.logement}</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Réduction mensuelle de 38%</td>
    <td style = "color : green">${ 0 - FACTURE.reduction_logement}</td>
  </tr>
  <tr>
    <td>Frais de ménage</td>
    <td>${FACTURE.menage}</td>
  </tr>
  <tr>
    <td>Frais de services</td>
    <td>${FACTURE.service}</td>
  </tr>
  <tr>
    <td>Taxe de séjour et frais</td>
    <td>${FACTURE.taxes}</td>
  </tr>
  <tr style="font-weight : bold">
    <td>Total</td>
    <td>${FACTURE.total}</td>
  </tr>
</tbody>
</table>`
    } 
    // //les meilleurs offres
    // _.orderBy(VILLA, ['noteMoyenne'], ['desc']);
    // meilleursOffres = [];
    // for(let i = 0; i<3;i++){
    //     meilleursOffres.push(VILLA[i])
    // }

    // meilleursOffres.forEach((item) => {
    //     document.querySelector('#meilleurChambre').innerHTML = `
    //     `
    // } )

    //la description
    document.querySelector("#bigDescription").innerHTML = appartement.big_description;
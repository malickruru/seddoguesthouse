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
        
  <tr>
    <td style="text-decoration:underline;">Logement</td>
    <td style="text-align:right">$${FACTURE.logement}</td>
  </tr>


  <tr>
    <td style="text-decoration:underline;">Réduction mensuelle de 38%</td>
    <td style = "color : green; text-align:right;font-weight : bold;">${ 0 - FACTURE.reduction_logement}</td>
  </tr>
  <tr>
    <td style="text-decoration:underline;">Frais de ménage</td>
    <td style="text-align:right">$${FACTURE.menage}</td>
  </tr>
  <tr>
    <td style="text-decoration:underline;">Frais de services</td>
    <td style="text-align:right">$${FACTURE.service}</td>
  </tr>
  <tr>
    <td style="text-decoration:underline;">Taxe de séjour et frais</td>
    <td style="text-align:right">$${FACTURE.taxes}</td>
  </tr>
  
  </table> 
  
  <span class="separator-vertical"></span>

  <table>
  <tr style="font-weight : bold; ">
  <td>Total</td>
  <td style="text-align:right">$${FACTURE.total}</td>
</tr>
</table>
  `
    } 
    

    //la description
    document.querySelector("#bigDescription").innerHTML = appartement.big_description;

    //les meilleurs offres
    _.orderBy(VILLA, ['noteMoyenne'], ['desc']);
    let meilleursOffres = [];
    for(let i = 0; i<3;i++){
        meilleursOffres.push(VILLA[i])
    }

    meilleursOffres.forEach((item) => {
        document.querySelector('#AutreOffres').innerHTML += `
        <div class="SliderItem " data-slider="${item.id}">
                <div class="SliderImg" data-index="3">
            
                </div>
                <div class="SliderText">
                    <h3>${item.nom}</h3>
                    <p>${item.small_description}</p>
                    <div class="flex">
                        <i class="bi bi-people-fill"></i> <b>2</b> 
                    <svg class="icon icon-king_bed">
                        <path d="M18 9.984v-3h-5.016v3h5.016zM11.016 9.984v-3h-5.016v3h5.016zM20.016 9.984q0.797 0 1.383 0.609t0.586 1.406v5.016h-1.313l-0.656 1.969h-1.031l-0.656-1.969h-12.656l-0.656 1.969h-1.031l-0.656-1.969h-1.313v-5.016q0-0.797 0.586-1.406t1.383-0.609v-3q0-0.797 0.609-1.383t1.406-0.586h12q0.797 0 1.406 0.586t0.609 1.383v3z"></path>
                    </svg> <b>2 ch</b>
                    <svg class="icon icon-elevator">
                        <path d="M18.984 3h-13.969q-0.844 0-1.43 0.586t-0.586 1.43v13.969q0 0.844 0.586 1.43t1.43 0.586h13.969q0.844 0 1.43-0.586t0.586-1.43v-13.969q0-0.844-0.586-1.43t-1.43-0.586zM8.484 6q0.516 0 0.891 0.375t0.375 0.891-0.375 0.867-0.891 0.352-0.867-0.352-0.352-0.867 0.352-0.891 0.867-0.375zM11.016 14.016h-1.031v3.984h-3v-3.984h-0.984v-2.531q0-0.797 0.586-1.383t1.43-0.586h0.984q0.844 0 1.43 0.586t0.586 1.383v2.531zM15.516 17.016l-2.531-4.031h5.016zM12.984 11.016l2.531-4.031 2.484 4.031h-5.016z"></path>
                    </svg>
                    </div>
                    
                    
                </div>
                <button  class="SliderButton">
                    ${item.prix - ((item.prix/100)*40)} €
                </button>    
                </div>
        </div>
        `
    } )
    document.querySelectorAll(".SliderItem").forEach((slide)=>{
        slide.addEventListener('click',()=>{
            showDetail(slide.dataset.slider)
        })
    })
    //redirection lorsqu'on clique sur une carte
function showDetail(index){
    //stocker dans le session storage
    let obj
    VILLA.forEach((item) => {
        item.id == index ? obj = item : null 
    })

    sessionStorage.setItem('SGH-appartement', JSON.stringify(obj));

    //rediriger vers details
    window.location.href = './offre_detail.html';
}


//les avis

let Avis = () => {
    document.querySelector("#avis").innerHTML = "";
    appartement.avis.forEach((avis) =>{
        document.querySelector("#avis").innerHTML += `
        <div class="flex-columnDirection">
                        <div class="flex">
                            <img class="userPic" src=${avis.photo} alt="" >
                            <div class="avis-header">
                                <b>${avis.nom}</b>  <span>${avis.date}</span>
                            </div>
                        </div>
                        <div>
                            <p>${avis.text}</p>
                        </div>
                    </div>`
    })
}

let VotreAvis = () => {document.querySelector("#avis").innerHTML = "Donnez votre avis";}

let VotreNote = () => {document.querySelector("#avis").innerHTML = "Evaluer votre séjour";}

Avis();

document.querySelectorAll(".tab-avis").forEach((tab,index) =>{
    tab.addEventListener('click',() => {
        document.querySelectorAll(".tab-avis").forEach((t) => {
            t.classList.remove("tab-avis-actif")
        })
        tab.classList.add("tab-avis-actif");
        if(index == 0){
            Avis()
        }else if (index == 1){
            VotreAvis()
        }else{
            VotreNote()
        }
    })
})


document.querySelector("#reserver").addEventListener('click',()=>{
    //complêter l'object facture
    FACTURE.dateDebut = document.getElementById('date-debut').value;
    FACTURE.dateFin = document.getElementById('date-fin').value;
    FACTURE.voyageur = document.getElementById('NbrVoyageur').value;
    
    sessionStorage.setItem('SGH-facture', JSON.stringify(FACTURE));
    //rediriger vers reservation
    window.location.href = './reservation.html';
})
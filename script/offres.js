let Pages = [];
let ratingValue = 3;
let DetailOffre ={};


function CreatePages(Table = [],ItemPerPage){
    Pages = [];
    var page = [];
    Table.forEach((item) => {
        page.push(item);
        if(page.length == ItemPerPage){
            Pages.push(page);
            page = [];
        }
    })

    page.length > 0 ? Pages.push(page) :null
}

// créer une pagination
function CreatePagination(){
    document.getElementById('Pagination').innerHTML= "";

    for(var i = 0 ; i < Pages.length ; i++  ){
        let btn = document.createElement("button");
        let btnIndex = i+1;
        btn.innerHTML = btnIndex ;
        btn.classList.add("btn-primary");
        btn.addEventListener("click", function () {
            displayPage(btnIndex);
          });
        document.getElementById('Pagination').appendChild(btn);
    }
}

function displayPage(index){
    document.getElementById("Offres").innerHTML = '';

    if(Pages.length > 0){
        Pages[index - 1].forEach((item) => {
            document.getElementById("Offres").innerHTML += 
            `<div class="SliderItem " data-slider="${item.id}">
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
        </div>`;
        }) 
        document.querySelectorAll(".SliderItem").forEach((slide)=>{
            slide.addEventListener('click',()=>{
                showDetail(slide.dataset.slider)
            })
        })
    }else{
        document.getElementById("Offres").innerHTML = 'Aucune offre ne correspond à vos critères :(';
    }
    
    // console.log(index)
    
}


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



//trier en fonction du prix

function sortPrice(tab){
    var max_price = document.getElementById('rangePrice').value;
    let SortedTable = [];
    tab.forEach((item) => {
        if(item.prix < max_price){
            SortedTable.push(item);
        }
    });
    sortServices(SortedTable);
}

//trier en fonction du service

function sortServices(tab){
    let ServiceTable = [];
    let SortedTable = [];
    
    document.querySelectorAll('.Service_checkbox').forEach((servs) => {
        servs.checked == true ? ServiceTable.push(servs.value) : null; 
        
    })  
        tab.forEach((item) => {
            
            const containsAll = ServiceTable.every(element => {
                return item.service.includes(element);
              });
            containsAll ? SortedTable.push(item) : null ; 
            });
            sortRating(SortedTable)
    }

//trier par note
function sortRating(tab){
    
    let sortRatingTable = [];
    tab.forEach((item) => {
        let sum = 0;
        for(let i = 0; i < item.note.length; i++){
            sum += item.note[i];
        }
        let  moy = sum/item.note.length;
        moy >= ratingValue ? sortRatingTable.push(item) : null;
        });
    //console.log(sortRatingTable);
    CreatePages(sortRatingTable,6);
    CreatePagination();
    displayPage(1);
    
}



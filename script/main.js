//1.OFFRES

//afficher la pagination
CreatePages(VILLA, 6);
CreatePagination();
displayPage(1);

//tri

//tri en fonction des prix
document.getElementById('rangePrice').addEventListener('change', ()=>{
    document.getElementById('priceValue').innerHTML= "$"+ document.getElementById('rangePrice').value;
    sortPrice(VILLA);
})

//tri en fonction des services
document.querySelectorAll('.Service_checkbox').forEach((item) => {
    item.addEventListener('change',() =>{
        sortPrice(VILLA)});
})

//trier en fonction de la note

document.querySelectorAll('.star').forEach((item) => {
    item.addEventListener('click',() =>{
        document.querySelectorAll('.star').forEach((star) => {
            //remove
            star.classList.add('fa-star-o')
            star.classList.remove('fa-star')
            star.classList.remove('starChecked')
            
             if(star.dataset.index <= item.dataset.index){
                 star.classList.remove('fa-star-o')
                 star.classList.add('fa-star');
                 star.classList.add('starChecked');
             }
         })
        
         ratingValue = parseInt(item.dataset.index)
         sortPrice(VILLA)
      
    });
})
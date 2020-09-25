const $liNameCompany = document.getElementById('nameCompany')
const $clickMenu4 = document.querySelector('.clickMenu4')





$liNameCompany.addEventListener('click',callDisplay4)


function callDisplay4(){
    if($clickMenu4.style.display == 'block'){
        $clickMenu4.style.display = 'none'
    }else{
        $clickMenu4.style.display = 'block'
    }
}
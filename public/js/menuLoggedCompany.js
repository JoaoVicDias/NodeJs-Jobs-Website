const $liNameCompany = document.getElementById('nameCompany')
const $clickMenu4 = document.querySelector('.menu_logged--company')
const $toggleBtnCompany = document.querySelector('.toggle-button__company')
const $responsiveMenuCompany = document.querySelector(".responsive_menu--company")





$toggleBtnCompany.addEventListener('click',toggleButton)
$liNameCompany.addEventListener('click',callDisplay4)


function callDisplay4(){
    if($clickMenu4.style.display == 'block'){
        setTimeout(function(){
            $clickMenu4.style.opacity = '0'
        },250)
        setTimeout(function(){
            $clickMenu4.style.display = 'none'
        },350)
        $clickMenu4.style.transform = 'translateY(0)'
    }else{
        setTimeout(function(){
            $clickMenu4.style.opacity = '1'
            $clickMenu4.style.transform = 'translateY(2rem)'
        },10)
        $clickMenu4.style.display = 'block'
    }
}

function toggleButton(){
    if($responsiveMenuCompany.style.display == 'block'){
        setTimeout(function(){
             $responsiveMenuCompany.style.opacity = '0'
        },250)
        setTimeout(function(){
             $responsiveMenuCompany.style.display = 'none'
        },350)
         $responsiveMenuCompany.style.transform = 'translateY(0)'
    }else{
        setTimeout(function(){
             $responsiveMenuCompany.style.opacity = '1'
             $responsiveMenuCompany.style.transform = 'translateY(2rem)'
        },10)
         $responsiveMenuCompany.style.display = 'block'
    }
}
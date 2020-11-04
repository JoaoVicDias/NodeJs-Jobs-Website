const $liName = document.getElementById('name')
const $clickMenu3 = document.querySelector('.click_menu_logged')
const $responsiveMenuUser = document.querySelector(".responsive_menu--user")
const $toggleBtnUser = document.querySelector('.toggle-button__user')








$toggleBtnUser.addEventListener('click',toggleButton)
$liName.addEventListener('click',callDisplay3)




function callDisplay3(){
    if($clickMenu3.style.display == 'block'){
        setTimeout(function(){
            $clickMenu3.style.opacity = '0'
        },250)
        setTimeout(function(){
            $clickMenu3.style.display = 'none'
        },350)
        $clickMenu3.style.transform = 'translateY(0)'
    }else{
        setTimeout(function(){
            $clickMenu3.style.opacity = '1'
            $clickMenu3.style.transform = 'translateY(2rem)'
        },10)
        $clickMenu3.style.display = 'block'
    }
}

function toggleButton(){
    if($responsiveMenuUser.style.display == 'block'){
        setTimeout(function(){
             $responsiveMenuUser.style.opacity = '0'
        },250)
        setTimeout(function(){
             $responsiveMenuUser.style.display = 'none'
        },350)
         $responsiveMenuUser.style.transform = 'translateY(0)'
    }else{
        setTimeout(function(){
             $responsiveMenuUser.style.opacity = '1'
             $responsiveMenuUser.style.transform = 'translateY(2rem)'
        },10)
         $responsiveMenuUser.style.display = 'block'
    }
}



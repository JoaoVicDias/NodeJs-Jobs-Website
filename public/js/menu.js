const $btnCadastro = document.querySelector('.liCadastro1')
const $clickMenu2 = document.querySelector('.clickMenu2')
const $btnLogin = document.getElementById('login')
const $clickMenu = document.querySelector('.clickMenu')
const $toggleBtn = document.querySelector('.toggle-button')
const $responsiveMenu = document.querySelector(".responsive_menu")




$btnLogin.addEventListener('click',callDisplay1)
$btnCadastro.addEventListener('click',callDisplay2)
$toggleBtn.addEventListener('click',toggleButton)






function callDisplay1(){
    if($clickMenu.style.display == 'block'){
        setTimeout(function(){
            $clickMenu.style.opacity = '0'
        },250)
        setTimeout(function(){
            $clickMenu.style.display = 'none'
        },350)
        $clickMenu.style.transform = 'translateY(0)'

    }else if($clickMenu2.style.display == 'block'){
        $clickMenu2.style.display = 'none'
        $clickMenu.style.display = 'block'

    }else{
        setTimeout(function(){
            $clickMenu.style.opacity = '1'
            $clickMenu.style.transform = 'translateY(2rem)'
        },10)
        $clickMenu.style.display = 'block'
    }
}

function callDisplay2(){
    if($clickMenu2.style.display == 'block'){
        setTimeout(function(){
            $clickMenu2.style.opacity = '0'
        },250)
        setTimeout(function(){
            $clickMenu2.style.display = 'none'
        },350)
        $clickMenu2.style.transform = 'translateY(0)'
    }else if($clickMenu.style.display == 'block'){
        $clickMenu.style.display = 'none'
        $clickMenu2.style.display = 'block'

    }else{
        setTimeout(function(){
            $clickMenu2.style.opacity = '1'
            $clickMenu2.style.transform = 'translateY(2rem)'
        },10)
        $clickMenu2.style.display = 'block'
    }
}

function toggleButton(){
    if($responsiveMenu.style.display == 'block'){
        setTimeout(function(){
            $responsiveMenu.style.opacity = '0'
        },250)
        setTimeout(function(){
            $responsiveMenu.style.display = 'none'
        },350)
        $responsiveMenu.style.transform = 'translateY(0)'
    }else{
        setTimeout(function(){
            $responsiveMenu.style.opacity = '1'
            $responsiveMenu.style.transform = 'translateY(2rem)'
        },10)
        $responsiveMenu.style.display = 'block'
    }
}

const $btnCadastro = document.querySelector('.liCadastro1')
const $clickMenu2 = document.querySelector('.clickMenu2')
const $btnLogin = document.getElementById('login')
const $clickMenu = document.querySelector('.clickMenu')




$btnLogin.addEventListener('click',callDisplay1)
$btnCadastro.addEventListener('click',callDisplay2)






function callDisplay1(){
    if($clickMenu.style.display == 'block' ){
        $clickMenu.style.display = 'none'
    }else if($clickMenu2.style.display == 'block'){
        $clickMenu2.style.display = 'none'
        $clickMenu.style.display = 'block'

    }else{
        $clickMenu.style.display = 'block'
    }
}

function callDisplay2(){
    if($clickMenu2.style.display == 'block'){
        $clickMenu2.style.display = 'none'
    }else if($clickMenu.style.display == 'block'){
        $clickMenu.style.display = 'none'
        $clickMenu2.style.display = 'block'

    }else{
        $clickMenu2.style.display = 'block'
    }
}

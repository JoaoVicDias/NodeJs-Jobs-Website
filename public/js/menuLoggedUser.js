const $liName = document.getElementById('name')
const $clickMenu3 = document.querySelector('.clickMenu3')








$liName.addEventListener('click',callDisplay3)




function callDisplay3(){
    if($clickMenu3.style.display == 'block'){
        $clickMenu3.style.display = 'none'
    }else{
        $clickMenu3.style.display = 'block'
    }
}



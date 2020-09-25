const btnPrev = document.querySelector('.carrosel__btn--prev')
const btnNext = document.querySelector('.carrosel__btn--next')
const carrosel_2 = document.querySelector('.carrosel2-2')
const carrosel_2Iten = document.querySelectorAll('.carroselIten')
const qtd2 = carrosel_2Iten.length
const cont_li6 = document.querySelectorAll('.li_off')
let currentL2 = 0
let interval  = null


window.addEventListener('scroll',conteiner6)

btnNext.addEventListener('click',function(){
    currentL2++
    showBanner(currentL2)
})

btnPrev.addEventListener('click',function(){
    if(currentL2 == 0){
        btnPrev.disabled = true
    }else{
        currentL2--
        showBanner(currentL2)
    }
})
function settingButton(currentL2){
    btnPrev.disabled = !currentL2 > 0 
    btnNext.disabled = currentL2 === qtd2 - 1
}

function showBanner(currentL){
    offInterval()
    settingButton(currentL2)
    const widthCarrosel2 = parseInt(getComputedStyle(carrosel_2Iten[0]).width) 
    let newWidth = (widthCarrosel2 + 40) * currentL2 * -1
    carrosel_2.style.transform = 'translateX('+newWidth+'px)'
    carroselInterval()
}

const carroselInterval = () => {
   interval = setInterval(function(){
        currentL2++
        if(currentL2 >= qtd2) currentL2 = 0
        showBanner(currentL2)
    },4000)
} 
carroselInterval()

function offInterval(){
    clearInterval(interval)
}

function conteiner6(){
    let heightWindow = innerHeight - 100 
    cont_li6.forEach((iten) =>{
        if(iten.getBoundingClientRect().top < heightWindow ){
            iten.classList.remove('li_off')
            iten.classList.add('li_on')
        }else{
            iten.classList.remove('li_on')
            iten.classList.add('li_off')
            
        }
    })

    

}
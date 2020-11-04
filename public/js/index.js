const carrosel = document.querySelector('.carrosel2')
const text2 = document.querySelectorAll('.text2')
const btnPrev = document.querySelector('.carrosel__btn--prev')
const btnNext = document.querySelector('.carrosel__btn--next')
const carrosel_2 = document.querySelector('.carrosel2-2')
const carrosel_2Iten = document.querySelectorAll('.carroselIten')
const qtd2 = carrosel_2Iten.length
const qtd = text2.length
let currentL = 0
let currentL2 = 0
let heigthCarrosel = parseInt(getComputedStyle(text2[0]).height)
let interval  = null






window.addEventListener('load',language())
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






function language (){
    setInterval(function(){
        currentL++
        if(currentL>= qtd) currentL = 0
        let newHeigth = heigthCarrosel  * currentL * -1
        carrosel.style.transform = 'translateY('+newHeigth+'px)'
    },3000)
}

function settingButton(currentL2){
    btnPrev.disabled = !currentL2 > 0 
    btnNext.disabled = currentL2 === qtd2 - 1
}

function showBanner(currentL){
    offInterval()
    settingButton(currentL2)
    const widthCarrosel2 = parseInt(getComputedStyle(carrosel_2Iten[0]).width) 
    let newWidth = widthCarrosel2 * currentL2 * -1
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

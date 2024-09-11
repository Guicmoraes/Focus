const html = document.querySelector('html');

const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')
const buttonStart = document.getElementById('start-pause')
const buttons = document.querySelectorAll('button')

const startPauseImage = document.getElementById('start-pause-image')
const TextStartButton = document.querySelector("#start-pause span")
const titulo = document.querySelector('.app__title')

const banner = document.querySelector('.app__image')
const musicFocoInput = document.getElementById('alternar-musica')

const ScreenTime = document.querySelector('#timer')

const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop ==true

let intervaloId = null

let time = 1500

musicFocoInput.addEventListener('change',()=>{
    if(music.paused){
        music.play()
    } else{
        music.pause()
    }
})
focoButton.addEventListener('click',()=>{
    time = 3
    alterarContexto('foco')
    focoButton.classList.add('active')
    
})
curtoButton.addEventListener('click',()=>{
    time = 300
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active');
    
})

longoButton.addEventListener('click',()=>{
    time = 900
    alterarContexto('descanso-longo')
    longoButton.classList.add('active')
    
})

function alterarContexto(contexto){
    mostrarTempo()
    buttons.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break
        default:
            break
    }
}


const contagemRegressiva = ()=>{
    
    if(time <=0){
        const beepMusic = new Audio('/sons/beep.mp3')
        beepMusic.play()
        alert('Tempo finalizado')
        const focusActivated = html.getAttribute('data-contexto') == 'foco'
        if(focusActivated){
            const event = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(event)
        }
        zerar()
        return
    }
    time-=1
    mostrarTempo()    
}

buttonStart.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        const musicPause = new Audio('/sons/pause.mp3')
        musicPause.play()
        return
    }
    
    intervaloId = setInterval(contagemRegressiva, 1000)
    const musicStart = new Audio('/sons/play.wav')
    musicStart.play()
    TextStartButton.textContent = "Pausar"
    startPauseImage.setAttribute('src',"/imagens/pause.png")

}   


function zerar(){
    clearInterval(intervaloId)
    TextStartButton.textContent = 'Começar'
    startPauseImage.setAttribute('src','/imagens/play_arrow.png')
    intervaloId=null
}


function mostrarTempo(){
    const tempo = new Date(time*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute:'2-digit',second:'2-digit'})
    ScreenTime.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
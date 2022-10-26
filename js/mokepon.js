const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let opcionEscogida
let preguntaAleatoriaEscogida
let materiaElegida
let victorias = 0
let derrotas = 0
let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 600
let ingles = []
let matematicas = []
let sociales = []

const preguntasIngles = {

        "pregunta1": { "correcto": "D", "opcionA": "I plane to do it later", "opcionB": "I think to do later", "opcionC": "I think to do it after", "opcionD": "I think to do it later", "pregunta": "Pienso hacerlo despues" },
        "pregunta2": { "correcto": "A", "opcionA": "I am as old as you", "opcionB": "I am as old like you", "opcionC": "I am old as you", "opcionD": "I am as older as you", "pregunta": "Yo soy tan viejo como tú" },
        "pregunta3": { "correcto": "A", "opcionA": "I don't know why you want me to", "opcionB": "I dont know why you want me to", "opcionC": "I don't know why you want me", "opcionD": "I don't know why your want me to", "pregunta": "No sé por qué quieres que lo haga" },
        "pregunta4": { "correcto": "C", "opcionA": "What car is that?", "opcionB": "Whitch car is that?", "opcionC": "Whose car is that?", "opcionD": "Whose car is it that?", "pregunta": "¿De quién es ese coche?" },
        "pregunta5": { "correcto": "B", "opcionA": "What you did not tell me anything?", "opcionB": "Why you did not tell me anything?", "opcionC": "Why your did not tell me anything?", "opcionD": "Ninguna de las anteriores.", "pregunta": "¿Por qué no me dijiste nada?" },
}

const preguntasMatematicas = {

    "pregunta1": { "correcto": "B", "opcionA": "14, 37, 48", "opcionB": "13, 32, 46", "opcionC": "10, 41, 49", "opcionD": "12, 39, 44", "pregunta": "¿Cuáles son los números que faltan?, 4 ,___,18 ,25 ,___,37 ,___,49" },
    "pregunta2": { "correcto": "D", "opcionA": "2 bolsas de 3 kilos, 1 bolsa de 1 kilo y 1 bolsa de 1/2 kilo.", "opcionB": "1 bolsa de 3 kilos, 4 bolsas de 1 kilo y 5 bolsas de 1/2 kilo.", "opcionC": "1 bolsa de 3 kilos, 5 bolsas de 1 kilo y 3 bolsas de 1/2 kilo.", "opcionD": "2 bolsas de 3 kilos, 2 bolsas de 1 kilo y 1 bolsa de 1/2 kilo.", "pregunta": "Don Pedro fue a la tienda a comprar ocho kilos y medio de arroz. Solamente encontró bolsas de 3 kilos, 1 kilo y 1/2 kilo. Él lleva exactamente la cantidad de arroz que necesita si compra" },
    "pregunta3": { "correcto": "C", "opcionA": "menor que 2.", "opcionB": "mayor o igual que 2 y menor que 3.", "opcionC": "mayor o igual que 5 y menor que 8.", "opcionD": "mayor que 8.", "pregunta": "Con un cordón de 40 cm se mide el largo de una ventana. Se sabe que la ventana tiene entre 2 y 3 m de largo. El largo de la ventana en cordones es" },
    "pregunta4": { "correcto": "A", "opcionA": "150", "opcionB": "140", "opcionC": "120", "opcionD": "200", "pregunta": "Halla el volumen de un octaedro cuyos lados de la base miden 5 y 3 cm y su altura 10 cm." },
    "pregunta5": { "correcto": "A", "opcionA": "8/3", "opcionB": "3/5", "opcionC": "1/2", "opcionD": "3/4", "pregunta": " En una tierra lejana se pueden cambiar tres peces por dos panes y un pan por cuatro libras de arroz. ¿Cuántas libras de arroz hay que dar por un pez? " },
}

const preguntasSociales = {

    "pregunta1": { "correcto": "A", "opcionA": "La cordillera de los Andes", "opcionB": "La cordillera Central ", "opcionC": "La cordillera de Isabelia ", "opcionD": "La cordillera de Talamanca", "pregunta": "¿Cómo se llama la cordilleara que  recorren el lado oeste de Sudamérica?" },
    "pregunta2": { "correcto": "D", "opcionA": "Promulgar las leyes del país.", "opcionB": "Mantener el aseo y ornato de la comuna", "opcionC": "Juzgar los delitos ocurridos en su territorio. ", "opcionD": "Garantizar el orden público en su región.", "pregunta": "¿Cuál es una de las funciones de los Intendentes?" },
    "pregunta3": { "correcto": "B", "opcionA": "Colombia y Venezuela", "opcionB": "Estados unidos y union Sovietica", "opcionC": "union Sovietica y China", "opcionD": "Estados Unidos y Alemania", "pregunta": "¿Cuales paises pelean en la guerra fria?" },
    "pregunta4": { "correcto": "A", "opcionA": "La procaduria general de la nacion", "opcionB": "La fiscalia general de la nacion", "opcionC": "La defensoria del pueblo", "opcionD": "La presidencia de la republica", "pregunta": "¿Cual de las siguientes entidades del estado corresponde vigilar a los funcionarios publicos?" },
    "pregunta5": { "correcto": "A", "opcionA": "Presidente de la República, Gobernadores", "opcionB": "Senadores, Alcaldes", "opcionC": "Ejercito, policia", "opcionD": "Gobernadores, La comunidad", "pregunta": "¿Cual hace parte de la rama Ejecutiva?" },
}

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x, y, materia) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = x
        this.y = y
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.materia = materia
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', 10, 10, "")

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', 10, 10, "")

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', 10, 10, "")

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/ingles.png', 5, './assets/ingles.png', 10, mapa.height - 100, "Ingles")

let capipepoEnemigo = new Mokepon('Capipepo', './assets/matematicas.png', 5, './assets/matematicas.png', (mapa.width / 2) - 50 , mapa.height - 100, "Matematicas")

let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/sociales.png', 5, './assets/sociales.png', mapa.width - 100 , mapa.height - 100, "Sociales")

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🏔️', id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🏔️', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🏔️', id: 'boton-tierra' },
    { nombre: '🏔️', id: 'boton-tierra' },
    { nombre: '🏔️', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

capipepoEnemigo.ataques.push(
    { nombre: '🏔️', id: 'boton-tierra' },
    { nombre: '🏔️', id: 'boton-tierra' },
    { nombre: '🏔️', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🏔️', id: 'boton-tierra' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🏔️', id: 'boton-tierra' },
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputHipodoge = document.getElementById('Hipodoge')
     inputCapipepo = document.getElementById('Capipepo')
     inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
    if (inputHipodoge.checked) {
        
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
      
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

// Agregar las preguntas
function secuenciaAtaque(enemigo) {

    if("Ingles" == enemigo.materia){
        
        let numeroRandom = aleatorio(0, 4)
        let preguntas = Object.values(preguntasIngles)
        let preguntaAleatoria = preguntas[numeroRandom]
        preguntaAleatoriaEscogida = preguntaAleatoria

        document.getElementById("pregunta").innerHTML = preguntaAleatoria.pregunta
        let a = document.getElementById("labelA")
        let b = document.getElementById("labelB")
        let c = document.getElementById("labelC")
        let d = document.getElementById("labelD")

        a.innerHTML = preguntaAleatoria.opcionA
        b.innerHTML = preguntaAleatoria.opcionB
        c.innerHTML = preguntaAleatoria.opcionC
        d.innerHTML = preguntaAleatoria.opcionD

    

    }else if("Matematicas" == enemigo.materia){
        
        let numeroRandom = aleatorio(0, 4)
        let preguntas = Object.values(preguntasMatematicas)
        let preguntaAleatoria = preguntas[numeroRandom]
        preguntaAleatoriaEscogida = preguntaAleatoria

        document.getElementById("pregunta").innerHTML = preguntaAleatoria.pregunta
        let a = document.getElementById("labelA")
        let b = document.getElementById("labelB")
        let c = document.getElementById("labelC")
        let d = document.getElementById("labelD")

        a.innerHTML = preguntaAleatoria.opcionA
        b.innerHTML = preguntaAleatoria.opcionB
        c.innerHTML = preguntaAleatoria.opcionC
        d.innerHTML = preguntaAleatoria.opcionD
    }else{
        
        let numeroRandom = aleatorio(0, 4)
        let preguntas = Object.values(preguntasSociales)
        let preguntaAleatoria = preguntas[numeroRandom]
        preguntaAleatoriaEscogida = preguntaAleatoria

        document.getElementById("pregunta").innerHTML = preguntaAleatoria.pregunta
        let a = document.getElementById("labelA")
        let b = document.getElementById("labelB")
        let c = document.getElementById("labelC")
        let d = document.getElementById("labelD")

        a.innerHTML = preguntaAleatoria.opcionA
        b.innerHTML = preguntaAleatoria.opcionB
        c.innerHTML = preguntaAleatoria.opcionC
        d.innerHTML = preguntaAleatoria.opcionD
    }

}

function seleccionarMascotaEnemigo(enemigo) {
    document.getElementById("subtitulo").innerHTML = `Responde la pregunta de ${enemigo.materia}:`
    ataquesMokeponEnemigo = enemigo.ataques
    console.log(enemigo);
    secuenciaAtaque(enemigo)
}


function respuestaEnviada(){

    let arrayOpciones = [document.getElementById("A"), document.getElementById("B"), document.getElementById("C"), document.getElementById("D")]

    arrayOpciones.forEach((el) => {

    if(el.checked == true){

        return opcionEscogida = el.value
    }
})

if(opcionEscogida == preguntaAleatoriaEscogida.correcto){

    sectionMensajes.innerHTML = "Te ha quedado bien, Felicitaciones :)"
    victorias++
    document.getElementById("victorias").innerHTML = `Victorias: ${victorias}`
}else{
    sectionMensajes.innerHTML ="Te quedo mal:("
    derrotas++
    document.getElementById("derrotas").innerHTML = `Derrotas: ${derrotas}`
}

let btnResponder = document.getElementById("btn-responder")
btnResponder.disabled = true
document.getElementById("A").disabled = true
document.getElementById("B").disabled = true
document.getElementById("C").disabled = true
document.getElementById("D").disabled = true

}

function reiniciarMateria(){

    document.getElementById("seleccionar-ataque").style.display = "none"
    document.getElementById("ver-mapa").style.display = "flex"
    document.getElementById("resultado").innerHTML = "¡Mucha Suerte!"
    let quitar = document.getElementById(opcionEscogida)
    quitar.checked = false
    let btnResponder = document.getElementById("btn-responder")
    btnResponder.disabled = false
    document.getElementById("A").disabled = false
    document.getElementById("B").disabled = false
    document.getElementById("C").disabled = false
    document.getElementById("D").disabled = false
    mascotaJugadorObjeto.x = 0
    mascotaJugadorObjeto.y = 0
    iniciarMapa()
}


function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal


    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)





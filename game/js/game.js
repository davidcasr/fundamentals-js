const b = document.getElementById('b')
const as = document.getElementById('as')
const a = document.getElementById('a')
const gs = document.getElementById('gs')
const g = document.getElementById('g')
const fs = document.getElementById('fs')
const f = document.getElementById('f')
const e = document.getElementById('e')
const ds = document.getElementById('ds')
const d = document.getElementById('d')
const cs = document.getElementById('cs')
const c = document.getElementById('c')

const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel(), 500)    
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirNota = this.elegirNota.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.notas = {
      b, as, a, gs, g, fs, f, e, ds, d, cs, c
    }
  }

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroANota(numero){
    switch(numero){
      case 0:
        return 'b'
      case 1:
        return 'as'
      case 2:
        return 'a'
      case 3:
        return 'gs'
      case 4:
        return 'g'
      case 5:
        return 'fs'
      case 6:
        return 'f'
      case 7:
        return 'e'
      case 8:
        return 'ds'
      case 9:
        return 'd'
      case 10:
        return 'cs'
      case 11:
        return 'c'
    }
  }

  transformarNotaANumero(nota){
    switch(nota){
      case 'b':
        return 0
      case 'as':
        return 1
      case 'a':
        return 2
      case 'gs':
        return 3
      case 'g':
        return 4 
      case 'fs':
        return 5
      case 'f':
        return 6
      case 'e':
        return 7
      case 'ds':
        return 8
      case 'd':
        return 9
      case 'cs':
        return 10
      case 'c':
        return 11
    }
  }

  iluminarSecuencia(){
    for (let i = 0; i < this.nivel; i++) {
      const nota = this.transformarNumeroANota(this.secuencia[i])
      setTimeout(() => this.iluminarNota(nota), 1000 * i)
    }
  }

  iluminarNota(nota){
    this.notas[nota].classList.add('pressed')
    console.log(this.notas[nota])
    setTimeout(() => this.apagarNota(nota), 350)
  }

  apagarNota(nota){
    this.notas[nota].classList.remove('pressed')
  }

  agregarEventosClick(){
    this.notas.b.addEventListener('click', this.elegirNota)
    this.notas.as.addEventListener('click', this.elegirNota)
    this.notas.a.addEventListener('click', this.elegirNota)
    this.notas.gs.addEventListener('click', this.elegirNota)
    this.notas.g.addEventListener('click', this.elegirNota)
    this.notas.fs.addEventListener('click', this.elegirNota)
    this.notas.f.addEventListener('click', this.elegirNota)
    this.notas.e.addEventListener('click', this.elegirNota)
    this.notas.ds.addEventListener('click', this.elegirNota)
    this.notas.d.addEventListener('click', this.elegirNota)
    this.notas.cs.addEventListener('click', this.elegirNota)
    this.notas.c.addEventListener('click', this.elegirNota)
  }

  eliminarEventosClick(){
    this.notas.b.removeEventListener('click', this.elegirNota)
    this.notas.as.removeEventListener('click', this.elegirNota)
    this.notas.a.removeEventListener('click', this.elegirNota)
    this.notas.gs.removeEventListener('click', this.elegirNota)
    this.notas.g.removeEventListener('click', this.elegirNota)
    this.notas.fs.removeEventListener('click', this.elegirNota)
    this.notas.f.removeEventListener('click', this.elegirNota)
    this.notas.e.removeEventListener('click', this.elegirNota)
    this.notas.ds.removeEventListener('click', this.elegirNota)
    this.notas.d.removeEventListener('click', this.elegirNota)
    this.notas.cs.removeEventListener('click', this.elegirNota)
    this.notas.c.removeEventListener('click', this.elegirNota)
  }

  elegirNota(ev){
    const nombreNota = ev.target.dataset.nota
    const numeroNota = this.transformarNotaANumero(nombreNota)
    this.iluminarNota(nombreNota)
    if(numeroNota === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoElJuego()
        } else{
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    }else{
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal('Ganaste!', 'Ganaste!', 'success')
    .then(() => {
      this.inicializar()
    })
  }

  perdioElJuego(){
    swal('Perdiste!', 'Perdiste!', 'error')
    .then(() => {
      this.eliminarEventosClick()
      this.inicializar()
    })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
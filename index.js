const x = "X";
const O = "O";
let estadoJuego = "P1";
const cuadrado = document.querySelectorAll(".cuadrado");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");



cuadrado.forEach((cuadrado,i) => {
cuadrado.addEventListener("click", () => {
    if(estadoJuego === "Pausa")return;
    if(cuadrado.textContent !== "")return;
    cuadrado.innerText= estadoJuego === "P1" ? x : O;
    
    const posicionGanadora = hayAlgunGanador();
    if(typeof posicionGanadora === "object"){
        gana(posicionGanadora);
        return
    }
    if(posicionGanadora === "EMPATE"){
        mostrarModal("EMPATE");
    }
    estadoJuego = estadoJuego === "P1"? "P2" : "P1";
    
})
})
modal.querySelector("button").addEventListener("click", ()=>{
    cuadrado.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador",false);
    });
    modal.close();
    estadoJuego = "P1";
})


function hayAlgunGanador(){
const tablero = Array.from(cuadrado).map(cuadrado => cuadrado.textContent);
console.log(tablero)

//revisar horizontales
for (let i = 0; i <= 9; i += 3) {
if (tablero [i] &&
    tablero [i] === tablero [i+1] &&
    tablero [i] === tablero [i+2] ){
        return ([i,i+1,i+2]);     
    } 
}

//revisar verticales
for (let i = 0; i <= 3; i ++ ) {
if (tablero [i] &&
    tablero [i] === tablero [i+3] &&
    tablero [i] === tablero [i+6] ){
        return ([i,i+3,i+6]);      
    } 
}
//revisar x
if (tablero [0] &&
    tablero [0] === tablero [4] &&
    tablero [0] === tablero [8] ){
        return ([0,4,8]);      
    } 
if (tablero [2] &&
        tablero [2] === tablero [4] &&
        tablero [2] === tablero [6] ){
        return ([2,4,6]);      
        } 
if (tablero.includes(""))return false;
return ("EMPATE");
        
}

function gana(posicionGanadora){
    console.log("Ganador",posicionGanadora);
    
    posicionGanadora.forEach(posicion => 
    cuadrado[posicion].classList.toggle("ganador",true));
    mostrarModal("GANO: "+estadoJuego);
    estadoJuego = "Pausa";
}
function mostrarModal(texto){
    textoModal.innerText= texto;
    modal.showModal();
}

let nuevoNombre;
let nuevoApellido;
let nuevoEdad;
let nuevoDni;
let isActive = true;
let nuevoPersona;

let _empleados = [];
let _despedidos = [];

const botonContratar = document.querySelector("#btn-contratar");
const modal = document.querySelector("#modal");
const botonAgregar = document.querySelector("#btn-agregar");
const listaEmpleados = document.querySelector("#lista-empleados");
const listaJefes = document.querySelector("#lista-jefes");
let botonDespedido = document.querySelectorAll("#btn-despedir");
const listaDespedidos = document.querySelector("#lista-despedidos");


botonContratar.addEventListener("click",() => {
        if(isActive){
            modal.classList.add("active");
            isActive = false;
        }else if(!isActive){
            modal.classList.remove("active");
            isActive = true;
        }
    })
    
botonAgregar.addEventListener("click",() => {
        modal.classList.remove("active");
        listaEmpleados.innerHTML = "";
        capturarDatos();
    })
    
function capturarDatos(){
        
        function persona(nombre,apellido,edad,dni){
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        this.dni = dni;
    }

    nuevoNombre = document.querySelector("#nombre").value;
    nuevoApellido = document.querySelector("#apellido").value;
    nuevoEdad = document.querySelector("#edad").value;
    nuevoDni = document.querySelector("#dni").value;

    nuevoPersona = new persona(nuevoNombre,nuevoApellido,nuevoEdad,nuevoDni);
    _empleados.push(nuevoPersona);
    guardarEnLocal();
    cargarEmpleados();
    }

function cargarEmpleados(){
    let nuevoempleado = JSON.parse(localStorage.getItem("empleados"));
    listaEmpleados.innerHTML = "";
    for(empleado of _empleados){
        let div = document.createElement("div");
        div.classList.add("marco");
        div.classList.add("verde");
        div.classList.add("col-2");
        div.innerHTML +=`
                <p>Nombre:${empleado.nombre}</p>
                <p>Apellido:${empleado.apellido}</p>
                <p>Edad:${empleado.edad}</p>
                <p>DNI:${empleado.dni}</p>
                <button class="btn-despedir" id="${empleado.dni}">Despedir</button>
        `
        listaEmpleados.append(div);
    }
    botonDespedir();
    }

function cargarDespedidos(){
    let despedidos = JSON.parse(localStorage.getItem("despedidos"));
    listaDespedidos.innerHTML = "";
    for(despedido of _despedidos){
        let div = document.createElement("div");
        div.classList.add("marco");
        div.classList.add("rojo");
        div.classList.add("col-2");
        div.innerHTML +=`
                <p>Nombre:${despedido.nombre}</p>
                <p>Apellido:${despedido.apellido}</p>
                <p>Edad:${despedido.edad}</p>
                <p>DNI:${despedido.dni}</p>
        `
        listaDespedidos.append(div);
    }

}

function botonDespedir(){
    botonesDespedir = document.querySelectorAll(".btn-despedir");

    botonesDespedir.forEach(boton => {
        boton.addEventListener("click", agregarAdespidos);
        
    })

}

function agregarAdespidos(e){
    let idbtn= e.currentTarget.id;
    let agregardespidoindex = _empleados.findIndex(des => des.dni === idbtn);
    let agregardespido = _empleados.find(des => des.dni === idbtn);
    _despedidos.push(agregardespido);
    _empleados.splice(agregardespidoindex,1)
    guardarEnLocal();
    cargarEmpleados();
    cargarDespedidos();
    
}

function guardarEnLocal(){
    localStorage.setItem("empleados", JSON.stringify(_empleados));
    localStorage.setItem("despedidos", JSON.stringify(_despedidos));

}

cargarEmpleados();
cargarDespedidos();



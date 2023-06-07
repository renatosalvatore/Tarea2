//Creamos un array llamado empleados

let listaEmpleados = [];
//Creamos un objeto llamado empleados

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}
//Creamos una variable llamada editando, en estado false. Servira para cuando agregar y actualizar información.

let editando = false;

//Creamos constantes para elementos del formulario (elementos, boton, input)
const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

//Creamos eventos submit para la funcion del formulario
formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
//Genera alerta si los campos no tienen datos
    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos son obligatorios y se deben llenar!');
        return;
    }
//Funcion que permite validar para edita o agrega información.
    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        //inicializa los obj con los datos de los input
        objEmpleado.id = Date.now();//obtiene el timpo en ms para que no se repita
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;
//llamamos la funcion llamar empleados
        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});//agrega con push el objeto, los tres puntos es spread operator o operador de propagación que facilita la copia de un array.
                                          //https://www.todojs.com/copiar-objetos-en-javascript/

    mostrarEmpleados();//funcion que muestra empleados; linea 62

    formulario.reset();
    limpiarObjeto();
}
//funcion que limpia el formulario con los datos que ya fueron cargados
function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');//Referencia para agregar los elementos en html
    //Recorremos el array empleado
    listaEmpleados.forEach(empleado => {
        const {id, nombre, puesto} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = id;
    //creamos el boton editar    
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);//empleado es la funcion para cargar el empleado
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);
    //creamos el boton eliminar
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}
//funcion que recibe del array los datos del arreglo
function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;
//Reemplazamos los daos editados
    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}
//Funcion que permite limpiar la repeticion de datos
function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}
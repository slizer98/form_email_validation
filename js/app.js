// Varibles
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');

// Variables para el formulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners(){
    // Cuando la app inicie
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

// Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed');
    btnEnviar.classList.add('opacity-50');
}

function validarFormulario(e){

    if(e.target.value.length > 0){

        // Eliminar mensaje de error
        const error = document.querySelector('.error');
        if(error){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border-2', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border-2', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }
    if(e.target.type === 'email'){

        if(er.test(e.target.value)){
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border-2', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border-2', 'border-red-500');
            mostrarError('Email no valido');
        }
    }
    
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        console.log('Todo correcto');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed');
        btnEnviar.classList.remove('opacity-50');
    }else{
        console.log('Hay campos por validar');
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed');
        btnEnviar.classList.add('opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('my-3', 'text-red-500', 'text-sm', 'border', 'border-red-500', 'backgoround-red-100', 'p-3', 'text-center', 'error');
    
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.insertBefore(mensajeError, document.querySelector('.flex'));
    }
}
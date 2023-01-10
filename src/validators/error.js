
export const validator = (input, value) => {
  console.log(input,value)
    const emailRegex =
  /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    const nameRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/
    const currentDate = new Date()
    const dateIso = currentDate.toISOString()
    const dateIsoSubs = dateIso.substring(0,10)


    let error = {};
    
    if (input === 'full_name' && value.length < 5) {
      console.log("🚀 ~ file: error.js:15 ~ validator ~ value", value)
      console.log("🚀 ~ file: error.js:15 ~ validator ~ input", input)
      error[input] = 'El nombre ingresado debe ser mayor a 5 caracteres'
    
    }

    
    if (input === 'full_name' && !nameRegex.test(value)) {
      error[input] = 'El nombre solo debe contener letras'
    }
    if (input === 'email' && !emailRegex.test(value)) {
      error.email = 'El formato del email no es válido'
      
    }
    if (input === 'birth_date' && value > dateIsoSubs) {
      error.birth_date = 'La fecha de nacimiento no puede ser mayor al dia actual'
      
    }
    if (input === 'country_of_origin' && value === undefined ) {
      console.log("🚀 ~ file: error.js:30 ~ validator ~ value", value)
      error.country_of_origin = 'Debe seleccionar un país de origen'
      
    }
    if (input === 'checkbox' && value === false) {
      error.checkbox = 'Debe aceptar los terminos y condiciones'
      
    }
    
    
    
    
    return error;
  
}
import React from 'react'
import { useState } from 'react';



export const SubmitNoError = (birth_date, country_of_origin, email, full_name, terms_and_conditions) => {
    
    const [alerta, setAlerta] = useState('')
    
    const emailRegex =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
   
    const nameRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/

    const currentDate = new Date()
    const dateIso = currentDate.toISOString()
    const dateIsoSubs = dateIso.substring(0,10)


    if (!full_name) {
        setAlerta(
          <h3 className="alert">
           Debes ingresar un nombre
          </h3>
        );
        setTimeout(() => {
          setAlerta("");
        }, 3000);
  
        return;
      }
      if (full_name.length < 5) {
         setAlerta(
           <h3 className="alert">
            El nombre completo debe tener mas de 6 letras
          </h3>
        );
        setTimeout(() => {
          setAlerta("");
        }, 3000);
        
        return;
      }
      
      if (!nameRegex.test(full_name)) {
        setAlerta(
          <h3 className="alert">
            El nombre ingresado contiene caracteres inválidos
          </h3>
        );
        setTimeout(() => {
          setAlerta("");
        }, 3000);
        return;
      }
      
      if (!emailRegex.test(email)) {
        setAlerta(
          <h3 className="alert">
            El email ingresado no contiene caracteres válidos
          </h3>
        );
        setTimeout(() => {
          setAlerta("");
        }, 3000);
        return;
      }
      
      if (country_of_origin === '' || !country_of_origin || country_of_origin === '----Selecciona----') {
        setAlerta(
          <h3 className="alert">
           Debe seleccionar su país de origen
         </h3>
       );
       setTimeout(() => {
         setAlerta("");
        }, 3000);
        
        return;
      }
      if (birth_date === '' || !birth_date || birth_date > dateIsoSubs) {
        // console.log(birth_date)
        setAlerta(
         <h3 className="alert">
           La fecha de nacimiento no puede ser mayor al dia actual
         </h3>
       );
       setTimeout(() => {
         setAlerta("");
       }, 3000);
 
       return;
     }
      if (terms_and_conditions === false) {
        setAlerta(
         <h3 className="alert">
           Debe aceptar los terminos y condiciones
         </h3>
       );
       setTimeout(() => {
         setAlerta("");
       }, 3000);
 
       return;
     }
}


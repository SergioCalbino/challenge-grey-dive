import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dbInputs from "../src/json/dbInputs.json";
import { saveData, sendData } from "./application/api";
import Swal from "sweetalert2";
import "./App.scss";


const LandingPage = () => {

  
    const { items } = dbInputs;
    // console.log(items);
    const [item, setItem] = useState("");
    const [person, setPerson] = useState(null);
    const [alerta, setAlerta] = useState("");
    const navigate = useNavigate();
    
    const emailRegex =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
   
    const nameRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/


    useEffect(() => {
      showData()
    }, [])
    
  
    const showData = async () => {
      const data = await sendData()
        // console.log(data.docs[1].data())
       setPerson(data.docs) //para mapear hacer person.map(p => p.data())
  }

  
   
    const handleInputChange = (e) => {
     
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
    
      setItem({
        ...item,
        [name]: value
      })
  }
    

  

    const handleSubmit = async (e) => {
      e.preventDefault()
      const { birth_date, country_of_origin, email, full_name, terms_and_conditions} = item
      
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
      if (birth_date === '' || !birth_date) {
        setAlerta(
         <h3 className="alert">
           Debe seleccionar tu fecha de nacimiento
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
      
      
     await saveData(item)
      Swal.fire({
        title: 'Tus datos fueron guardados de forma exitosa',
        // showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Ver estadísticas',
        // denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/get-data')
        // } else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        }
      })
     
      
      
    
       
      
    }
    
    return (
      <>
        <div className="App">
         
          <h1> Ingresa tus datos </h1>
          <form type="submit" onSubmit={handleSubmit} >
            {items.map((item) => {
              return (
                <div className="form"  >
                  
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    {item.label}
                  </label>
                 
                 
                  {item.type === "select" ? (
                    <select 
                      
                      onChange={handleInputChange}
                      name={item.name}
                      required={item.required}
                      className="form-select"
                    >
                      {/* {console.log(item)} */}
                      <option>----Selecciona----</option>
                      {item.options.map((option) => {
                        return (
                          <option value={option.value} >{option.label}</option>
                        );
                      })}
                    </select>
                  ) : (
                    <input
                     
                      className="form-input"
                      name={item.name}
                      required={item.required}
                      type={item.type}
                      value={item.value}
                      onChange={handleInputChange}
                      maxLength={30}
                      
                    />
                    
                  )}
              
                  
                </div>
              );
            })}
          </form>
          {alerta}
        </div>
      </>
    );
}

export default LandingPage
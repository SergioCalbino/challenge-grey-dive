import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dbInputs from "../src/json/dbInputs.json";
import { saveData, } from "./application/api";
import Swal from "sweetalert2";
import "./App.scss";
import { validator } from "./validators/error";
import { objTester } from "./validators/helper";
import { SubmitNoError } from "./validators/SubmitNoError.jsx";


const LandingPage = () => {

  
    const { items } = dbInputs;
    // console.log(items);
    const [item, setItem] = useState({});
    const [error, setError] = useState({})
    const [alerta, setAlerta] = useState("");
    const navigate = useNavigate();
    
    const emailRegex =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
   
    const nameRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/

    const currentDate = new Date()
    const dateIso = currentDate.toISOString()
    const dateIsoSubs = dateIso.substring(0,10)


    // useEffect(() => {
    //   if(item.country_of_origen === undefined){
    //     setError({...error,country_of_origin : undefined})
    //   } else {
    //     setError({...error,country_of_origin :validator('country_of_origin', item.country_of_origin)['country_of_origin']})
    //   }  
      
    //   console.log("🚀 ~ file: LandingPage.jsx:39 ~ LandingPage ~ item", item)
    // }, [item])
    
  
  //   const showData = async () => {
  //     const data = await sendData()
  //       // console.log(data.docs[1].data())
  //      setPerson(data.docs) //para mapear hacer person.map(p => p.data())
  // }

  
   
    const handleInputChange = (e) => {
     
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      console.log('Soy el ' + name)
      setError({
        ...error,
        [name] : validator(name,value)[name]
        
      })
      
        setItem({
        ...item,
        [name]: value,

      })
      console.log(error)

     
  }
    

  

    const handleSubmit = async (e) => {
      e.preventDefault()
      const { birth_date, country_of_origin, email, full_name, terms_and_conditions} = item
      
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
      
     await saveData(item)
      Swal.fire({
        title: 'Tus datos fueron guardados de forma exitosa',
        confirmButtonText: 'Ver estadísticas',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/get-data')
       
        }
      })
     
      
      
    
       
      
    }
    
    return (
      <>
        <div className="App">
         
          <h1> Ingresa tus datos </h1>
          <form type="submit" onSubmit={handleSubmit} >
            {items.map((item, idx) => {
              return (
                <div className="form" key={idx} >
                  
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    {item.label}
                  </label>
                 
                    {/* {error} */}
                 
                  {item.type === "select" ? (
                    <>
                    <select 
                      
                      onChange={handleInputChange}
                      name={item.name}
                      required={item.required}
                      className="form-select"
                     
                    >
                      
                      <option  >----Selecciona----</option>
                      {item.options.map((option, i) => {
                        return (
                          <option key={i} value={option.value} >{option.label}</option>
                        );
                      })}
                    </select>
                    <p>{error[item.name]}</p>
                    </>
                  ) : (
                    
                      objTester(error) ? 
                      <>
                        <input
                         
                          className="form-input"
                          name={item.name}
                          required={item.required}
                          type={item.type}
                          value={item.value}
                          onChange={handleInputChange}
                          maxLength={30}
                          
                        />
                         <p>{error[item.name]}</p>
                         </> : 
                      <>
                      <input
                       
                        className="form-input"
                        name={item.name}
                        required={item.required}
                        type={item.type}
                        value={item.value}
                        onChange={handleInputChange}
                        maxLength={30}
  
                        
                      />
                       <p>{error[item.name]}</p>
                       </>
                       
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
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
    // const [check, setCheck] = useState(false);
    const [person, setPerson] = useState(null);
    const [alerta, setAlerta] = useState("");
    const navigate = useNavigate();
    
    let emailRegex =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  
   
    useEffect(() => {
      showData()
    }, [])
    
  
    const showData = async () => {
      const data = await sendData()
        console.log(data.docs[1].data())
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
      console.log(item)
      
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const { birth_date, country_of_origin, email, full_name, terms_and_conditions} = item
      // console.log(full_name)
      if ([birth_date, country_of_origin, email, full_name, terms_and_conditions].includes('')) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Todos los campos son obligatorios`,
          showConfirmButton: false,
          timer: 2500,
        });
       
      } 
      console.log(alerta)
      saveData(item)
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
                  {alerta}
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
                      
                      // checked={check}
                    />
                  )}
                  
                {/* <button onClick={handleSubmit} >Enviar</button> */}
                </div>
              );
            })}
          </form>
        </div>
      </>
    );
}

export default LandingPage
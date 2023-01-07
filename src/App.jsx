import { useState } from "react";
import dbInputs from "../src/json/dbInputs.json";
//  import { sendData } from "./aplication/sendData.js";
import { saveData } from "./application/api";


import "./App.scss";
// import Prueba from "./Prueba";


const App = () => {
 
 
  const { items } = dbInputs;
  console.log(items);
  const [item, setItem] = useState("");
  const [check, setCheck] = useState(false);
  
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
    // console.log(e.target.value)
    saveData(item)
   
    // sendData(item)
    
  
     
    console.log('Nueva tarea agregada')
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
                    {console.log(item)}
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

export default App;

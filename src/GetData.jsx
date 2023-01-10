import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendData } from "./application/api";
import "./getData.scss";

const GetData = () => {
  const [person, setPerson] = useState(null);


  useEffect(() => {
    showData();
  }, []);

  const showData = async () => {
    const data = await sendData();
   
    setPerson(data.docs); 
   
  };

  
  return (
    <>
      <h1 >Estadísticas</h1>
      {person &&
        person?.map((p,i) => {

          return (
            
              <div key={i} className="stats-box">
                <p className="categoria-1">
                  Nombre completo:{" "}
                  <strong>{p._document.data.value.mapValue.fields.full_name.stringValue}</strong>
                </p>
                <p className="categoria-2">
                  Email:{" "}
                 <strong> {p._document.data.value.mapValue.fields.email.stringValue}</strong>
                </p>
                <p className="categoria-3">
                  Cumpleaños:{" "}
                  <strong>{
                    p._document.data.value.mapValue.fields.birth_date
                      .stringValue
                  }</strong>
                </p>
                <p className="categoria-3">
                  Pais de origen:{" "}
                  <strong>{
                    p._document.data.value.mapValue.fields.country_of_origin.stringValue
                  }</strong>
                </p>
              
              </div>
            
          );
        })}
        <div>

     
      <Link to={'/'} ><button className="button" >Volver al menu inicial</button></Link>
 
        </div>
    </>
  );
};

export default GetData;

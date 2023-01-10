import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendData } from "./application/api";
import "./getData.scss";

const GetData = () => {
  const [person, setPerson] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    showData();
  }, []);

  const showData = async () => {
    const data = await sendData();
    //   console.log(data.docs[1].data())
    setPerson(data.docs); //para mapear hacer person.map(p => p.data())
    //_document.data.value.mapValue.fields.birth_date
  };

  
  return (
    <>
      <h1 >Estadísticas</h1>
      {person &&
        person?.map((p,i) => {
          {/* console.log(p); */}
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
                {/* <h4>¿Acepta terminos y condiciones?: {p._document.data.value.mapValue.fields.terms_and_conditions.stringValue}</h4>  */}
              </div>
            
          );
        })}
        <div>

      {/* <Link className="button" to={'/'} >Volver al menu inicial</Link> */}
      <Link to={'/'} ><button className="button" >Volver al menu inicial</button></Link>
 
        </div>
    </>
  );
};

export default GetData;

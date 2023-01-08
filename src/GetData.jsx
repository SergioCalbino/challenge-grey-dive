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

  console.log(person);
  return (
    <>
      <h1 >Estadísticas</h1>
      {person &&
        person?.map((p) => {
          console.log(p);
          return (
            <>
              <div className="stats-box">
                <p>
                  Nombre completo:{" "}
                  {p._document.data.value.mapValue.fields.full_name.stringValue}
                </p>
                <p>
                  Email:{" "}
                  {p._document.data.value.mapValue.fields.email.stringValue}
                </p>
                <p>
                  Cumpleaños:{" "}
                  {
                    p._document.data.value.mapValue.fields.birth_date
                      .stringValue
                  }
                </p>
                {/* <h4>¿Acepta terminos y condiciones?: {p._document.data.value.mapValue.fields.terms_and_conditions.stringValue}</h4>  */}
              </div>
            </>
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

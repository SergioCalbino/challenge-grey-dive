import React, { useEffect, useState } from 'react'
import { sendData } from './application/api';

const GetData = () => {
    const [person, setPerson] = useState(null);


    useEffect(  () => {
        showData()
      }, [])
      
    
      const showData = async () => {
        const data = await sendData()
        //   console.log(data.docs[1].data())
         setPerson(data.docs) //para mapear hacer person.map(p => p.data())
       //_document.data.value.mapValue.fields.birth_date

    
      }

      console.log(person)
  return (
    <>
        {
           person && person?.map(p=> {
                console.log(p)
                return (
                    <>
                        <h1>Cumleaños: {p._document.data.value.mapValue.fields.birth_date.stringValue}</h1> 
                    </>
                )
            })
        }
        
    </>
   
  )
}

export default GetData
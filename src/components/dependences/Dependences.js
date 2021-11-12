import React, {useEffect,useState} from 'react';
import edificeAxios from '../../config/axios';

import Dependence from './Dependence';

import {Link,useParams} from 'react-router-dom';



const Dependences = ()=>{

    //Obtener el id
    const { id } = useParams();
    
    //Trabajar con el state
    const [dependences,saveDependences]=useState([]);
    
    //Query a la API
    const consultarApi = async()=>{
        const dependenciesQuery = await edificeAxios.get(`/dependences/edifice/${id}`);

        //colocar el resultado en el state dependence
        saveDependences(dependenciesQuery.data);
       
    }

    const actualizarListado = async(update)=>{

        if (update) {
            const dependenciesQuery = await edificeAxios.get(`/dependences/edifice/${id}`);

            //colocar el resultado en el state dependence
            saveDependences(dependenciesQuery.data);
        }
        
    }

    useEffect(()=>{
        consultarApi();
    },[]);

    return (
        <>
            <h2>Dependencias</h2>

            <Link to ={`/dependences/nuevo/${id}`} className="btn btn-azul nvo-edifice"> <i className="fas fa-plus-circle"></i>
                Nueva dependencia
            </Link>

            <ul className="listado-edifices">
                {dependences.map(dependence=>{
                     //console.log(dependence)
                    return( 
                    <Dependence
                        key={dependence._id}
                        dependence={dependence}
                        actualizarListado={actualizarListado}
                    />)
                })}
            </ul>
        </>
    );
    
}

export default Dependences;
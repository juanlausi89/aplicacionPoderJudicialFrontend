import React, {useEffect,useState} from 'react';
import edificeAxios from '../../config/axios';

import Edifice from './Edifice';
import FormSearchEdifice from './SearchEdifice';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

const Edifices = ()=>{
    
    //Trabajar con el state
    const [edifices,saveEdifices]=useState([]);
    const [search,saveSearch]=useState('');
    
    //Query a la API
    const consultarApi = async()=>{
        const edificesQuery = await edificeAxios.get('/edifices');

        //colocar el resultado en el state edifices
        saveEdifices(edificesQuery.data);
    }

    const actualizarListado = async(update)=>{

        if (update) {
            const edificesQuery = await edificeAxios.get('/edifices');

            //colocar el resultado en el state edifices
            saveEdifices(edificesQuery.data);  
        }
        
    }

    useEffect(()=>{
        consultarApi();
    },[]);

    
    
    //Busca el edificio
    const searchEdifice = async(e)=>{
        e.preventDefault();

        if(search===""){
            consultarApi();
        }else{
                  
            // obtener los productos de la busqueda
            const resultSearch = await edificeAxios.post(`/edifices/search/${search}`);

            
            // si no hay resultados una alerta, contrario agregarlo al state
            if(resultSearch.data[0]) {
    
                // ponerlo en el state
                saveEdifices(resultSearch.data);

            } else {
                // no hay resultados
                Swal.fire({
                    type: 'error',
                    title: 'No Resultados',
                    text: 'No hay resultados'
                })
            }

        }
    }

    //almacenar la busqueda en el state
    const readDateSearch=(e)=>{
        saveSearch(e.target.value);
    }

    return (
        <>
            <h2>Edificios</h2>

            <Link to="/edifices/nuevo"  className="btn btn-azul nvo-edificio"> <i className="fas fa-plus-circle"></i>
                Nuevo Edificio
            </Link>

            <FormSearchEdifice
            searchEdifice={searchEdifice}
            readDateSearch={readDateSearch}
            />

            <ul className="listado-edifices">
                {edifices.map(edifice=>{
                    return (
                    <Edifice
                        key={edifice._id}
                        edifice={edifice}
                        actualizarListado={actualizarListado}
                    />);
                })}
            </ul>
        </>
    );
    
}

export default Edifices;
import React,{useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';
import edificeAxios from '../../config/axios';


function NewEdifice(){

    const navigate = useNavigate();

    //edifice=state, saveEdifices= funcion para guardar el state
    const[edifice, saveEdifices] = useState({
        name:'',
        address:'',
    });

    //leer los datos del formulario
    const updateState = (e)=>{
        //Almacenar lo que el usuario escribe en el state
        saveEdifices({
            //Obtener una copia del state actual (mapero los datos)
            ...edifice,
            [e.target.name] : e.target.value
        })
        
    };

    //Añade en la rest api un edificio nuevo
    const AddEdifice=(e)=>{
        e.preventDefault();
        
        //enviar peticion
        edificeAxios.post('/edifices',edifice)
            .then(res=>{
                //Validar errores de la base de datos
                if (res.data.code===11000) {
                    Swal.fire({
                        type:'error',
                        title:'Hubo un error',
                        text:'Ese edificio ya esta registrado'
                    }
                        
                    )
                   console.log('Error de duplicado de Mongo'); 
                }else{
                    Swal.fire(
                        'Se agrego el Edificio',
                        res.data.message,
                        'success'
                    )
                }
                //Redireccionar
                navigate('/edifices');
            });
    }


    //Validar el formulario
    const validateEdifice=()=>{
        //Destructuracion
        const {name,address}=edifice;
        //Revisar que las propiedades del objeto tengan contenido
        let validate=!name.length || !address.length ;

        return validate;
    }
   


    return(
        <>
            <h2>Nuevo Edificio</h2>
            <form
                onSubmit={AddEdifice}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Edificio:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Edificio" 
                        name="name"
                        onChange={updateState}
                        />
                </div>

                <div className="campo">
                    <label>Direccion:</label>
                    <input 
                        type="text" 
                        placeholder="Direccion" 
                        name="address"
                        onChange={updateState}
                        />
                </div>
                 
                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Edificio"
                            disabled={validateEdifice()}
                            />
                </div>

            </form>

        </> 
        
    );
}

export default NewEdifice;
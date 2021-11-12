import React,{useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate,useParams } from 'react-router-dom';
import edificeAxios from '../../config/axios';


function NewDependence(){

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();

    //edifice=state, saveEdifices= funcion para guardar el state
    const[dependence, saveDependences] = useState({
        name:'',
        address:'',
        edifice:id
    });

    //leer los datos del formulario
    const updateState = (e)=>{
        //Almacenar lo que el usuario escribe en el state
        saveDependences({
            //Obtener una copia del state actual (mapero los datos)
            ...dependence,
            [e.target.name] : e.target.value
        })
        
    };

    //Añade en la rest api un edificio nuevo
    const AddDependence=(e)=>{
        e.preventDefault();
        
        //enviar peticion
        edificeAxios.post('/dependences',dependence)
            .then(res=>{
                //Validar errores de la base de datos
                if (res.data.code===11000) {
                    Swal.fire({
                        type:'error',
                        title:'Hubo un error',
                        text:'Esa dependencia ya esta registrada'
                    }
                        
                    )
                   console.log('Error de duplicado de Mongo'); 
                }else{
                    Swal.fire(
                        'Se agrego la dependencia',
                        res.data.message,
                        'success'
                    )
                }
                //Redireccionar
                navigate(`/dependences/edifice/${id}`);
            });
    }


    //Validar el formulario
    const validateDependence=()=>{
        //Destructuracion
        const {name,address}=dependence;
        //Revisar que las propiedades del objeto tengan contenido
        let validate=!name.length || !address.length ;

        return validate;
    }
   


    return(
        <>
            <h2>Nueva Dependencia</h2>
            <form
                onSubmit={AddDependence}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Dependencia:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Dependencia" 
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
                            value="Agregar Dependencia"
                            disabled={validateDependence()}
                            />
                </div>

            </form>

        </> 
        
    );
}

export default NewDependence;
import React,{useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useNavigate,useParams } from 'react-router-dom';
import edificeAxios from '../../config/axios';


function EditDependence(props){

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();
    
    //edifice=state, saveEdifices= funcion para guardar el state
    const[dependence, dateDependences] = useState({
        name:'',
        address:'',
        edifice:id
    });

    //Query a la api
    const consultApi = async ()=>{
        const dependenceConsult = await edificeAxios.get(`/dependences/${id}`);
        
        //Colocar en el state
        dateDependences(dependenceConsult.data);
    }

    useEffect(()=>{
        consultApi();
    },[]);
    

    //leer los datos del formulario
    const updateState = (e)=>{
        //Almacenar lo que el usuario escribe en el state
        dateDependences({
            //Obtener una copia del state actual (mapero los datos)
            ...dependence,
            [e.target.name] : e.target.value
        })
        
    };

    //Envia una peticion por axios para actualizar el edificio
    const updateDependence = (e) => {
        e.preventDefault();

        edificeAxios.put(`/dependences/${dependence._id}`,dependence)
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
                        'Se edito el Edificio',
                        res.data.message,
                        'success'
                    )
                }
                //Redireccionar
                navigate(`/dependences/edifice/${dependence.edifice._id}`);
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
            <h2>Editar Dependencia</h2>
            <form
             onSubmit={updateDependence}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Dependencia:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Edificio" 
                        name="name"
                        onChange={updateState}
                        value={dependence.name}
                        />
                </div>

                <div className="campo">
                    <label>Direccion:</label>
                    <input 
                        type="text" 
                        placeholder="Direccion" 
                        name="address"
                        onChange={updateState}
                        value={dependence.address}
                        />
                </div>
                 
                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Editar Dependencia"
                            disabled={validateDependence()}
                            />
                </div>

            </form>

        </> 
        
    );
}

export default EditDependence;
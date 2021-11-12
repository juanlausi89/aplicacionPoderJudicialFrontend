import React,{useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useNavigate,useParams } from 'react-router-dom';
import edificeAxios from '../../config/axios';


function EditEdifice(props){

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();
    
    //edifice=state, saveEdifices= funcion para guardar el state
    const[edifice, dateEdifices] = useState({
        name:'',
        address:'',
    });

    //Query a la api
    const consultApi = async ()=>{
        const edificeConsult = await edificeAxios.get(`/edifices/${id}`);
        
        //Colocar en el state
        dateEdifices(edificeConsult.data);
    }

    useEffect(()=>{
        consultApi();
    },[]);
    

    //leer los datos del formulario
    const updateState = (e)=>{
        //Almacenar lo que el usuario escribe en el state
        dateEdifices({
            //Obtener una copia del state actual (mapero los datos)
            ...edifice,
            [e.target.name] : e.target.value
        })
        
    };

    //Envia una peticion por axios para actualizar el edificio
    const updateEdifice = (e) => {
        e.preventDefault();

        edificeAxios.put(`/edifices/${edifice._id}`,edifice)
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
            <h2>Editar Edificio</h2>
            <form
             onSubmit={updateEdifice}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Edificio:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Edificio" 
                        name="name"
                        onChange={updateState}
                        value={edifice.name}
                        />
                </div>

                <div className="campo">
                    <label>Direccion:</label>
                    <input 
                        type="text" 
                        placeholder="Direccion" 
                        name="address"
                        onChange={updateState}
                        value={edifice.address}
                        />
                </div>
                 
                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Editar Edificio"
                            disabled={validateEdifice()}
                            />
                </div>

            </form>

        </> 
        
    );
}

export default EditEdifice;
import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import edificeAxios from '../../config/axios';

function Edifice(props){
    const {_id,name,address,consultarApi}=props.edifice;
    
    //Eliminar Edificio
    const deleteEdifice = (id)=>{
        Swal.fire({
			title: '¿Estas seguro?',
			text: "Un edificio eliminado no se puede recuperar",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
                // Llamado a axios
                edificeAxios.delete(`/edifices/${id}`)
                    .then(res => {
                        Swal.fire(  
                            'Eliminado', 
                            res.data.message, 
                            'success'
                        );
                    });
                     
			}

            props.actualizarListado(true);
            
		});
    };
    
    return (
        <li className="edificio">
            <div className="info-edificio">
                <p className="nombre">{name}</p>
                <p>{address}</p>
                
            </div>
            <div className="acciones">
                <Link to={`/dependences/edifice/${_id}`}  className="btn btn-azul">
                    <i className="fas fa-eye "></i>
                    Ver Dependencias
                </Link>
                <Link to={`/edifices/editar/${_id}`}  className="btn btn-naranja">
                    <i className="fas fa-pen-alt"></i>
                    Editar Edificio
                </Link>
                <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={()=>deleteEdifice(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Edificio
                </button>
            </div>
        </li>
    );
}

export default Edifice;
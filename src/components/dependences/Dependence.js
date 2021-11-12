import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import edificeAxios from '../../config/axios';

function Dependence(props){
    const {_id,name,address}=props.dependence;
    

    //Eliminar Dependencia
    const deleteDependence = (id)=>{
        Swal.fire({
			title: '¿Estas seguro?',
			text: "Una dependencia eliminada no se puede recuperar",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
                // Llamado a axios
                edificeAxios.delete(`/dependences/${id}`)
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
                <Link to={`/dependences/editar/${_id}`}  className="btn btn-naranja">
                    <i className="fas fa-pen-alt"></i>
                    Editar Dependencia
                </Link>
                <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={()=>deleteDependence(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Dependencia
                </button>
            </div>
        </li>
    );
}

export default Dependence;
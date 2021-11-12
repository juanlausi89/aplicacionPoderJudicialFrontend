import React from 'react';

function SearchEdifice(props){
    return(
        <form
                onSubmit={props.searchEdifice}
            >
                <legend>Busca un Edificio</legend>

                <div className="campo">
                    <label>Edificio:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Edificio" 
                        name="name" 
                        onChange={props.readDateSearch}
                    />
                </div>

                <input
                    type="submit"
                    className="btn btn-azul btn-block"
                    value="Buscar Edificio"
                />

            </form>
    );
}
export default SearchEdifice;
import React from 'react';

function Input(props) {
    return (
        <div className="input-field col s6">
            {
                props.isNumberField ?
                <div>
                    <label className="active">{props.label}</label>
                    <div className="input-container">
                        <i class="material-icons">attach_money</i>
                        <input type="number" min={0} step={0.01} name={props.name} disabled={props.disabled} className={`validate ${props.msgError && "invalid"}`} value={props.data} onChange={props.handleChange} />
                    </div>
                    <span className="helper-text" data-error="Ingrese un total inicial válido"></span>
                </div>
                :
                <div>
                    <label className="active">{props.label}</label>
                    <input name={props.name} disabled={props.disabled} type="text" className="validate" value={props.data} onChange={props.handleChange} />
                </div>
            }
        </div>
    )
}

export default Input;
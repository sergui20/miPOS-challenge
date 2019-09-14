import React from 'react';

import './expenses.css'

function Expenses(props) {
    return (
        <div className="row align-expenses">
            <div className="input-field col s5">
                <div>
                    <input type="text" name="name" className="validate" value={props.name} onChange={(ev) => props.handleExpenses(ev, props.index)} />
                </div>
                <label className="active">Motivo</label>
            </div>

            <div className="input-field col s5">
                <div className="input-container">
                    <i class="material-icons">attach_money</i>
                    <input type="number" min={0} step={0.01} name="value" className="validate" value={props.value} min={0} onChange={(ev) => props.handleExpenses(ev, props.index)} />
                </div>
                <label className="active">Valor</label>
            </div>

            <div className="col s2">
                <button type="button" className="btn-flat" onClick={() => props.removeExpense(props.index)}>
                    <i className="material-icons delete-icon">delete</i>
                </button>
            </div>
        </div>
    )
}

export default Expenses
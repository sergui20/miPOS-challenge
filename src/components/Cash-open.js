import React, {Component} from 'react';
import Input from './Input';

class CashOpen extends Component {
    state = {
        date_open: "",
        hour_open: "",
        value_previous_close: 0,
        value_open: 0,
        obs: "",
        msgError: false
    }

    componentDidMount() {
        const headers = new Headers({
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiNjU2ZjFlMzNkZGFlY2Q1ZTJiMGVjZGI5MDk5N2Q4YzJkNjRiZjQ2NTQyNDE3YWFmNDk3MTAyZmYzOTBiYWU5NWZmM2Y3OTcwYzJiZmQ2In0.eyJhdWQiOiIxIiwianRpIjoiMGI2NTZmMWUzM2RkYWVjZDVlMmIwZWNkYjkwOTk3ZDhjMmQ2NGJmNDY1NDI0MTdhYWY0OTcxMDJmZjM5MGJhZTk1ZmYzZjc5NzBjMmJmZDYiLCJpYXQiOjE1Njg0MDA5MTUsIm5iZiI6MTU2ODQwMDkxNSwiZXhwIjoxNjAwMDIzMzE1LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.CuTXIDs8mW6BTVNDWb429jzXoKEqALJjMPzNP0eImmBP1XkAhy5kZ_WZVyvndGH_gKELVUiS7YxpzGMkHvCTNlt2o1VauHIuObatUgsLs_j1N0eFpYmW0cZwEJ8jsYg9D6SrPgGV3-w-XUgRvZMW-IDF1tc9ue_attP9RTOtirIdcBv5TEfoTR_7m9xFLqTnL-2g4Sz_SAb9EKQhixOUL90l_jSFncr-IjCH_gstlZ9baBpGxvvmx-6FuRd2hthD89IuH50XqUvEgpDVdy5CrsTIyg0iPGxfTfcLaGvT-eKTbS1B_Oa9rlfDRTYAzCZy4CCNWrqeBjMh292ZAI_6feKrX86mphxU99QgqHrT0HERubQPbzuHWwj5MBSqFgyE4n6yTKPz5MhdcWdajgvfPYSBlP1q9GwYlBhUGnS6yCX1uR6HsWwsk9FDgi7RkicZ_ke0k05_XolK2KSgp00EEvIdD44l2-dOJuG8jafXvOQWo9tIFHGlOrCgJ4cg8Qgit5ZPHvyBL9bZP5ZWtqG-g38GKvWSEl2_a7R5CON9k5f9X_IdSvSJXa64IWL12lfg2CsEGkXI0FWShQHbmwuQJglCWHG0ODkfV85sIqBHdpFcwz6T49fYvi4NjDTaW1pzhnFHfc_35FvEpuMVLeuOV46rwzD73a7l6xe-Yb0GRbg'
        })

        fetch('https://mipos.shop/api/v1/cashier/balance', {method: 'GET', headers})
            .then(res => {
                return res.json()
            })
            .then( res => {
                let {date_open, hour_open, value_previous_close, value_open} = res.results

                if(!value_open) {
                    // value_open = "0.00"
                    value_open = 0
                }

                value_open = (value_open * 0.01).toFixed(2)
                value_previous_close = (value_previous_close * 0.01).toFixed(2)
                
                this.setState({
                    date_open,
                    hour_open,
                    value_previous_close,
                    value_open
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value,
            msgError: false
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        if(this.state.value_open <= 0) {
            this.setState({
                msgError: true
            })
        } else {
            this.props.handleCashOpen(this.state)
        }
    }

    render() {
        return (
            <form className="col s12 m5" onSubmit={this.handleSubmit}>
                <div className="row">
                    <Input name="date_open" label="Fecha (yyyy/mm/dd)" data={this.state.date_open} disabled handleChange={this.handleChange} />
                    <Input name="hour_open" label="Hora (hh:mm)" data={this.state.hour_open} disabled handleChange={this.handleChange} />
                </div>

                <div className="row">
                    <Input isNumberField name="value_previous_close" label="Total anterior" data={this.state.value_previous_close} disabled handleChange={this.handleChange} />
                    <Input isNumberField name="value_open" label="Total inicial" disabled={this.props.open} data={this.state.value_open} handleChange={this.handleChange} msgError={this.state.msgError} />
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <textarea name="obs" placeholder="" disabled={this.props.open} className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label>Observaciones</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 center-align">
                        <button type="submit" disabled={this.props.open} className="btn">Enviar</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CashOpen;
import React, {Component} from 'react';
import moment from 'moment';

import Input from './Input';
import Expenses from './Expenses';

class CashClose extends Component {
    state = {
        expenses: [],
        close: 0,
        card: 0,
        value: 0,
        sales: 0,
        cash: 0,
        closeCash: 0,
        disable: false
    }

    componentDidMount() {
        const headers = new Headers({
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiNjU2ZjFlMzNkZGFlY2Q1ZTJiMGVjZGI5MDk5N2Q4YzJkNjRiZjQ2NTQyNDE3YWFmNDk3MTAyZmYzOTBiYWU5NWZmM2Y3OTcwYzJiZmQ2In0.eyJhdWQiOiIxIiwianRpIjoiMGI2NTZmMWUzM2RkYWVjZDVlMmIwZWNkYjkwOTk3ZDhjMmQ2NGJmNDY1NDI0MTdhYWY0OTcxMDJmZjM5MGJhZTk1ZmYzZjc5NzBjMmJmZDYiLCJpYXQiOjE1Njg0MDA5MTUsIm5iZiI6MTU2ODQwMDkxNSwiZXhwIjoxNjAwMDIzMzE1LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.CuTXIDs8mW6BTVNDWb429jzXoKEqALJjMPzNP0eImmBP1XkAhy5kZ_WZVyvndGH_gKELVUiS7YxpzGMkHvCTNlt2o1VauHIuObatUgsLs_j1N0eFpYmW0cZwEJ8jsYg9D6SrPgGV3-w-XUgRvZMW-IDF1tc9ue_attP9RTOtirIdcBv5TEfoTR_7m9xFLqTnL-2g4Sz_SAb9EKQhixOUL90l_jSFncr-IjCH_gstlZ9baBpGxvvmx-6FuRd2hthD89IuH50XqUvEgpDVdy5CrsTIyg0iPGxfTfcLaGvT-eKTbS1B_Oa9rlfDRTYAzCZy4CCNWrqeBjMh292ZAI_6feKrX86mphxU99QgqHrT0HERubQPbzuHWwj5MBSqFgyE4n6yTKPz5MhdcWdajgvfPYSBlP1q9GwYlBhUGnS6yCX1uR6HsWwsk9FDgi7RkicZ_ke0k05_XolK2KSgp00EEvIdD44l2-dOJuG8jafXvOQWo9tIFHGlOrCgJ4cg8Qgit5ZPHvyBL9bZP5ZWtqG-g38GKvWSEl2_a7R5CON9k5f9X_IdSvSJXa64IWL12lfg2CsEGkXI0FWShQHbmwuQJglCWHG0ODkfV85sIqBHdpFcwz6T49fYvi4NjDTaW1pzhnFHfc_35FvEpuMVLeuOV46rwzD73a7l6xe-Yb0GRbg'
        })

        fetch("https://mipos.shop/api/v1/has/open/cashier/balance", {method: 'GET', headers})
        .then(res => res.json())
        .then(res => {
            let { close, card, value } = res

            close = (close * 0.01).toFixed(2)
            card = (card * 0.01).toFixed(2)
            value = (value * 0.01).toFixed(2)

            this.setState({
                close,
                card,
                value,
                sales: (Number(close) + Number(card)).toFixed(2),
                cash: (Number(this.props.data.value_previous_close) +  Number(value)).toFixed(2),
                closeCash: (Number(close) + Number(value)).toFixed(2)
            })

        })
        .catch(err => {
            console.log(err)
        })
    }

    addExpense = () => {
        this.state.expenses.push({name: "", value: 0})
        this.setState({
            expenses: this.state.expenses
        })
    }

    removeExpense = (index) => {
        this.state.expenses.splice(index, 1)

        const totalExpenses = this.totalExpenses()
        const cash = ((Number(this.props.data.value_previous_close) + Number(this.state.value)) - totalExpenses).toFixed(2)

        this.setState({
            expenses: this.state.expenses,
            cash,
            disable: cash >= 0 ? false : true
        })
    }

    handleExpenses = (ev, index) => {
        if(ev.target.value < 0) {
            ev.target.value = 0
        }

        this.state.expenses[index][ev.target.name] = ev.target.value

        const totalExpenses = this.totalExpenses()
        const cash = ((Number(this.props.data.value_previous_close) + Number(this.state.value)) - totalExpenses).toFixed(2)

        this.setState({
            expenses: this.state.expenses,
            cash,
            disable: cash >= 0 ? false : true
        })
    }

    totalExpenses = () => {
        let sum = 0
        this.state.expenses.forEach(el => {
            sum += Number(el.value)
        })
        return sum
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiNjU2ZjFlMzNkZGFlY2Q1ZTJiMGVjZGI5MDk5N2Q4YzJkNjRiZjQ2NTQyNDE3YWFmNDk3MTAyZmYzOTBiYWU5NWZmM2Y3OTcwYzJiZmQ2In0.eyJhdWQiOiIxIiwianRpIjoiMGI2NTZmMWUzM2RkYWVjZDVlMmIwZWNkYjkwOTk3ZDhjMmQ2NGJmNDY1NDI0MTdhYWY0OTcxMDJmZjM5MGJhZTk1ZmYzZjc5NzBjMmJmZDYiLCJpYXQiOjE1Njg0MDA5MTUsIm5iZiI6MTU2ODQwMDkxNSwiZXhwIjoxNjAwMDIzMzE1LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.CuTXIDs8mW6BTVNDWb429jzXoKEqALJjMPzNP0eImmBP1XkAhy5kZ_WZVyvndGH_gKELVUiS7YxpzGMkHvCTNlt2o1VauHIuObatUgsLs_j1N0eFpYmW0cZwEJ8jsYg9D6SrPgGV3-w-XUgRvZMW-IDF1tc9ue_attP9RTOtirIdcBv5TEfoTR_7m9xFLqTnL-2g4Sz_SAb9EKQhixOUL90l_jSFncr-IjCH_gstlZ9baBpGxvvmx-6FuRd2hthD89IuH50XqUvEgpDVdy5CrsTIyg0iPGxfTfcLaGvT-eKTbS1B_Oa9rlfDRTYAzCZy4CCNWrqeBjMh292ZAI_6feKrX86mphxU99QgqHrT0HERubQPbzuHWwj5MBSqFgyE4n6yTKPz5MhdcWdajgvfPYSBlP1q9GwYlBhUGnS6yCX1uR6HsWwsk9FDgi7RkicZ_ke0k05_XolK2KSgp00EEvIdD44l2-dOJuG8jafXvOQWo9tIFHGlOrCgJ4cg8Qgit5ZPHvyBL9bZP5ZWtqG-g38GKvWSEl2_a7R5CON9k5f9X_IdSvSJXa64IWL12lfg2CsEGkXI0FWShQHbmwuQJglCWHG0ODkfV85sIqBHdpFcwz6T49fYvi4NjDTaW1pzhnFHfc_35FvEpuMVLeuOV46rwzD73a7l6xe-Yb0GRbg'
        })

        const body = {
            date_close: this.formatDate(),
            hour_close: this.formatTime(),
            value_card: this.state.card * 100,
            value_cash: this.state.cash * 100,
            value_close: this.state.cash * 100,
            value_open: this.state.value * 100,
            value_sales: this.state.sales * 100,
            expenses: this.state.expenses
        }

        console.log(body)
        fetch("https://mipos.shop/api/v1/cashier/balance/close/day", {method: "POST", headers, body: JSON.stringify(body)})
        .then(res => res.json())
        .then(res => {
            if(res.msg === "Información guardada con éxito") {
                this.props.successClose()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    formatDate = () => {
        return moment().format("YYYY[-]MM[-]DD")
    }

    formatTime = () => {
        return moment().format("h[:]mm[:]ss")
    }

    render() {
        return (
            <form className="col s12 m5 push-m2" onSubmit={this.handleSubmit}>
                <div className="row">
                    <Input label="Fecha (yyyy/mm/dd)" data={this.formatDate()} disabled />
                    <Input label="Hora (hh:mm)" data={this.formatTime()} disabled />
                </div>

                <div className="row">
                    <Input isNumberField label="Ventas en efectivo" data={this.state.close} disabled />
                    <Input isNumberField label="Ventas por tarjeta" data={this.state.card} disabled />
                </div>

                <div className="row">
                    <Input isNumberField label="Total en ventas" data={this.state.sales} disabled />
                    <Input isNumberField label="Total apertura" data={this.state.value} disabled />
                </div>

                <div className="row">
                    <Input isNumberField label="Total de caja" data={this.state.cash} disabled />
                </div>

                <div className="row">
                    <div className="col s12 center-align">
                        <button type="button" className="btn btn-green" onClick={this.addExpense}>Agregar gasto</button>
                    </div>
                </div>

                {
                    this.state.expenses.map( (el, index) => {
                        return <Expenses key={index} index={index} {...el} handleExpenses={this.handleExpenses} removeExpense={this.removeExpense}/>
                    })
                }

                <div className="row">
                    <div className="col s12 center-align">
                        <button type="submit" className="btn" disabled={this.state.disable}>Cerrar caja con ${this.state.cash}</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CashClose;
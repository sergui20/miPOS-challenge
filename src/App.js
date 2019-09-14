import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import CashOpen from './components/Cash-open';
import CashClose from './components/Cash-close';

class App extends Component {
  state = {
    open: false,
    cashOpenValues: null,
    successMsg: false
  }

  handleCashOpen = (data) => {
    data.value_previous_close *= 100
    data.value_open *= 100

    const headers = new Headers({
      "Content-Type": "application/json",
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiNjU2ZjFlMzNkZGFlY2Q1ZTJiMGVjZGI5MDk5N2Q4YzJkNjRiZjQ2NTQyNDE3YWFmNDk3MTAyZmYzOTBiYWU5NWZmM2Y3OTcwYzJiZmQ2In0.eyJhdWQiOiIxIiwianRpIjoiMGI2NTZmMWUzM2RkYWVjZDVlMmIwZWNkYjkwOTk3ZDhjMmQ2NGJmNDY1NDI0MTdhYWY0OTcxMDJmZjM5MGJhZTk1ZmYzZjc5NzBjMmJmZDYiLCJpYXQiOjE1Njg0MDA5MTUsIm5iZiI6MTU2ODQwMDkxNSwiZXhwIjoxNjAwMDIzMzE1LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.CuTXIDs8mW6BTVNDWb429jzXoKEqALJjMPzNP0eImmBP1XkAhy5kZ_WZVyvndGH_gKELVUiS7YxpzGMkHvCTNlt2o1VauHIuObatUgsLs_j1N0eFpYmW0cZwEJ8jsYg9D6SrPgGV3-w-XUgRvZMW-IDF1tc9ue_attP9RTOtirIdcBv5TEfoTR_7m9xFLqTnL-2g4Sz_SAb9EKQhixOUL90l_jSFncr-IjCH_gstlZ9baBpGxvvmx-6FuRd2hthD89IuH50XqUvEgpDVdy5CrsTIyg0iPGxfTfcLaGvT-eKTbS1B_Oa9rlfDRTYAzCZy4CCNWrqeBjMh292ZAI_6feKrX86mphxU99QgqHrT0HERubQPbzuHWwj5MBSqFgyE4n6yTKPz5MhdcWdajgvfPYSBlP1q9GwYlBhUGnS6yCX1uR6HsWwsk9FDgi7RkicZ_ke0k05_XolK2KSgp00EEvIdD44l2-dOJuG8jafXvOQWo9tIFHGlOrCgJ4cg8Qgit5ZPHvyBL9bZP5ZWtqG-g38GKvWSEl2_a7R5CON9k5f9X_IdSvSJXa64IWL12lfg2CsEGkXI0FWShQHbmwuQJglCWHG0ODkfV85sIqBHdpFcwz6T49fYvi4NjDTaW1pzhnFHfc_35FvEpuMVLeuOV46rwzD73a7l6xe-Yb0GRbg'
    })

    fetch("https://mipos.shop/api/v1/cashier/balance/open/day", {method: "POST", headers, body: JSON.stringify(data)})
    .then(res => res.json())
    .then(res => {
      if(res.msg === "¡La caja ya está abierta!" || res.msg === "Información guardada con éxito") {
        data.value_previous_close = (data.value_previous_close * 0.01).toFixed(2)
        data.value_open = (data.value_open * 0.01).toFixed(2)

        this.setState({
          open: true,
          cashOpenValues: data
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  successClose = () => {
    this.setState({
      open: false,
      successMsg: true
    })

    setTimeout(() => {
      this.setState({
        successMsg: false
      })
    }, 4000)
  }

  render() {
    return (
      <div className="main">
        <Header />

        <div className="container">
          <div className="row">
            <CashOpen handleCashOpen={this.handleCashOpen} open={this.state.open} />

            {
              this.state.open ?
              <CashClose data={this.state.cashOpenValues} open={this.state.open} successClose={this.successClose} />
              :
              <div className="col s12 m5 push-m2">
                <p>No se puede mostrar esta informacion !</p>
                {
                  this.state.successMsg &&
                  <p className="success-msg">Información guardada exitosamente !</p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;

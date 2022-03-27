import React from 'react'
import { Toast } from 'react-bootstrap'
import { FiCheckCircle } from 'react-icons/fi'

const ShowAlert = (props) => {
  const { latestPrice, symbol } = props.selectedHolding

  return (
    <Toast className="mx-auto" onClose={() => props.toggleAlertState()} show={props.isShowAlert} delay={7000} autohide>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded mr-2"
          alt=""
        />
        <strong className="mr-auto">Transaction Completed <FiCheckCircle className="text-success h5 mb-0" /></strong>
      </Toast.Header>
      <Toast.Body>Successfully {props.alertMessage} {props.sharesPurchased} shares from {symbol} for a total of ${props.sharesPurchased * latestPrice}</Toast.Body>
    </Toast>
  );
}

export default ShowAlert

import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import { WELCOME_STEPS } from "../../shared/constants";
import CustomModal from "../custom-modal/custom-modal";
import EmptyCloset from "./components/empty-closet/empty-closet";
import EmptyColor from "./components/empty-color/empty-color";
import AddItem from "../add-item/add-item";

function WelcomeModal (props) {
  const {
    show, onHide, addItemToDB
  } = props;

  const [currentStep, setCurrentStep] = useState(WELCOME_STEPS.CLOSET)


  return (
    <CustomModal show={show} onHide={onHide}>
      {currentStep === WELCOME_STEPS.CLOSET && <EmptyCloset onClick={() => setCurrentStep(WELCOME_STEPS.NEW_ITEM)}/>}
      {currentStep === WELCOME_STEPS.COLORS && <EmptyColor />}
      {currentStep === WELCOME_STEPS.NEW_ITEM && <AddItem addItemToDB={addItemToDB}/>}
      {currentStep === WELCOME_STEPS.CLOSET && 
            <Button variant="link" onClick={()=>{setCurrentStep(WELCOME_STEPS.COLORS)}}>Skip this step
            </Button>}
    </CustomModal>
  )
}

WelcomeModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
}

export default WelcomeModal;
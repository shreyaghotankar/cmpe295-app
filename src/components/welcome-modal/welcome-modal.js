import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import { WELCOME_STEPS } from "../../shared/constants";
import styles from './welcome-modal.module.scss';
import CustomModal from "../custom-modal/custom-modal";
import EmptyCloset from "./components/empty-closet/empty-closet";
import EmptyColor from "./components/empty-color/empty-color";

function WelcomeModal (props) {
    const {
        show, onHide
    } = props;

    const [currentStep, setCurrentStep] = useState(WELCOME_STEPS.CLOSET)


    return (
        <CustomModal show={show} onHide={onHide}>
            {currentStep === WELCOME_STEPS.CLOSET && <EmptyCloset onClick={() => setCurrentStep(WELCOME_STEPS.NEW_ITEM)}/>}
            {currentStep === WELCOME_STEPS.COLORS && <EmptyColor />}
            {currentStep === WELCOME_STEPS.NEW_ITEM && <div>Add new item here</div>}
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
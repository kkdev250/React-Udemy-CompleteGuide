import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

const animationTiming = {
    enter: 400, //timeout between 'entering' and 'entered'
    exit: 1000, //timeout between 'exiting' and 'exited'
}

const modal = (props) => {
    return (
        <CSSTransition 
            in={props.show}
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            classNames="fade-slide"
            //result: there will be new class added to the <div> inside <CSSTransition>:
            //[fade-slide]-enter, []-enter-active, []-exit, []-exit-active
            //
            //alternatively setup with own class names:
            //classNames={{
            //    enter: '',
            //    enterActive: 'ModalOpen', (class name instead of "[sth]-enter-active")
            //    exit: '',
            //    exitActive: 'ModalClosed'
            //}}
        >
            <div className={'Modal'}>
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>Dismiss</button>
            </div>
        </CSSTransition>
    );
}

export default modal;
import React from 'react';
import disableScroll from 'disable-scroll';
import "./modal.css"
const Modal = ({active, setActive, children}) => {
    // if (active) {
    //     document.querySelector('body').style.overflow = 'hidden'
    // }else{
    //     document.querySelector('body').style.overflow = 'auto'
    // }
    if (active){
        disableScroll.on()
    }else{
        disableScroll.off()

    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            setActive(false)
        }
    });

    return (
        <div className={active ? "modald active" : "modald"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {children}

            </div>
        </div>
    );
};

export default Modal;
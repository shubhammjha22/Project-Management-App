import { createPortal } from "react-dom";
import {forwardRef, useImperativeHandle,useRef} from 'react';
import Buttons from "./Buttons";

const Modal=forwardRef( function Modal({children ,buttonCaption},ref){
    
    const dialog =useRef();

    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        };
    });
    
    return createPortal(
       (  <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-sm shadow-md " >
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Buttons>{buttonCaption}</Buttons>
            </form>
        </dialog>
       )
    ,document.getElementById('modal-root') );

    
} );

export default Modal;

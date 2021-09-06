export default function ModalWindow(props){
    return(
        <div className="modal-window">
            <div className="modal-header" style={{padding:"0 20px"}}>
                <h2>{props.modalHeader}</h2>
                <span onClick={props.onClose} className="close-button">&times;</span>
            </div>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    )
}
import ReactDOM from "react-dom"

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    if (!show) return null

    return ReactDOM.createPortal(
        <div className="modal">
            <h3>{title}</h3>
            <h4>{content}</h4>
            <div className="mt-3">
                <button className="px-3 me-3" onClick={onClose}>Annulla</button>
                <button className="px-3" onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>,
        document.body
    )
}
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure?</h2>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onRequestClose}>No</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;


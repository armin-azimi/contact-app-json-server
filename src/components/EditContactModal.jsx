import { useState, useEffect } from 'react';
import './EditContactModal.css'; 

const EditContactModal = ({ isOpen, onRequestClose, contact, onUpdateContact }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setNumber(contact.number);
        }
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedContact = { ...contact, name, email, number };
        onUpdateContact(updatedContact);
        onRequestClose();
    };

    if (!isOpen) return null;     

    return (
        <div className="modal-overlay">
            <div className="modal-content-add">
                <h2>Edit Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    <button type="submit">Update Contact</button>
                    <button type="button" onClick={onRequestClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;
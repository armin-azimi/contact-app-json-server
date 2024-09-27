import  { useState } from 'react';
import './ContactModal.css'; 

const ContactModal = ({ isOpen, onRequestClose, onAddContact }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContact = { id: Date.now(), name: `${firstName} ${lastName}`, email, number };
        onAddContact(newContact);
        setFirstName('');
        setLastName('');
        setEmail('');
        setNumber('');
        onRequestClose(); 
    };

    if (!isOpen) return null;     

    return (
        <div className="modal-overlay">
            <div className="modal-content-add">
                <h2>Add Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="number" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    <button className='add-contact-button' type="submit">Add Contact</button>
                    <button className='cancel-button'  type="button" onClick={onRequestClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;


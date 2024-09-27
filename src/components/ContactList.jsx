import './ContactList.css';
import { useState } from 'react';

const ContactList = ({ contacts, onRemoveContacts, onEditContact }) => {
    const [selectedContacts, setSelectedContacts] = useState([]);

    const handleCheckboxChange = (id) => {
        if (selectedContacts.includes(id)) {
            setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
        } else {
            setSelectedContacts([...selectedContacts, id]);
        }
    };

    const handleRemoveSelected = () => {
        onRemoveContacts(selectedContacts);
        setSelectedContacts([]);
    };

    return (
        <>
            <button onClick={handleRemoveSelected} className='remove-selected-button'>
                Remove Selected
            </button>
            <ul className="contact-list">
                {contacts.map(contact => (
                    <li key={contact.id} className="contact-item">
                        <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleCheckboxChange(contact.id)}
                        />
                        <div className="contact-info">
                            <span>Name: {contact.name}</span>
                            <span>Email: {contact.email}</span>
                            <span>Number: {contact.number}</span>
                        </div>
                        <button className='edit-button' onClick={() => onEditContact(contact)}>Edit</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ContactList;

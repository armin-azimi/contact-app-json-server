import { useState } from 'react';
import { useContacts } from '../context/ContactContext';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState(''); 
    const { addContact } = useContacts();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContact = { id: Date.now(), name, email, number }; 
        addContact(newContact);
        setName('');
        setEmail('');
        setNumber('');  
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
            <button type="submit">Add Contact</button>
        </form>
    );
};

export default ContactForm;

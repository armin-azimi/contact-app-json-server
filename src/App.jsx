import { useState, useEffect } from 'react';
import { ContactProvider, useContacts } from './context/ContactContext';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import ConfirmationModal from './components/ConfirmationModal';
import EditContactModal from './components/EditContactModal';
import './App.css';

const App = () => {
    const { clearContacts, addContact, removeContact, contacts } = useContacts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleAddContact = (newContact) => {
        addContact(newContact);
        setIsModalOpen(false);
    };

    const handleRemoveContact = () => {
        if (contactToRemove) {
            removeContact(contactToRemove);
            setContactToRemove(null);
        }
        setIsConfirmModalOpen(false);
    };

    const handleClearContacts = async () => {
        await clearContacts();
        setIsConfirmModalOpen(false);
    };

    const handleEditContact = (contact) => {
        setContactToEdit(contact);
        setIsEditModalOpen(true);
    };

    const handleUpdateContact = async (updatedContact) => {
        await fetch(`http://localhost:5000/contacts/${updatedContact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContact),
        });

        removeContact(updatedContact.id);
        addContact(updatedContact);
        setIsEditModalOpen(false);
    };

    const handleRemoveContacts = async (ids) => {
        for (const id of ids) {
            await removeContact(id);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.number.includes(searchTerm)
    );

    return (
        <div>
            <Header onClear={() => setIsConfirmModalOpen(true)} onSearch={setSearchTerm} />
            <button className='add-contact-button-main' onClick={() => setIsModalOpen(true)}>Add Contact</button>
            <ContactList
                contacts={filteredContacts}
                onRemoveContacts={handleRemoveContacts}
                onEditContact={handleEditContact}
            />
            <ContactModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                onAddContact={handleAddContact} 
            />
            <EditContactModal 
                isOpen={isEditModalOpen} 
                onRequestClose={() => setIsEditModalOpen(false)} 
                contact={contactToEdit} 
                onUpdateContact={handleUpdateContact} 
            />
            <ConfirmationModal 
                isOpen={isConfirmModalOpen} 
                onRequestClose={() => setIsConfirmModalOpen(false)} 
                onConfirm={contactToRemove ? handleRemoveContact : handleClearContacts} 
            />
        </div>
    );
};

const Root = () => (
    <ContactProvider>
        <App />
    </ContactProvider>
);

export default Root;


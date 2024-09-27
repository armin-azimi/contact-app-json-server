import { createContext, useReducer, useContext, useEffect } from 'react';

const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const CLEAR_CONTACTS = 'CLEAR_CONTACTS';
const SET_CONTACTS = 'SET_CONTACTS';

const initialState = [];

const contactReducer = (state, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return action.payload;
        case ADD_CONTACT:
            return [...state, action.payload];
        case REMOVE_CONTACT:
            return state.filter(contact => contact.id !== action.payload);
        case CLEAR_CONTACTS:
            return [];
        default:
            return state;
    }
};

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('http://localhost:5000/contacts');
            const data = await response.json();
            dispatch({ type: SET_CONTACTS, payload: data });
        };

        fetchContacts();
    }, []);

    const addContact = async (contact) => {
        const response = await fetch('http://localhost:5000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });
        const newContact = await response.json();
        dispatch({ type: ADD_CONTACT, payload: newContact });
    };

    const removeContact = async (id) => {
        await fetch(`http://localhost:5000/contacts/${id}`, {
            method: 'DELETE',
        });
        dispatch({ type: REMOVE_CONTACT, payload: id });
    };

    const clearContacts = async () => {
        const response = await fetch('http://localhost:5000/contacts', {
            method: 'DELETE',
        });
        dispatch({ type: CLEAR_CONTACTS });
    };

    return (
        <ContactContext.Provider value={{ contacts: state, addContact, removeContact, clearContacts }}>
            {children}
        </ContactContext.Provider>
    );
};


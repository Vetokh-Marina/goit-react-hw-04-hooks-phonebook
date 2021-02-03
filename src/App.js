import  { useState,useEffect, useRef } from 'react';
import shortid from 'shortid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Section from './components/Section';

const initContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

    const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
    };
  
   useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      parsedContacts
        ? setContacts(parsedContacts)
        : setContacts(initContacts);

      isFirstRender.current = false;
      return;
    }
  }, []);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} contacts={contacts} />
      </Section>

      <Section title="Contacts">
        <Filter
          value={filter}
          onChange={event => setFilter(event.currentTarget.value)}
        />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}
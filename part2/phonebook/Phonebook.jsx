import { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons'
import Filter from './Filter'
import phoneServices from './services/Phones'
import Notification from './Notification'

const Phonebook = () => {
    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ searchName, setSearchName ] = useState('');
    const [ message, setMessage ] = useState(null);

    useEffect(() => {
        phoneServices
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }, [])

    const addNewPerson = (event) => {
        event.preventDefault()

        const newPersonObj = {
            name: newName,
            number: newNumber,
        }
        
        const found = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
        const contact = persons.find(p => p.name.toLocaleLowerCase() === newName.toLowerCase());

        if(!found) {
            phoneServices
                .create(newPersonObj)
                .then(data => {
                    setPersons(persons.concat(data));
                    setNewName('');
                    setNewNumber('');
                })
                setMessage(
                    `Added ${newName}`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
        } else if(found && newNumber.trim() === contact.number.trim()) {
            alert(`${newName} already exists in the phonebook`)
        } else {
            const confirm = window.confirm(`${contact.name} is already added to phonebook, replace the old number with a new one?`)
            if(confirm) {
                phoneServices
                    .update(contact.id, newPersonObj)
                    .then(updatedObj => {
                        setPersons(persons.map(p => p.id === contact.id ? updatedObj : p))
                        setNewName('');
                        setNewNumber('');
                    })
                    .catch(e => {
                        setMessage(
                            `Information of ${contact.name} has already been removed from server`
                        )
                        setTimeout(() =>{
                            setMessage(null);
                        },4000)
                        setPersons(persons.filter(person => person.name !== contact.name))
                    })
            }
        }
    }

    const removePerson = id => {
        const person = persons.find(p => p.id === id);
        const confirm = window.confirm(`Delete ${person.name}`);

        if(confirm) {
            phoneServices
                .deleteEntry(id)
                .then(returnedPerson => {
                    setPersons(persons.filter(person => person.id !== returnedPerson.id));
                })
        }
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleFilter = (event) => {
        setSearchName(event.target.value);
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter searchName={searchName} handleFilter={handleFilter} />
            <h3>Add a new</h3>
            <PersonForm 
                newName={newName} newNumber={newNumber} addNewPerson={addNewPerson} 
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} id={persons} 
            />
            <h3>Numbers</h3>
            {persons
                .filter(person => 
                    person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))
                        .map((person, index) => 
                            <Persons key={index} name={person.name} number={person.number} removePerson={() => removePerson(person.id)} />
            )}
        </div>
    )
}

export default Phonebook;
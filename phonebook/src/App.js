import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  // This function is called after clicking submit.
  const addPerson = (event) => {
    event.preventDefault();

    // Find the index of the object that contains the same `name`, if any
    const personIndex = persons.findIndex((person) => person.name === newName);

    // If `name` already exists, send alert
    if (personIndex > -1) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      // Create new object with the `name` and `number`
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      // Add new object to the persons array
      setPersons(persons.concat(nameObject));

      // Reset values in the input boxes
      setNewName("");
      setNewNumber("");
    }
  };

  // This function is called when there are changes in the name input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // This function is called when there are changes in the number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // This function is called when there are changes in the search box
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);

    if (event.target.value === "") {
      // If there is no input in the search box, show all
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  };

  // Check the value of showAll
  // If true, assign contents of person
  // If false, filter the values tht include the newSearch
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;

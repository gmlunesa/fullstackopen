import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneBookService from "./services/phoneBookService";

import "./styles/index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const [alertMessage, setAlertMessage] = useState({});

  // Define person-fetch hook
  const personHook = () => {
    phoneBookService.getAll().then((data) => {
      setPersons(data);
    });
  };

  useEffect(personHook, []);

  // This function is called after clicking submit.
  function addPerson(event) {
    event.preventDefault();

    // Find the index of the object that contains the same `name`, if any
    const personIndex = persons.findIndex((person) => person.name === newName);

    // If `name` already exists, send alert
    if (personIndex > -1) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        // Create a new object based on the found person on the `persons` array
        const nameObject = {
          ...persons[personIndex],
          number: newNumber,
        };

        console.log(nameObject, persons[personIndex]);

        // Update person on the server
        // Then, update persons array on the local state
        phoneBookService
          .update(persons[personIndex].id, nameObject)
          .then((response) => {
            // Modify the object in the array that needs to be updated
            setPersons(
              persons.map((person) =>
                person.name === response.name ? response : person
              )
            );

            // Set the alert messages detail accordingly
            setAlertMessage({
              message: `Successfully updated ${response.name}.`,
              className: "success",
            });

            // Set the timeout so the notification disappear
            setTimeout(() => {
              setAlertMessage({});
            }, 5000);
          })
          .catch((error) => {
            // Set the alert messages detail accordingly
            setAlertMessage({
              message: `Information on ${nameObject.name} has already been removed from the server.`,
              className: "error",
            });

            // Set the timeout so the notification disappear
            setTimeout(() => {
              setAlertMessage({});
            }, 5000);
          });
      }
    } else {
      // Create new object with the `name` and `number`
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      // Add new person object to the server
      phoneBookService.add(nameObject).then(() => {
        // Add new object to the persons array
        setPersons(persons.concat(nameObject));

        // Set the alert messages detail accordingly
        setAlertMessage({
          message: `Successfully added ${nameObject.name}.`,
          className: "success",
        });

        // Set the timeout so the notification disappear
        setTimeout(() => {
          setAlertMessage({});
        }, 5000);
      });
    }

    // Reset values in the input boxes
    setNewName("");
    setNewNumber("");
  }

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
  // If false, filter the values that include the newSearch
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      );

  // This function is called when user clicks the delete button
  const handleDeleteClick = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      // Delete the person from the server
      phoneBookService.deletePerson(personToDelete.id).then(() => {
        setAlertMessage({
          message: `Successfully deleted ${personToDelete.name}.`,
          className: "deleted",
        });
      });

      // Delete the person from our local state
      setPersons(
        persons.filter((person) => person.name !== personToDelete.name)
      );
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification alert={alertMessage} />
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
      <Persons persons={personsToShow} onClick={handleDeleteClick} />
    </div>
  );
};

export default App;

const Persons = ({ persons, onClick }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} : {person.number}&nbsp;
      <button onClick={() => onClick(person)}>Delete</button>
    </p>
  ));
};

export default Persons;

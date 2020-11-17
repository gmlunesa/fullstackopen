const PersonForm = (props) => {
  const {
    onSubmit,
    nameValue,
    nameOnChange,
    numberValue,
    numberOnChange,
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={nameValue} onChange={nameOnChange} />
      </div>
      <div>
        Number: <input value={numberValue} onChange={numberOnChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;

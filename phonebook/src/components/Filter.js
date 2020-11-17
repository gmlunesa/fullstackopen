const Filter = ({ value, onChange }) => {
  return (
    <div>
      Name: <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;

const Input = ({ label, type, id, placeholder, onChange, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="pl-4">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        placeholder={placeholder}
        className="px-5 py-3 bg-black-400 focus:outline-none focus:border-none"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

/* eslint-disable react/prop-types */
const SelectOption = ({id, label, value, options, onChange, error }) => (
   <div className="mt-5">
    <label className="block text-gray-700" htmlFor={id}>{label}</label>
      <select
        className="border border-gray-400 py-1 px-2 w-full"
        name={id} 
        id={id} 
        value={value}
        onChange={(e)=>onChange(e.target.value)}>
          {options.map((option) => (
          <option key={option.abbreviation} value={option.name}>
            {option.name}
          </option>
          ))}
      </select>  
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div> 
);
export default SelectOption;
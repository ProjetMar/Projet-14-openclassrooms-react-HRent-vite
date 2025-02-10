/* eslint-disable react/prop-types */
const InputText = ({ id, label, value, onChange, error }) => (
    <div className="mt-5">
      <label className="block text-gray-700" htmlFor={id}>{label}</label>
      <input 
        className="border border-gray-400 py-1 px-2 w-full"
        type="text" 
        id={id} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);
export default InputText;
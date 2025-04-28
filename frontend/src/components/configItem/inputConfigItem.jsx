export default function InputConfigItem({ value, onChange, editable }) {
  if (!editable) {
    return (
      <span className="bg-gray-700 shadow-2xl text-gray-100 p-1.5 rounded-md">
        {value}
        <span className="text-gray-500 text-sm ml-2">(não editável)</span>
      </span>
    );
  }
  return (
    <input
      className="bg-gray-700 shadow-2xl text-gray-100 p-1.5 rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  style = {}
}) {
  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-neutral-900 border-none rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
        style={{ borderRadius: 30, ...style }}
      />
    </div>
  );
}

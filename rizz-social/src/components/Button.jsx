export default function Button({ children, onClick, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition ${className}`}
      style={{ borderRadius: 30, ...style }}
    >
      {children}
    </button>
  );
}

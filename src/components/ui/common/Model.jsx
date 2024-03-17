export const Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <button
          className="bg-black text-white px-2 py-1 rounded-md"
          onClick={close}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

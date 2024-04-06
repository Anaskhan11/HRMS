export const Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-black bg-opacity-50 z-50">
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
    </div>
  );
};

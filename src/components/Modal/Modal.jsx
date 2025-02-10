/* eslint-disable react/prop-types */
import './modal.css';
function Modal({closeModal, title, children, footerButtons = []}){
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button className='absolute top-2 right-2 text-xl' onClick={()=>closeModal(false)}> &times; </button>
                <div className="text-lg font-semibold mb-4">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {footerButtons.length > 0 && (
                    <div className="flex justify-center space-x-2 mt-4">
                        {footerButtons.map((btn, index) => (
                            <button 
                                key={index} 
                                className={`px-4 py-2 rounded ${btn.className}`} 
                                onClick={btn.onClick}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Modal; 
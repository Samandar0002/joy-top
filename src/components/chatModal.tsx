import { ReactNode } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ChatModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const contentStyle: React.CSSProperties = {
    width: '300px',
    position: 'relative',
    bottom: '200px',
    right: '130px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    zIndex: 10000
  };

  return (
    <div style={{ display: isOpen ? '' : 'none' }}>
      <div style={contentStyle} className="shadow-lg">
        {children}
        <button className="z-9999999999999999 absolute left-[-30px] top-0" onClick={onClose}>
          <IoMdCloseCircle color="#ff7e47" size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatModal;

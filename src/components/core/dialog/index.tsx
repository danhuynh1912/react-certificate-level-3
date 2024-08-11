import {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  useEffect,
  useRef,
} from 'react';
import CloseIcon from '../../../assets/close.svg';

import './index.css';

interface DialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
  children: ReactNode;
}

const Dialog: FC<DialogProps> & {
  Trigger: FC<TriggerProps>;
  Content: FC<ContentProps>;
  Header: FC<HeaderProps>;
  Footer: FC<FooterProps>;
  Close: FC<CloseProps>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

// Define the Trigger component
interface TriggerProps {
  children: ReactNode;
}

const Trigger: FC<TriggerProps> = ({ children }) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Trigger must be used within a Dialog');
  }

  const { openDialog } = context;

  return (
    <div className="w-fit" onClick={openDialog}>
      {children}
    </div>
  );
};

// Define the Content component
interface ContentProps {
  children: ReactNode;
  modal: boolean;
}

const Content: FC<ContentProps> = ({ children, modal = true }) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Content must be used within a Dialog');
  }

  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, closeDialog } = context;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    // Add event listener to detect clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={`dialog-overlay${modal ? '' : '-dialog'}`}
      onClick={closeDialog}
    >
      <div
        className={`dialog-content${modal ? '-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Define the Header component
interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Header must be used within a Dialog');
  }

  const { closeDialog } = context;

  return (
    <div className="dialog-header">
      <div role="button" className="header-close-button" onClick={closeDialog}>
        <img src={CloseIcon} alt="close" />
      </div>
      {children}
    </div>
  );
};

// Define the Close component
interface CloseProps {
  children: ReactNode;
}
const Close: FC<CloseProps> = ({ children }) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Close must be used within a Dialog');
  }

  const { closeDialog } = context;

  return (
    <div role="button" onClick={closeDialog}>
      {children}
    </div>
  );
};

// Define the Footer component
interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return <div className="dialog-footer">{children}</div>;
};

Dialog.Trigger = Trigger;
Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Footer = Footer;
Dialog.Close = Close;

export default Dialog;

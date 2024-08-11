import Dialog from '../core/dialog';

const FooterButtons = () => {
  return (
    <div className="button-group">
      <Dialog.Close>
        <button>Yes</button>
      </Dialog.Close>
      <Dialog.Close>
        <button>Close (from another comp)</button>
      </Dialog.Close>
    </div>
  );
};

export default FooterButtons;

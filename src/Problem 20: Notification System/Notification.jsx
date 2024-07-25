const Notification = ({ id, message, onClose }) => {
  return (
    <div className="toast-message">
      <button onClick={() => onClose(id)}>&#10060;</button>
      <p>{message}</p>
    </div>
  );
};

export default Notification;

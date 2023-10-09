import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';

export const createNotification = (message, type, options = {}) => {
    const defaultOptions = {
      autoClose: 1000,
      // Outras opções padrão aqui
    };
  
    const notificationOptions = { ...defaultOptions, ...options };
  
    if (!toast.isActive('custom-notification')) {
      const notificationContent = (
        <CSSTransition
          key="custom-notification"
          in={true}
          timeout={300}
          classNames="slide"
        >
          <div>{message}</div>
        </CSSTransition>
      );
  
      if (type === 'success') {
        toast.success(notificationContent, {
          ...notificationOptions,
          toastId: 'custom-notification',
          position: toast.POSITION.TOP_CENTER,
          theme:"light"
        });
      } else if (type === 'error') {
        toast.error(notificationContent, {
          ...notificationOptions,
          toastId: 'custom-notification',
          position: toast.POSITION.TOP_CENTER,
          theme:"light"
        });
      } else if (type === 'loading') {
        toast.info(notificationContent, {
          ...notificationOptions,
          toastId: 'custom-notification',
          position: toast.POSITION.TOP_CENTER,
          theme:"light",
          autoClose:10
        });
      }
    }
  };
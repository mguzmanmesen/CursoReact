import '../../styles/alertmessagestyle.sass';
import { IAlert } from '../../models/IAlert';
import { useGlobalContext } from '../../contexts/GlobalContext';

//https://blog.logrocket.com/create-custom-react-alert-message/
//type = error/primary/secondary
export const SingleAlertMessage = ({ message, type }: IAlert) => {
    const { setShowMessage } = useGlobalContext();

    const handleClose = () => {
        let alert: IAlert = {
            type: "",
            message: "",
            show: false
        };
        setShowMessage(alert);
      };

    return (
        <div className={"alert " + type}>
            <span className={"closebtn"} onClick={handleClose}>
                &times;
            </span>
                {message}
        </div>
    );
    
};

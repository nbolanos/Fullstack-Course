const Notification = ({ message }) => {
    if(message === null) return null;
    
    if(message.includes('Added')) {
        return(
            <div className="addedNotification">{message}</div>
        )
    }
    else if(message.includes('removed'))
        return(
            <div className="error">{message}</div>
        )
}

export default Notification;
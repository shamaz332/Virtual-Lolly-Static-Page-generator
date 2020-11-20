import React from 'react'
import "../css/Result.css"
export interface ResultProps {
    lollyPath: string;
    recipientName: string;
    message: string;
    senderName: string;
}
const Share: React.FC<ResultProps> = ({ lollyPath, recipientName, message, senderName }) => {
    console.log(recipientName)
    return (
        <div>
            <h4>Share lolly with this link:</h4>
            <h3>{`https://shamaz-vlolly.netlify.app/lolly/${lollyPath}`}</h3>
            <div className="result__details">
                <p className="reciever">To{recipientName}</p>
                <p className="message">MSG{message}</p>
                <p className="sender">From{senderName}</p>
            </div>
        </div>
    )
}

export default Share
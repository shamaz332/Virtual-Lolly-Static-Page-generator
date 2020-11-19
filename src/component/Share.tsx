import React from 'react'
import "../css/Result.css"
export interface ResultProps {
    link: string;
    reciever: string;
    message: string;
    sender: string;
}
const Share: React.FC<ResultProps> = ({ link, reciever, message, sender }) => {
    return (
        <div className="result">
            <h4>Share lolly with this link:</h4>
            <h3>{`https://hv-virtual-lolly.netlify.app/lolly/${link}`}</h3>
            <div className="result__details">
                <p className="reciever">{reciever}</p>
                <p className="message">{message}</p>
                <p className="sender">____{sender}</p>
            </div>
        </div>
    )
}

export default Share
import { FunctionComponent, useState } from 'react';

type InfoIconComponent = {
    label: string;
    onClick?: () => void;
}
const InfoIcon: FunctionComponent<InfoIconComponent> = (props) => {

    const { children, label, onClick } = props

    const [show, setShow] = useState(false);

    const onComponentOver = () => setShow(true);
    const onComponentLeaved = () => setShow(false);

    return (
        <div className="relative" onMouseOver={onComponentOver} onMouseLeave={onComponentLeaved} onClick={onClick}>
            {children}
            <small className={`absolute top-7 font-medium opacity-0 ${show ? 'opacity-100' : ''} transition-all duration-150 -right-2 text-red-600 tracking-wide font-poppins`}>{label}</small>
        </div>
    )
}

export default InfoIcon
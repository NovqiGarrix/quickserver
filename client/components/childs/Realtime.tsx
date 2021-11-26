import moment from 'moment';
import { FunctionComponent, ReactChild, useEffect, useState } from 'react';

type RealtimeProps = {
    time: string;
    className?: string;
}
const Realtime: FunctionComponent<RealtimeProps> = (props) => {

    const { time, className } = props

    const [now, setNow] = useState<number>()

    useEffect(() => {
        setInterval(() => setNow(Date.now()), 5000);
    }, []);

    return (
        <span
            className={className}
        >
            {moment(new Date(time)).fromNow()}
        </span>
    )
}

export default Realtime
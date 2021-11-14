import moment from 'moment';
import { FunctionComponent, useEffect, useState } from 'react';

type RealtimeProps = {
    Component: any;
    time: string;
    className: string;
}
const Realtime: FunctionComponent<RealtimeProps> = (props) => {

    const { Component, time, className } = props

    const [now, setNow] = useState<number>()

    useEffect(() => {
        setInterval(() => setNow(Date.now()), 5000);
    }, []);

    return (
        <Component
            className={className}
        >
            {moment(new Date(time)).fromNow()}
        </Component>
    )
}

export default Realtime
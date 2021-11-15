import { FunctionComponent, Fragment, useState } from 'react';

import { App } from '../../store/reducers/app.reducer';

import { Realtime } from '.';

type GridViewProps = {
    datas: Array<App>,
}

const AppGridView: FunctionComponent<GridViewProps> = (props) => {

    const { datas } = props

    const [cardHover, setCardHover] = useState({ status: false, projectId: "" });

    const onCardHover = (projectId: string) => {
        setCardHover({ ...cardHover, status: true, projectId });
    }

    const onCardHoverLeave = () => {
        setCardHover({ ...cardHover, status: false, projectId: "" });
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {datas.map((data, key: number) => {

                return (
                    <div key={key} onMouseOver={() => onCardHover(data._id)} onMouseLeave={() => onCardHoverLeave()} className="bg-white rounded-lg p-6 flex items-start justify-between flex-col" style={{ height: "14rem" }}>
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="font-poppins font-bold text-md tracking-wide mr-4">{data.name}</h3>
                            </div>
                            <Realtime
                                Component="p"
                                time={data.createdAt}
                                className="text-gray-600 text-sm font-poppins"
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <data.Icon className="w-5 h-5" />
                            <small>Apps</small>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default AppGridView
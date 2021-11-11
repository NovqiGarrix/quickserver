import Image from 'next/image';
import { FunctionComponent } from 'react';

import { ButtonOutline } from '.';
import { AppType, ProjectType } from '../../interfaces';

type GridViewProps = { datas: any }
const GridView: FunctionComponent<GridViewProps> = ({ datas }) => {

    return (
        <div className="grid grid-cols-3 gap-6">
            {datas.map((data: AppType & ProjectType, key: number) => (
                <div key={key} className="bg-white rounded-lg p-6 flex items-start justify-between flex-col" style={{ height: "14rem" }}>
                    <div>
                        <h3 className="font-poppins font-bold text-md tracking-wide">{data.name}</h3>
                        <p className="text-gray-600 text-sm font-poppins">{data.createdAt}</p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        {data.type === "project" ? (
                            <Image
                                alt="User's cool profile"
                                width={35}
                                height={35}
                                objectFit="cover"
                                loading="lazy"
                                src="/cool-profile.jpg"
                                className="rounded-full"
                            />
                        ) : (
                            <data.Icon className="w-5 h-5" />
                        )}

                        {data.type === "project" ? (
                            <ButtonOutline
                                onClick={() => console.log('Cool!')}
                                type="button"
                                color={{ normal: "green-400", hover: "green-400" }}
                                active={data.active}
                            >
                                Select Project
                            </ButtonOutline>
                        ) : (
                            <small>Apps</small>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )

}

export default GridView
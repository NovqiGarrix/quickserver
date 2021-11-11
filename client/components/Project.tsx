import { useState, Fragment, FunctionComponent, ChangeEvent, FormEvent } from 'react';

import { SearchIcon, ViewListIcon, ViewGridIcon } from '@heroicons/react/outline'
import { Input, Button, GridView, ListView } from './childs';
import { ProjectType } from '../interfaces';

type ProjectProps = {
    type: "grid" | "list";
    toGrid: () => void;
    toList: () => void;
}
const Project: FunctionComponent<ProjectProps> = ({ type, toGrid, toList }) => {

    const [searchQuery, setSearchQuery] = useState("");

    const submitSearch = (ev: any) => {
        ev.preventDefault();
    }

    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(target.value);
    }

    const projects: Array<ProjectType> = [
        { active: false, type: "project", name: "Hello World", createdAt: "23 minutes ago by Novrii" },
        { active: false, type: "project", name: "QuickServer", createdAt: "3 hours ago by Novrii" },
        { active: false, type: "project", name: "nv-movie", createdAt: "21 hours ago by Novrii" },
        { active: false, type: "project", name: "Scrapper Tool", createdAt: "3 days ago by Novrii" },
        { active: false, type: "project", name: "NvClass", createdAt: "1 week ago by Novrii" }
    ]

    return (
        <div className="bg-blue-50 p-10 w-full max-h-screen h-screen overflow-y-auto">

            <div className="flex items-center justify-between mb-8">
                <form className="w-3/5" onSubmit={submitSearch}>
                    <Input
                        onChange={onSearchChange}
                        value={searchQuery}
                        Icon={SearchIcon}
                        label="Search projects..."
                        name="searchQuery"
                        type="text"
                        onSubmit={(ev) => ev.preventDefault()}
                    />
                </form>


                <div className="flex items-center mb-3">
                    <ViewListIcon className="w-5 h-5 hover:text-red-400 duration-150 mr-3 cursor-pointer" onClick={toList} />

                    <div className="bg-white p-1 rounded-md group mr-6" onClick={toGrid}>
                        <ViewGridIcon className="w-5 h-5 group-hover:text-red-500 duration-150 cursor-pointer" />
                    </div>
                    <Button type="button" color={{ normal: "bg-green-400", hover: "bg-green-500" }} onClick={() => console.log("Hello Button")}>New Project</Button>
                </div>

            </div>

            {type === "grid" ? <GridView datas={projects} /> : <ListView data={projects} />}
        </div>
    )

}

export default Project
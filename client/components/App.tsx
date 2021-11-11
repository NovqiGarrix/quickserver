import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';

import { SearchIcon, ViewListIcon, ViewGridIcon, CodeIcon } from '@heroicons/react/outline'
import { Input, Button, GridView, ListView } from './childs';

type AppProps = {
    type: string;
    toGrid: () => void
    toList: () => void
}
const App = ({ type, toGrid, toList }: AppProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const submitSearch = (ev: any) => {
        ev.preventDefault();
    }

    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(target.value);
    }

    const apps = [
        { name: "Hello World", createdAt: "23 minutes ago by Novrii", Icon: CodeIcon, type: "app" },
        { name: "QuickServer", createdAt: "3 hours ago by Novrii", Icon: CodeIcon, type: "app" },
        { name: "nv-movie", createdAt: "21 hours ago by Novrii", Icon: CodeIcon, type: "app" },
        { name: "Scrapper Tool", createdAt: "3 days ago by Novrii", Icon: CodeIcon, type: "app" },
        { name: "NvClass", createdAt: "1 week ago by Novrii", Icon: CodeIcon, type: "app" }
    ]

    return (
        <div className="bg-blue-50 p-10 w-full max-h-screen h-screen overflow-y-auto">

            <div className="flex items-center justify-between mb-8">
                <form className="w-3/5" onSubmit={submitSearch}>
                    <Input
                        onChange={onSearchChange}
                        value={searchQuery}
                        Icon={SearchIcon}
                        label="Search apps..."
                        name="searchQuery"
                        type="text"
                        onSubmit={submitSearch}
                    />
                </form>


                <div className="flex items-center mb-3">
                    <ViewListIcon className="w-5 h-5 hover:text-red-400 duration-150 mr-3 cursor-pointer" onClick={toList} />

                    <div className="bg-white p-1 rounded-md group mr-6" onClick={toGrid}>
                        <ViewGridIcon className="w-5 h-5 group-hover:text-red-500 duration-150 cursor-pointer" />
                    </div>
                    <Button type="button" color={{ normal: "bg-green-400", hover: "bg-green-500" }} onClick={() => console.log("Hello Button")}>New App</Button>
                </div>

            </div>

            {type === "grid" ? <GridView datas={apps} /> : <ListView data={apps} />}
        </div>
    )

}

export default App
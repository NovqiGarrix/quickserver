import { ChangeEvent, FormEvent, Fragment, FunctionComponent, HTMLInputTypeAttribute } from 'react'


type InputProps = {
    Icon: any;
    type: HTMLInputTypeAttribute;
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    name: string;
    value: string;
    onSubmit?: (ev: FormEvent<HTMLInputElement>) => void
}
const Input: FunctionComponent<InputProps> = ({ Icon, type, onChange, label, name, value, onSubmit }) => {

    return (
        <Fragment>
            <div className="mb-4 w-full flex items-center bg-white rounded-lg shadow-sm focus-within:shadow-md pl-5 transition-all duration-150">
                <Icon className="w-5 h-5 text-gray-400 mr-3" />
                <input
                    type={type}
                    onChange={onChange}
                    placeholder={label}
                    name={name}
                    value={value}
                    onSubmit={onSubmit}
                    className="flex-grow text-sm text-gray-500 outline-none focus:border-0 py-3 pl-2 rounded-r-lg"
                />
            </div>
        </Fragment>
    )

}

export default Input
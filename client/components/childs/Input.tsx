import { ChangeEvent, FormEvent, Fragment, FunctionComponent, HTMLInputTypeAttribute } from 'react'


type InputProps = {
    Icon: any;
    type: HTMLInputTypeAttribute;
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    name: string;
    value: string;
    onSubmit?: (ev: FormEvent<HTMLInputElement>) => void
    autoComplete?: boolean;
}
const Input: FunctionComponent<InputProps> = (props) => {

    const { Icon, type, onChange, label, name, value, onSubmit, autoComplete = false } = props

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
                    autoComplete={`${autoComplete}`}
                    className="flex-grow text-sm text-gray-500 outline-none focus:border-0 py-3 pl-2 rounded-r-lg font-poppins"
                />
            </div>
        </Fragment>
    )

}

export default Input
import { Fragment, FunctionComponent } from 'react'

type ButtonProps = {
    onClick?: () => void;
    full?: boolean;
    type?: "submit" | "button" | "reset"
    color?: { normal: string; hover: string };
    className?: string
}
const Button: FunctionComponent<ButtonProps> = (props) => {

    const { type = "submit", onClick, children, full, color = { normal: "bg-blue-400", hover: "bg-blue-500" }, className } = props

    return (
        <Fragment>
            {type === 'submit' ? (
                <button
                    className={`${full ? 'w-full' : ''} ${className} font-poppins font-normal text-sm tracking-wider px-5 py-3 outline-none rounded-lg text-white ${color.normal} hover:${color.hover} hover:shadow transition-all duration-150 select-none`}
                    type={type}
                >
                    {children}
                </button>
            ) : (
                <button
                    className={`${full ? 'w-full' : ''} ${className} font-poppins font-normal text-sm tracking-wider px-5 py-3 outline-none rounded-lg text-white ${color.normal} hover:${color.hover} hover:shadow transition-all duration-150 select-none`}
                    type={type}
                    onClick={onClick}
                >
                    {children}
                </button>
            )}
        </Fragment>
    )

}

export default Button
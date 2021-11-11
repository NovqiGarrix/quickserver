import { Fragment, FunctionComponent } from 'react'


type ButtonOutlineProps = {
    onClick: () => void;
    type?: "submit" | "button" | "reset"
    full?: boolean;
    color: { normal: string; hover: string };
    className?: string
    active?: boolean
}
const ButtonOutline: FunctionComponent<ButtonOutlineProps> = (props) => {

    const { type = "submit", onClick, children, full, color = { normal: "blue-400", hover: "blue-500" }, className, active = false } = props

    return (
        <Fragment>
            {type === 'submit' ? (
                <button
                    className={`${full ? 'w-full' : ''} ${className} font-poppins font-normal text-sm tracking-wider px-5 py-2 outline-none rounded-lg border hover:bg-${color.hover} ${active ? `bg-${color.hover} text-white` : `border-${color.normal} text-${color.normal}`} hover:text-white hover:shadow transition-all duration-150 select-none`}
                    type={type}
                >
                    {children}
                </button>
            ) : (
                <button
                    className={`${full ? 'w-full' : ''} ${className} font-poppins font-normal text-sm tracking-wider px-5 py-2 outline-none rounded-lg border hover:bg-${color.hover} ${active ? `bg-${color.hover} text-white` : `border-${color.normal} text-${color.normal}`} hover:text-white hover:shadow transition-all duration-150 select-none`}
                    type={type}
                    onClick={onClick}
                >
                    {children}
                </button>
            )}
        </Fragment>
    )

}

export default ButtonOutline
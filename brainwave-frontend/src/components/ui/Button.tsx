import type { ReactElement } from "react"
import "../../index.css"

type variants = "primary" | "secondary"
type sizes = "sm" | "md" | "lg"

interface ButtonProps {
    variant: variants,
    size: sizes,
    text: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick: () => void
}


const defaultStyles = "rounded-md p-4"

type varStruc = Record<variants, string>

const variantStyles : varStruc = {
    "primary" : "bg-brand-600 text-white",
    "secondary": "bg-brand-300 text-purple-600"
}

type sizeStruc = Record<sizes, string>

const sizeStyles : sizeStruc ={
    "sm" : "py-1 px-2",
    "md" : "py-2 px-4",
    "lg" : "py-2 px-6"
}







export const Button = (props : ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} cursor-pointer`} onClick={props.onClick}>
        <div className="flex items-center">
            {props.startIcon? <div className="pr-2">{props.startIcon}</div> : null}
            {props.text}
            {props.endIcon}
        </div>
    </button>
}

// <Button variant="primary" size="lg" text={"hello"} startIcon={"+"} onClick={()=>{}} />
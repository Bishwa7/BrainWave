
type iconSizes = "sm" | "md" | "lg"


type iconSizeStruc = Record<iconSizes, string>

export const iconSizeStyles : iconSizeStruc ={
    "sm" : "size-2",
    "md" : "size-4",
    "lg" : "size-6"
}

export interface iconProps{
    size: iconSizes
}

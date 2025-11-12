
type iconSizes = "sm" | "md" | "lg" | "xl"


type iconSizeStruc = Record<iconSizes, string>

export const iconSizeStyles : iconSizeStruc ={
    "sm" : "size-2",
    "md" : "size-4",
    "lg" : "size-6",
    "xl" : "size-8"
}

export interface iconProps{
    size: iconSizes
}

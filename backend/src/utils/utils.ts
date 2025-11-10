
export const randomGenerator = (len: number) => {

    let options = "randomStirng10Bishwa7RoanldoGeneratorOptions75e987w7e87sdcvh2VUIK77y87"
    let length = options.length

    let ans = ""

    for(let i=0; i<len; i++)
    {
        ans += options[Math.floor(Math.random() * length)]
    }

    return ans
}
interface InputCompProps {
    onChange: ()=> void;
    placeholder?: string;
    ref?: any
}


export function InputComp({onChange, placeholder, ref}: InputCompProps ){

    return <div>
        <input type="text" placeholder={placeholder} className="px-4 py-2 border m-2 rounded-md" onChange={onChange} ref={ref}></input>
    </div>
}
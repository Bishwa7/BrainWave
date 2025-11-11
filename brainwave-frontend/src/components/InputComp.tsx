interface InputCompProps {
    onChange: ()=> void;
    placeholder?: string;
}


export function InputComp({onChange, placeholder}: InputCompProps ){

    return <div>
        <input type="text" placeholder={placeholder} className="px-4 py-2 border m-2 rounded-md" onChange={onChange}></input>
    </div>
}
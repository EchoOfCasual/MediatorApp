import { FunctionComponent, useState, useEffect } from "react"
import localCSS from "./inputListEntry.module.css"

interface Props{
    indexOfEntry: Number
}


export const InputListEntry: FunctionComponent<Props> = (props:Props) =>{

    const [reduxPlaceholder, setReduxPlaceholder] = useState(["D11111111111111111111", "50", "10"]); //use Redux here
    const [allInputsInEntry, setAllInputsInEntry] = useState<any>(<></>);
    
    useEffect(()=>{
        let inputsMap = reduxPlaceholder.map((value, index)=>{
        
            let interchangableClass;
            if(index%2 == 0){
                interchangableClass = localCSS["even-input-in-input-list-entry"];
            }
            else{
                interchangableClass = localCSS["odd-input-in-input-list-entry"];
            }
    
            return (<div className={`${localCSS["input-in-input-list-entry"]} ${interchangableClass}` }>
                {value}
            </div>);
    
        });
       
        setAllInputsInEntry(inputsMap);

    }, []); // add referesh when redux state changes
    

    return(
        <div className={localCSS["input-tile-in-input-list-wrapper"]}>
            <div className={localCSS["input-tile-in-input-list"]}>
                {allInputsInEntry}
            </div>
            <button className={localCSS["input-tile-delete-button"]}>
                x
            </button>
        </div>
    );

}


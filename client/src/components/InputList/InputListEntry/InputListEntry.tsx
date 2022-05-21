import { FunctionComponent, useState, useEffect } from "react"
import localCSS from "./inputListEntry.module.css"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addList, deleteEntryInList, selectInputList } from '../inputListSlice';

interface Props{
    argList: string[],
    indexOfEntry: number,
    listId: string
}


export const InputListEntry: FunctionComponent<Props> = (props:Props) =>{

    //const [reduxPlaceholder, setReduxPlaceholder] = useState(["D11111111111111111111", "50", "10"]); //use Redux here
    const [allInputsInEntry, setAllInputsInEntry] = useState<any>(<></>);
    
    //const listFromRedux = useAppSelector(selectInputList);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        let inputsMap = props.argList.map((value, index)=>{
        
            let interchangableClass;
            if(index%2 == 0){
                interchangableClass = localCSS["even-input-in-input-list-entry"];
            }
            else{
                interchangableClass = localCSS["odd-input-in-input-list-entry"];
            }
    
            return (<div key={index} className={`${localCSS["input-in-input-list-entry"]} ${interchangableClass}` }>
                {value}
            </div>);
    
        });
       
        setAllInputsInEntry(inputsMap);

    }, [props]); // add referesh when redux state changes
    
    

    return(
        <div className={localCSS["input-tile-in-input-list-wrapper"]}>
            <div className={localCSS["input-tile-in-input-list"]}>
                {allInputsInEntry}
            </div>
            <button className={localCSS["input-tile-delete-button"]} onClick={(e)=>{
                console.log("Yeep. Im in X button.")
                console.log(props.indexOfEntry)
                dispatch(deleteEntryInList( {listId: props.listId, index: props.indexOfEntry} )) ;
            }}>
                x
            </button>
        </div>
    );

}


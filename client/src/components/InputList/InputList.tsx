import React, {FunctionComponent, useEffect, useState} from 'react'
import localCSS from "./inputList.module.css";
import {InputListEntry} from "./InputListEntry/InputListEntry"

interface Props{
    argumentList: string[],
    title: string
}

export const InputList: FunctionComponent<Props> = (props: Props) =>{

    const [entryListRDP, setEntryListRDP] = useState([["D1","50", "10"],["D1","40", "20"],["D1","30", "30"]]); //Ma być w reduxsie
    const [entryList, setEntryList] = useState<any>(<></>); //Ma być w reduxsie

    useEffect(()=>{
        let inputListEntries = entryListRDP.map((value, index)=>{

            return(
                <InputListEntry indexOfEntry={index}/>
            );
        })
        setEntryList(inputListEntries);

    }, [])

    return(
    <div>
        <h2 className={localCSS["input-list-title-header"]}>{props.title}</h2>
        <div className={localCSS["input-list-entries-and-adder-wrapper"]}>
            <div className={localCSS["input-list-entries-wrapper"]}>
                {entryList}
            </div>

            <div className={localCSS["input-list-adder"]}>
                
            </div>
        </div>

    </div>);
}
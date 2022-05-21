import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import localCSS from "./inputList.module.css";
import {InputListEntry} from "./InputListEntry/InputListEntry"
import { addEntryInList, addList, selectInputList } from './inputListSlice';


//LEGIT ONE

interface Props{
    argumentList: string[],
    title: string,
    listId: string
}

export const InputList: FunctionComponent<Props> = (props: Props) =>{

    //const [entryListRDP, setEntryListRDP] = useState([["D1","50", "10"],["D1","40", "20"],["D1","30", "30"]]); //Ma być w reduxsie
    const [entryList, setEntryList] = useState<any>(<></>);
    const [userInputList, setUserInputList] = useState<string[]>(Array(props.argumentList.length).fill(""));

    // const didMountRef = useRef(false);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(addList({list:[], listId: props.listId}));

    }, [])

    const listFromRedux = useAppSelector(selectInputList);

    useEffect(()=>{
        
        if (listFromRedux.lists.hasOwnProperty(props.listId)) { 

            let inputListEntries = listFromRedux.lists[props.listId].map((value: string[], index: number)=>{
                return(
                    <InputListEntry argList={value} indexOfEntry={index} listId={props.listId}/>
                );
            })
            setEntryList(inputListEntries);
    

        }
        

    }, [listFromRedux])

    return(
    <div>
        <h2 className={localCSS["input-list-title-header"]}>{props.title}</h2>
        <div className={localCSS["input-list-entries-and-adder-wrapper"]}>
            <div className={localCSS["input-list-entries-wrapper"]}>
                {entryList}
            </div>

            <div className={localCSS["input-list-adder"]}>
                <div className={localCSS["input-list-box"]}>
                    {
                        props.argumentList.map((val: string, index: number)=>{
                            return(
                            <input key={val} 
                            
                            
                            onChange={(e)=>{ 

                                let newUserInputList:string[] = userInputList.map((value, index)=>value);
                                newUserInputList[index] = e.target.value;
                                setUserInputList(newUserInputList);
    
                                }}
                            type={"text"}
                            
                            value = {userInputList[index]}
                            
                            placeholder={val} className={localCSS["specific-input-in-list-box"]}>
                                
                            </input>
                            
                            );
                        })
                    }
                </div>
                <button className={localCSS["input-list-adder-button"]} onClick={(e)=>{
                    dispatch(addEntryInList({ argumentList:userInputList,listId:props.listId}));
                }}>Ok</button>
            </div>
        </div>

    </div>);
}
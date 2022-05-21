import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import localCSS from "./transportTableInputPage.module.css";
import {InputList} from "../InputList/InputList";
import {selectInputList } from '../InputList/inputListSlice';
import {useNavigate} from "react-router-dom";


export interface tableTile{

  
    mainText?: string,
    topLeft?: string,
    top?: string,
    topRight?: string,
    right?: string,
    bottomRight?: string,
    bottom?: string,
    bottomLeft?: string,
    left?: string
  

  }

interface Props{
    columnListId: string,
    rowListId: string

}

export const TransportTableInputPage: FunctionComponent<Props> = (props: Props)=>{

    const dispatch = useAppDispatch();

    const listFromRedux = useAppSelector(selectInputList);

    const [userInputTable, setUserInputTable] = useState<string[][]>(Array(listFromRedux.lists[props.rowListId].length).fill(Array(listFromRedux.lists[props.columnListId].length).fill("")));
    const [tableDisplayed, setTableDisplayed] = useState<any>(<></>); // Dobrze by było znaleźć typ tsx a
    
    useEffect(()=>{
        if (listFromRedux.lists.hasOwnProperty(props.columnListId) && listFromRedux.lists.hasOwnProperty(props.rowListId)) 
        { 

            let rowsDisplayed = [];

            for(let rowId: number = 0; rowId < listFromRedux.lists[props.rowListId].length+1 ; rowId = rowId +1){

                let oneRow = [];
                for(let columnId: number = 0; columnId < listFromRedux.lists[props.columnListId].length+1 ; columnId = columnId +1){
                    if(columnId===0 && rowId ===0){
                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}></div>);
                    }
                    else if(columnId == 0){
                        
                        let temp = listFromRedux.lists[props.rowListId][rowId-1];
                        console.log(temp);
                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}>{temp[0] + "(podaż: " + temp[1] + "| cena: " + temp[2]+")"}</div>);
                    }
                    else if(rowId == 0){
                        
                        let temp = listFromRedux.lists[props.columnListId][columnId-1];
                        console.log(temp);
                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}>{temp[0] + "(popyt: " + temp[1] + "| cena: " + temp[2]+")"}</div>);
                    }
                    else{
                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}>
                            <input 
                        
                        onChange={(e)=>{
                            let newUserInputTable:string[][] = userInputTable.map((value, index)=>{return value.map((value1, index1)=>value1)});
                            newUserInputTable[rowId-1][columnId-1] = e.target.value;
                            console.log(e);
                            console.log(newUserInputTable);
                            console.log(userInputTable);
                            console.log(userInputTable==newUserInputTable);
                            console.log(userInputTable===newUserInputTable);
                            
                            setUserInputTable(newUserInputTable);

                        }}

                        value={userInputTable[rowId-1][columnId-1]}

                        placeholder ="Koszty transportu"
                        className={localCSS["input-in-tile-in-transport-table"]}></input></div>);

                    }
                
                }

                rowsDisplayed.push(<div className={localCSS["row-box-in-table"]}>{oneRow}</div>)

            }

            setTableDisplayed(<div className={localCSS["table-box"]}>{rowsDisplayed}</div>);
        }


        


    }, [props])




    return(<div className={localCSS["table-input-page-wrapper"]}>
            {tableDisplayed}
            <div className={localCSS["ok-button-wrapper"]}>
                <button className={localCSS["ok-button"]}>OK</button>
            </div>
        </div>)
}

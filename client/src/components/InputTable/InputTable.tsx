import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import localCSS from "./inputTable.module.css";
import {InputList} from "../InputList/InputList";
import {selectInputList } from '../InputList/inputListSlice';
import {useNavigate} from "react-router-dom";
import {selectInputTable, setTable} from "./inputTableSlice"


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
    columnList: string[],
    rowList: string[]

}

export const InputTable: FunctionComponent<Props> = (props: Props)=>{

    const dispatch = useAppDispatch();

    const tableFromRedux = useAppSelector(selectInputTable);

    const [userInputTable, setUserInputTable] = useState<string[][]>(Array(props.rowList.length).fill(Array(props.columnList.length).fill("")));
    const [tableDisplayed, setTableDisplayed] = useState<any>(<></>); // Dobrze by było znaleźć typ tsx a
    
    useEffect(()=>{
        if (props.columnList.length > 0 && props.rowList.length >0) 
        {   

            let rowsDisplayed = [];

            for(let rowId: number = 0; rowId < props.rowList.length+1 ; rowId = rowId +1){

                let oneRow = [];
                for(let columnId: number = 0; columnId < props.columnList.length+1 ; columnId = columnId +1){
                    if(columnId===0 && rowId ===0){
                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}></div>);
                    }
                    else if(columnId == 0){
                        
                        let temp = props.rowList[rowId-1];

                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}>{temp}</div>);
                    }
                    else if(rowId == 0){
                        
                        let temp = props.columnList[columnId-1];

                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}>{temp}</div>);
                    }
                    else{
                        oneRow.push(<div className={localCSS["tile-in-transport-table"]}>
                            <input 
                        
                        onChange={(e)=>{
                            let newUserInputTable:string[][];
                            if(tableFromRedux.length===props.rowList.length)
                                newUserInputTable = tableFromRedux.map((value, index)=>{return value.map((value1, index1)=>value1)});
                            else
                                newUserInputTable = Array(props.rowList.length).fill(Array(props.columnList.length).fill(""))
                            
                            newUserInputTable[rowId-1][columnId-1] = e.target.value;

                            dispatch(setTable(newUserInputTable));
                            //setUserInputTable(newUserInputTable);
                        }}


                        placeholder ="Koszty transportu"
                        className={localCSS["input-in-tile-in-transport-table"]}></input></div>);

                    }
                
                }

                rowsDisplayed.push(<div className={localCSS["row-box-in-table"]}>{oneRow}</div>)

            }

            setTableDisplayed(<div className={localCSS["table-box"]}>{rowsDisplayed}</div>);
        }


        


    }, [props])


    return(<div className={localCSS["table-input-wrapper"]}>
            {tableDisplayed}
           
        </div>)
}

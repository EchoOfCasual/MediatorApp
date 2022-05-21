import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import localCSS from "./table.module.css";
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
    stringsForTable: string[][];
}

export const Table: FunctionComponent<Props> = (props: Props)=>{


    const [tableDisplayed, setTableDisplayed] = useState<any>(<></>); // Dobrze by było znaleźć typ tsx a
    
    useEffect(()=>{
        if (props.stringsForTable.length <= 0) 
            return;

        if( props.stringsForTable[0].length <= 0)
            return;

        let rowsDisplayed = [];

        for(let rowId: number = 0; rowId < props.stringsForTable.length ; rowId = rowId +1){

            let oneRow = [];
            for(let columnId: number = 0; columnId < props.stringsForTable[0].length ; columnId = columnId +1){
                
                oneRow.push(<div className={localCSS["tile-in-table"]}>{props.stringsForTable[rowId][columnId]}</div>);

            
            }

            rowsDisplayed.push(<div className={localCSS["row-box-in-table"]}>{oneRow}</div>)

        }

        setTableDisplayed(<div className={localCSS["table-box"]}>{rowsDisplayed}</div>);
    


        


    }, [props])


    return(<div className={localCSS["table-input-wrapper"]}>
            {tableDisplayed}
           
        </div>)
}

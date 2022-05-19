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
    columnList: tableTile[],
    rowList: tableTile[]

}

export const TransportTableInputPage: FunctionComponent<Props> = (props: Props)=>{

    const dispatch = useAppDispatch();


    const [tableDisplayed, setTableDisplayed] = useState<any>(<></>); // Dobrze by było znaleźć typ tsx a

    useEffect(()=>{

        /*let inputListEntries = (<></>);

        for(let rowId: number = 0; rowId < listOfInputs.lists[props.rowListId] )

        setTableDisplayed(inputListEntries);*/



        


    }, [])





    return(<>
        </>)
}

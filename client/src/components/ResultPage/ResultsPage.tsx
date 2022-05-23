import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import localCSS from "./resultsPage.module.css";
import {InputList} from "../InputList/InputList";
import {selectInputList } from '../InputList/inputListSlice';
import {useNavigate} from "react-router-dom";
import { selectTransportTable } from '../TransportTableInputPage/transportTableInputPageSlice';
import { Table } from '../Table/Table';
import { createModuleResolutionCache } from 'typescript';
import { count } from 'console';


interface Props{
    columnListId: string,
    rowListId: string

}

export const ResultsPage: FunctionComponent<Props> = (props: Props)=>{

    const dispatch = useAppDispatch();

    const [dataForTable, setDataForTable] = useState<any>({});
    const listFromRedux = useAppSelector(selectInputList);
    const outputObjectFromRedux = useAppSelector(selectTransportTable);
    const outputTableFromRedux = outputObjectFromRedux.optimalSellPathsTable ;

    useEffect(()=>{

        if(outputTableFromRedux.length <= 0)
            return;
        if(outputTableFromRedux[0].length <= 0)
            return;

        let rowsDisplayedProfit: string[][] = [];
        let rowsDisplayed: string[][] = [];
        for(let rowId: number = 0; rowId < outputTableFromRedux.length + 1 ; rowId = rowId +1){

            let oneRowProfit: string[] = [];
            let oneRow: string[] = [];
            for(let columnId: number = 0; columnId < outputTableFromRedux[0].length +1 ; columnId = columnId +1){
                console.log("Inn!");
                console.log(rowId);
                console.log(columnId);
                
                if(columnId===0 && rowId ===0){
                    oneRow.push("");
                    oneRowProfit.push("");
                }
                else if(columnId == 0 && rowId <= listFromRedux.lists[props.rowListId].length){
                    
                    console.log("Im in")
                    let temp = listFromRedux.lists[props.rowListId][rowId-1];

                    oneRow.push(temp[0] + "(podaż: " + temp[1] + "| cena: " + temp[2]+")");
                    oneRowProfit.push(temp[0] + "(podaż: " + temp[1] + "| cena: " + temp[2]+")");
                }
                else if(columnId == 0){
                    oneRow.push("Dostawca Fikcyjny");
                    oneRowProfit.push("Dostawca Fikcyjny");
                    
                }
                else if(rowId == 0 && columnId <= listFromRedux.lists[props.columnListId].length ){
                    
                    let temp = listFromRedux.lists[props.columnListId][columnId-1];
                    console.log(temp);

                    oneRow.push(temp[0] + "(popyt: " + temp[1] + "| cena: " + temp[2]+")");
                    oneRowProfit.push(temp[0] + "(popyt: " + temp[1] + "| cena: " + temp[2]+")");
                }
                else if(rowId == 0){
                    oneRow.push("Odbiorca Fikcyjny");
                    oneRowProfit.push("Odbiorca Fikcyjny");

                }
                else{
                    console.log("XD");
                    if(rowId !== outputTableFromRedux.length && columnId !== outputTableFromRedux[0].length)
                        oneRowProfit.push(outputObjectFromRedux.profitTable[rowId-1][columnId-1]===null?"null":outputObjectFromRedux.profitTable[rowId-1][columnId-1].toString())
                    else
                        oneRowProfit.push("0");

                    oneRow.push(outputTableFromRedux[rowId-1][columnId-1]===null?"null":outputTableFromRedux[rowId-1][columnId-1].toString());
                }

            }
            rowsDisplayed.push(oneRow)
            rowsDisplayedProfit.push(oneRowProfit)


        }

    setDataForTable({rowsDisplayed: rowsDisplayed, rowsDisplayedProfit: rowsDisplayedProfit});
    },[])

    console.log("Tabele");
    console.log(dataForTable["rowsDisplayedProfit"]);
    console.log(dataForTable["rowsDisplayed"]);

    return(<div className={localCSS["table-output-wrapper"]}>
                <Table stringsForTable={dataForTable["rowsDisplayedProfit"]}/> 
                <Table stringsForTable={dataForTable["rowsDisplayed"]}/> 
                <div className={localCSS["addtional-info-wrapper"]}>
                    <div className={localCSS["profit-info"]}>
                        Zysk: {outputObjectFromRedux.profit}
                    </div>
                    <div className={localCSS["profit-info"]}>
                        Koszty: {outputObjectFromRedux.cost}
                    </div>
                    <div className={localCSS["profit-info"]}>
                        Przychód: {outputObjectFromRedux.income}
                    </div>
                </div>

        </div>)
}

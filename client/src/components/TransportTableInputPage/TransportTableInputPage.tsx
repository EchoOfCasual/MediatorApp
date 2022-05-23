import React, {FunctionComponent, useEffect, useState, useRef, MouseEventHandler} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import localCSS from "./transportTableInputPage.module.css";
import {InputTable} from "../InputTable/InputTable";
import {InputList} from "../InputList/InputList";
import {selectInputList } from '../InputList/inputListSlice';
import {useNavigate} from "react-router-dom";
import algorithm, { algorithmRequestInterface, recipientInterface, supplierInterface } from '../../actions/algorithm';
import { selectInputTable } from '../InputTable/inputTableSlice';
import { setOutputTable, transportTableState } from './transportTableInputPageSlice';


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


    const [errorMessage, setErrorMessage] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [infoLists, setInfoLists] = useState<string[][]>([[],[]]);
    const listFromRedux = useAppSelector(selectInputList);
    const tableFromRedux = useAppSelector(selectInputTable);
    
    useEffect(()=>{
        if (listFromRedux.lists.hasOwnProperty(props.columnListId) && listFromRedux.lists.hasOwnProperty(props.rowListId)) 
        {   
            let columnList = listFromRedux.lists[props.columnListId].map((element: string[])=>{
                return(element[0] + "(popyt: " + element[1] + "| cena: " + element[2]+")")
            });

            let rowList = listFromRedux.lists[props.rowListId].map((element: string[])=>{
                return(element[0] + "(podaż: " + element[1] + "| cena: " + element[2]+")")
            });

            setInfoLists([columnList, rowList]);

        }
            
    }, [props])


    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) =>{
        let stringInImproperPlaceFlag: boolean = false;
        let transportTable: number[][] = tableFromRedux.map((elem, index)=>{
            
            return elem.map((elem1, index1)=>{

                let out: number = parseFloat(elem1);
                if(out === NaN)
                    stringInImproperPlaceFlag = true;

                return out;
            });
        })

        let recipientTable: recipientInterface[] = listFromRedux.lists[props.columnListId].map((elem: string[])=>{
            let outPrice: number = parseFloat(elem[2]);
            let outQuantity: number = parseFloat(elem[1]);
            if(outPrice === NaN || outQuantity === NaN)
                    stringInImproperPlaceFlag = true;

            return ({"buyPrice": outPrice, "desiredQuantity": outQuantity})
        });

        let supplierTable: supplierInterface[] = listFromRedux.lists[props.rowListId].map((elem: string[])=>{
            let outPrice: number = parseFloat(elem[2]);
            let outQuantity: number = parseFloat(elem[1]);
            if(outPrice === NaN || outQuantity === NaN)
                    stringInImproperPlaceFlag = true;

            return ({"sellPrice": outPrice, "availableQuantity":outQuantity})
        });

        if(stringInImproperPlaceFlag){

            setErrorMessage("Input inproper - letter where only number should be (or input whatsoever) ~ Yoda")

            return;
        }
            

        let algInput: algorithmRequestInterface ={
            recipientTable: [],
            supplierTable: [],
            transportaionCostsTable: []
        };

        algInput.recipientTable = recipientTable;
        algInput.supplierTable = supplierTable;
        algInput.transportaionCostsTable = transportTable;

        



        algorithm.getAlgorithmOutput(algInput).then((response)=>{
            let outputTable: number[][] = response.data.optimalSellPathsTable;
            let outputProfit: number = response.data.profit;
            let costTable: number[][]= response.data.costsTable;
            let cost: number = response.data.cost;
            let income: number = response.data.income;
            let outputData: transportTableState = {
                optimalSellPathsTable: outputTable,
                profit: outputProfit,
                profitTable: costTable,
                cost: cost,
                income: income
            }

            dispatch(setOutputTable(outputData));
            navigate("/results");
            


        }).catch(()=>{
            console.log("sth unexpected happened")

        })
    }


    return(<div className={localCSS["table-input-page-wrapper"]}>
            <InputTable columnList={infoLists[0]} rowList={infoLists[1]}/>
            <div className={localCSS["ok-button-wrapper"]}>
                <button className={localCSS["ok-button"]} onClick={onClickHandler} >OK</button>
                <div className={localCSS["ok-button-error-message"]}>

                </div>
            </div>
        </div>)
}

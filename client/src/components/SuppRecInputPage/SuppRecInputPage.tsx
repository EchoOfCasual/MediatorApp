import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
import {useAppSelector } from '../../app/hooks';
import localCSS from "./suppRecInputPage.module.css";
import {InputList} from "../InputList/InputList";
import {selectInputList } from '../InputList/inputListSlice';
import {useNavigate} from "react-router-dom";


interface Props{
    supId: string,
    recId: string

}

export const SuppRecInputPage: FunctionComponent<Props> = (props: Props)=>{

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorDisplay, setErrorDisplay] = useState<string>("button-next-box-info");

    const listsInRedux = useAppSelector(selectInputList);

    const navigate = useNavigate();

    return(
    <div className={localCSS["input-list-page"]}>
        <div className={localCSS["input-list-box"]}>
            <InputList argumentList={["Nazwa", "Podaż", "Cena"]} title="Dostawcy" listId={props.supId}/>
            <InputList argumentList={["Nazwa", "Popyt", "Cena"]} title="Odbiorcy" listId={props.recId}/>
        </div>
        <div className={localCSS["button-next-box"]}>
            <button className={localCSS["button-next"]} onClick={(e)=>{
                if(listsInRedux.lists.hasOwnProperty("Suppliers") && listsInRedux.lists.hasOwnProperty("Recipients")){
                    if(listsInRedux.lists["Suppliers"].length>0 && listsInRedux.lists["Recipients"].length>0)
                    {
                        navigate("/transport_table_page");
                    }
                    else
                    {
                        setErrorDisplay("button-next-box-info");
                        setErrorMessage("Musi być przynajmniej jeden dostawca i jeden odbiorca");
                        setTimeout(()=>{setErrorDisplay("button-next-box-info-merge");},3000);
                        setTimeout(()=>{setErrorDisplay("button-next-box-info-hidden");},4000);

                    }
                }
            }}>
                Next
            </button>
            <div className={localCSS[errorDisplay]}>
                {errorMessage}
            </div>
        </div> 
    </div>)
}
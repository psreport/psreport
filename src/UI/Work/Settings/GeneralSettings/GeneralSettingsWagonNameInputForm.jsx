import React from "react";
import { Form, Input } from 'antd';
import { selectWagonFullName } from "../../../../state/features/wagonInfo/selectors";
import { setWagonFullNameActionCreator } from "../../../../state/features/wagonInfo/actionCreators";
import { useDispatch, useSelector } from "react-redux";

/* Пользователь указывает полное имя МСД для использования в телеграмме */

export const GeneralSettingsWagonNameInputForm = () => {
    // -------------------------------------------------------------- Хуки ---------------------------------------------------------------------------
    const dispatch = useDispatch();
    const wagonFullName = useSelector(selectWagonFullName);
    // -------------------------------------------------------------- / Хуки -------------------------------------------------------------------------

    // ------------------------------------ Declare функцию вызывающуюся при вводе текста в поле ввода имени вагона   ------------------------------------------------
    const onInputChange = (value) => {
        dispatch(setWagonFullNameActionCreator(value));                   // запишем введенное имя вагона в стейт
    }
    // ------------------------------------ / Declare функцию вызывающуюся при вводе текста в поле ввода имени вагона  ---------------------------------------------


    return (
        <>
            <div className="content__input-item">
                <Form layout="inline">
                    <Form.Item label="Ведите название вагона для использования в телеграмме">
                        <Input placeholder="Название вагона" value={wagonFullName} onChange={(e) => onInputChange(e.target.value)} />
                    </Form.Item>
                </Form>
            </div>

        </>
    );
}
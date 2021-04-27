import React from "react";
import { useDispatch, useSelector } from "react-redux";
import XLSX from "xlsx/dist/xlsx.full.min";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
    selectIsVideoBookDataLoaded
} from "../../../../state/features/videoBookData/selectors";
import { setVideoBookDataThunkCreator } from "../../../../state/features/videoBookData/thunkCreators";

// Это компонент который принимает от юзера файл "Видео" заполненый юзером. На основе этого файла строятся все отчетные таблицы по видео и телеграммы
export const FilledByUserBook = () => {
    // -------------------------------------------------------------- Хуки ---------------------------------------------------------------------------
    const dispatch = useDispatch();
    const isFilledByUserBookLoaded = useSelector(selectIsVideoBookDataLoaded);                                      // загружны ли данные по текущему проезду в стейт
    // -------------------------------------------------------------- / Хуки -------------------------------------------------------------------------



    // ------------ Пропсы которые будем передавать в Upload Ant Design, тут и метод при изменении аплоада, то есть загрузки файла ------------
    const props = {
        // name: 'file',
        // action: null,
        // headers: {
        //     authorization: 'authorization-text',
        // },
        onChange(evt) {
            let workBookData;                                    // возвращаем json
            const selectedFile = evt.fileList[0].originFileObj;           // выбранный в браузере файл, один, так как запрещен мульти выбор файлов

            if (selectedFile) {                                 // если файл был выбран. эта проверка чтобы если пользователь нажал кнопку выбрать файл а потом закрыл окно с выбором файла не выбрав его
                let reader = new FileReader();
                reader.readAsBinaryString(selectedFile);
                reader.onload = function (event) {

                    const data = event.target.result;
                    const workBook = XLSX.read(data, {
                        type: 'binary'
                    });

                    const videoDataObj = workBook.Sheets["Ввод"];
                    const videoDataObjJson = XLSX.utils.sheet_to_json(videoDataObj);


                    workBookData = {
                        videoData: videoDataObjJson
                    }

                    dispatch(setVideoBookDataThunkCreator(workBookData));
                };

                reader.onerror = function (event) {
                    workBookData = null
                    console.error("Файл не может быть прочитан. Код ошибки: " + event.target.error.code);
                };
            }
        },
    };
    // ------------ / Пропсы которые будем передавать в Upload Ant Design, тут и метод при изменении аплоада, то есть загрузки файла ----------



    return (
        <>
            <div className="content__input-item">
                {
                    isFilledByUserBookLoaded
                        ? <>
                            <h2>Данные по видео успешно загружены</h2>
                        </>
                        : <>
                            <h2>Данные по видео не загружены, сначала загрузите данные</h2>
                            <Upload {...props}>
                                <Button type="primary" icon={<UploadOutlined />}>Загрузить файл</Button>
                            </Upload>
                            {/* <input style={{ color: "green" }} type="file" onChange={(e) => onBookSelect(e)} /> */}
                            {/* <Button type="primary" icon={<UploadOutlined />} htmlType="file">Загрузить файл</Button> */}
                        </>
                }
            </div>
        </>
    );
}
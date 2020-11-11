/* eslint-disable no-underscore-dangle */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../redux/auth/types';
import { addImagesAsync } from '../../redux/images/action'
import { RootState } from '../../redux/store';


const UploadImage = () => {

    const user: User | undefined = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch();

    const uploadImage = async (file) => {
        dispatch(addImagesAsync(user?.id || '', file));
    };


    return (
        <div className="flex" style={{ justifyContent: 'space-around' }}>

            <Upload
                showUploadList={false}
                // tslint:disable-next-line: jsx-no-lambda
                customRequest={({ file }) => {
                    setTimeout(() => {
                        uploadImage(file);
                    }, 0);
                }}
                listType="text"
            >
                <Button block type="primary" size="large" style={{ marginTop: 10 }}>
                    <UploadOutlined style={{ marginRight: 5 }} />
                    Upload an image!

                </Button>
            </Upload>
        </div>
    );
};


export default UploadImage;
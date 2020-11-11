// tslint:disable: jsx-no-lambda
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useSelector } from 'react-redux';
import { User } from '../../redux/auth/types';
import { parseImage } from '../../redux/images/action';
// import { FormattedImageLink } from '../../redux/images/type';
import { RootState } from '../../redux/store';
import UploadImage from '../uploadImage';
import './styles.scss';
// import Upload from './upload';




const ImagesSection: React.FC = () => {


    const user: User | undefined = useSelector((state: RootState) => state.auth.user)

    const [parsedImages, setParsedImages] = React.useState<any[]>([]);
    const [rotationDeg, setRotationDeg] = React.useState(0);
    const imageGalleryRef: any = React.useRef();

    React.useEffect(() => {
        if (user) {
            const imgs: any[] = [];
            console.log('ueeee3', user)
            user.photos.map((filename: string) => imgs.push(parseImage(filename, user.id)));
            setParsedImages(imgs);
        }
    }, [user]);

    // const onDeleteImage = () => {
    //     if (imageGalleryRef) {
    //         const {currentIndex} = imageGalleryRef?.current?.state;
    //         console.log(currentIndex);
    //         // deleteImageAsync(user._id, user.photos[currentIndex]);
    //         imageGalleryRef.current.slideToIndex(0);
    //         message.success('yeaaah broo');
    //     }
    // };


    const handleRotate = (direction: number) => {
        // rotate to right
        if (direction === 1) {
            setRotationDeg(rotationDeg < 270 ? rotationDeg + 90 : 0);
        } else { // rotate to left
            setRotationDeg(rotationDeg > 0 ? rotationDeg - 90 : 270);
        }
    }

    return (
        <div className="flex images-container">
            {parsedImages.length ? (
                <div className="images-container">
                    <div
                        className="flex rotate-buttons-container"
                    >
                        <Button
                            onClick={() => handleRotate(0)}
                            size="large"
                            shape="circle"
                            type="primary"
                            icon={<UndoOutlined />}
                        />
                        <Button
                            onClick={() => handleRotate(1)}
                            size="large"
                            shape="circle"
                            type="primary"
                            icon={<RedoOutlined />}
                        />
                    </div>
                    <ImageGallery
                        ref={imageGalleryRef}
                        items={parsedImages}
                        showPlayButton={false}
                        showBullets
                        showFullscreenButton={parsedImages.length > 0}
                        additionalClass={`rotate-${rotationDeg}`}
                    />
                    <UploadImage />
                </div>
            ) : (
                    <Result
                        status="404"
                        title="Empty image folder"
                        extra={<UploadImage />}
                    />
                )}

        </div>
    );
};


export default ImagesSection;
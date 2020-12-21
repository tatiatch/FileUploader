import React, { useContext, useEffect } from 'react';
import { GalleryContext } from '../../context/GalleryContext';

import './PhotoGallery.css';

const PhotoGallery = () => {
    const { images, setImages } = useContext(GalleryContext);

    useEffect(() => {
        const files = JSON.parse(localStorage.getItem('files')) || [];
        setImages(files);
    }, [setImages]);

    const renderImage = (image, i) => (
        <div key={ i } className='PhotoGallery-Item'>
            <img src={ image.url } alt={ image.name } />
        </div>
    )


    const renderImageList = () => {
        if (!images.length) return null;

        return (
            <div className='PhotoGallery-Wrapper'>
                <h2>Uploaded Image List</h2>
                <div className='PhotoGallery-List'>
                    { images.map((image, i) => renderImage(image, i)) }
                </div>
            </div>
        )
    }

    return renderImageList();
}

export default PhotoGallery;

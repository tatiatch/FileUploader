import React, { useState, createContext } from 'react';

export const GalleryContext = createContext();

export const GalleryProvider = (props) => {
    const [images, setImages] = useState([]);

    return (
        <GalleryContext.Provider value={ {images, setImages} }>
            { props.children }
        </GalleryContext.Provider>
    )
}


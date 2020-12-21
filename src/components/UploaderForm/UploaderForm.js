import React, { useState, useRef, useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';

import { toBase64 } from '../../util/base64handler';

import './UploaderForm.css';

const UploaderForm = () => {
    const fileInputRef = useRef();

    const { setImages } = useContext(GalleryContext);

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/tiff'];

    const [file, setFile] = useState(null);
    const [error, setError] = useState(undefined);

    const onFileChange = (e) => {
        const { target: { files } } = e;

        return setFile(files[0]);
    }

    const fileAlreadyExists = () => {
        const existingFiles = JSON.parse(localStorage.getItem('files')) || [];

        return existingFiles.filter(item => item.name === file.name).length;
    }

    const isFileTypeValid = () => {
        return validTypes.filter(item => item === file.type);
    }

    const isFileUploaded = () => {
        return fileInputRef.current.value;
    }

    const validateForm = () => {
        if (!isFileUploaded()) {
            setError('Please upload a file before saving');
            return false;
        }

        if (fileAlreadyExists()) {
            setError('File with given name already exists');
            return false;
        }

        if (!isFileTypeValid()) {
            setError('Supported file types are .png, .jpeg, .jpg, .gif, .tiff');
            return false;
        }

        return true;
    }

    const saveFileInLocalStorage = async () => {
        let existingFiles = JSON.parse(localStorage.getItem('files')) || [];
        const fileBase64 = file !== '' ? await toBase64(file) : '';

        existingFiles = [ ...existingFiles, { name: file.name, url: fileBase64 } ];

        setImages(existingFiles);
        localStorage.setItem('files', JSON.stringify(existingFiles));
    }

    const saveFile = (e) => {
        e.preventDefault();

        if (!validateForm()) return null;

        saveFileInLocalStorage();
        setError(undefined);
        setFile(undefined);
        fileInputRef.current.value = null;
    }

    const renderForm = () => (
        <form
          onSubmit={ saveFile }
          className='Uploader-Form'
        >
            <input
              type='file'
              name='file'
              onChange={ onFileChange }
              ref={ fileInputRef }
              accept='.png, .jpeg, .jpg, .gif, .tiff'
            />
            <button
              type='submit'
              name='submit'
              className='Uploder-Submit'
              onSubmit={ saveFile }
            >
              Save File
            </button>
        </form>
    )

    const renderError = () => (
        <div className='Uploader-Error'>{ error }</div>
    )

    const renderContent = () => (
        <div className='Uploader-Wrapper'>
            { renderForm() }
            { error !== undefined && renderError() }
        </div>
    )

    return renderContent();
}

export default UploaderForm;

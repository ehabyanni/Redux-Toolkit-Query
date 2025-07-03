import React from 'react'
import { GoTrashcan } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';

function PhotosListItem({ photo }: any) {
    const [removePhoto, results] = useRemovePhotoMutation();
    const handleRemovePhoto = () => {
        removePhoto(photo);
    };

    return (
        <div
            className='relative cursor-pointer m-2'
            onClick={handleRemovePhoto}
        >
            <img src={photo.url} alt={photo.title} className='w-20 h-20' />
            <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
                <GoTrashcan className='text-2xl' />
            </div>
        </div>
    )
}

export default PhotosListItem
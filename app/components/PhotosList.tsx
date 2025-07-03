import React from 'react'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import { Button } from 'antd';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

function PhotosList({ album }: any) {
    const { data, isFetching, error } = useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleAddPoto = () => {
        addPhoto(album);
    }

    let content;
    if (isFetching) {
        content = <Skeleton times={4} className={"h-20 w-20"} />;
    } else if (error) {
        content = <div>Error loading photos...</div>;
    } else {
        content = data.map((photo: any) => {
            return <PhotosListItem key={photo.id} photo={photo} />
        });
    }

    return (
        <div>
            <div className='m-2 flex flex-row items-center justify-between'>
                <h3 className='text-lg font-bold'>
                    Photos In {album.title}
                </h3>
                <Button loading={addPhotoResults.isLoading} onClick={handleAddPoto}>
                    + Add Photo
                </Button>
            </div>
            <div className='mx-8 flex flex-row flex-wrap justify-center'>
                {content}
            </div>
        </div>
    )
}

export default PhotosList
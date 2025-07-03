import { useFetchAlbumsQuery, useCreateAlbumMutation } from '../store';
import React from 'react'
import Skeleton from './Skeleton';
import { Button } from 'antd';
import AlbumsListItems from './AlbumsListItems';

function AlbumsList({ user }: any) {
    const { data, isFetching, error } = useFetchAlbumsQuery(user);
    const [createAlbum, results] = useCreateAlbumMutation();

    const handleCreateAlbum = () => {
        createAlbum(user);
    }

    let content;
    //use isFetching to check if the query is loading every time make the request but isLoading loads one time.
    if (isFetching) {
        content = <Skeleton times={3} className={"w-[95%] h-7 m-auto"} />;
    } else if (error) {
        content = <div>Error loading albums...</div>;
    } else {
        content = data.map((album: any) => {
            return <AlbumsListItems key={album.id} album={album} />
        });
    }

    return <div>
        <div className='flex flex-row justify-between items-center'>
            <h3 className='text-lg font-bold'>Albums List for {user.name}</h3>
            <Button type='text' loading={results.isLoading} onClick={handleCreateAlbum}>
                + Add Album
            </Button>
        </div>
        <div>
            {content}
        </div>
    </div>
}

export default AlbumsList  
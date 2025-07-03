import React from "react";
import ExpandablePanel from "./ExpandablePanel";
import { Button } from "antd";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

function AlbumsListItems({ album }: any) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  }

  const header = <>
    <Button
      className='mr-3'
      onClick={handleRemoveAlbum}
      loading={results.isLoading}
    >
      <GoTrashcan />
    </Button>
    {album.title}
  </>;

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListItems;

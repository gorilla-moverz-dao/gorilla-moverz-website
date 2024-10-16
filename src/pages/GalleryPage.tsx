import PageTitle from "../components/PageTitle";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

import { RowsPhotoAlbum, Photo } from "react-photo-album";
import "react-photo-album/rows.css";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase-client";
import imageData from "./gallery.json";

function GalleryPage() {
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const loadPhotos = async () => {
    const photos = imageData.map((file) => ({
      src: supabase.storage.from("GoGo").getPublicUrl(file.src).data.publicUrl,
      width: file.width,
      height: file.height,
    }));
    setPhotos(photos);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        Gallery
      </PageTitle>

      <RowsPhotoAlbum photos={photos} targetRowHeight={300} onClick={({ index: current }) => setIndex(current)} />

      <Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
    </>
  );
}

export default GalleryPage;

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Col, Row } from 'react-bootstrap';

const EditImageModal = () => {
    return (
        <div>
             <ImageList sx={{ width: 600, height: 450 }} cols={3} rowHeight={164}>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
                <ImageListItem >
                  <img src="images/tower.svg" loading="lazy"/>
                </ImageListItem>
            </ImageList>
        </div>
    )
}

export default EditImageModal

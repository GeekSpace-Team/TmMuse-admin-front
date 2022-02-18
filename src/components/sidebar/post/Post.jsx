import React from 'react';
import PostTable from './postTable/PostTable';
import Stack from '@mui/material/Stack';
import './Post.css'
import AddPost from './postModal/AddPost';


const Post = () => {
  return <div className='content'>
     <Stack direction='row' className='TagsTitleAndButton' paddingTop={3} justifyContent='space-between'>
        <p className='titleNames'>Post</p>
        <AddPost/>
    </Stack>
    <div className="postSelect">
      <select name="" style={{ height: '30px' }} id=""><option value="">Select profile</option></select>
    </div>

    <PostTable/>
  </div>;
};

export default Post;

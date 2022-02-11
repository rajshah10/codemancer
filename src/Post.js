import React, { useEffect, useState } from 'react'
import "./post.css"
import { Paper, TextareaAutosize } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

import axios from "axios"
const Post = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [another, setAnother] = useState([])
    const [gif, setGif] = useState("")

    const [img, setImg] = useState("")

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleImageClick = (image) => {
        setImg(image)
        setAnchorEl(null)
    }
    useEffect(() => {
        const getGif = async () => {
            const { data } = await axios.get(`http://api.giphy.com/v1/gifs/search?api_key=okmeRpG8s4iRmywvKYtYgvpglR3PrNA4&limit=20&offset=0&q=${gif}`)
            setAnother(data.data)
        }
        getGif()
    }, [gif])

    return (
        <div className='post'>
            <div className='post-det'>
                <Avatar></Avatar>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Enter text"
                    style={{ 
                        width: 400, 
                        marginLeft: 10, 
                        border: "none", 
                        outline: "none" 
                    }}
                >
                </TextareaAutosize>

            </div>
            <div 
                style={{ 
                    width: 500, 
                    border:"none",
                    }}>
               {
                   img ? 
                   <img 
                   style={{
                        width: "100%", 
                        height: "100%" }} 
                        src={img} 
                    />
                    :
                    <img 
                    style={{
                        width: "100%", 
                        height: "100%" }} 
                        
                     />
               }
            </div>
            <div className='allBtn'>
                <div
                    onClick={handleClick}
                    size="small"
                    className='btn'>
                    <button>GIF</button>
                </div>
            </div>


            <Menu
                style={{ border: "none", marginTop: 10 }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >
                <Paper 
                    sx={{ 
                        width: 400, 
                        maxWidth: '100%', 
                        height: 400, 
                        border: "none", 
                        padding: 1, 
                        boxShadow: "0px 0px;"
                         }}>
                    <input 
                        value={gif} 
                        onChange={(e) => setGif(e.target.value)} 
                        type="text" 
                        placeholder="Search Gif">
                    </input>
                    <div 
                        style={{ 
                            witdh: "95%", 
                            marginTop: 10 
                            }}>
                        {
                            another && another.map(data => (
                                <>
                                    <img 
                                        onClick={() => handleImageClick(data.images.fixed_height.url)} 
                                            style={{ width: "100%" }} 
                                            src={data.images.fixed_height.url}>
                                    </img>
                                </>
                            ))
                        }

                    </div>

                </Paper>
            </Menu>

        </div>
    )
}

export default Post
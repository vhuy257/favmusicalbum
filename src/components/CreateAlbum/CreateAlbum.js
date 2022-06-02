import React, { useRef, useState } from 'react';
import { 
    Heading, 
    Box,
    FormControl,
    FormLabel,
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import DateTimePicker from 'react-datetime-picker';
import { MdAdd } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import shortid from 'shortid';
import {
    createAlbum
} from '../../services/AlbumService';
import './react-datetime-picker.css';

const CreateAlbum = () => {
    const [AlbumDate, onChange] = useState(new Date());
    const AlbumNameRef = useRef(null);
    const AlbumImageRef = useRef(null);

    const addAlbum = () => {
        const album = {
            id: shortid(),
            name: AlbumNameRef.current.value,
            date: AlbumDate,
            imageUrl: AlbumImageRef.current.value
        }
        console.log(album);
        createAlbum(album);
    }

    return (
        <Box>
            <Heading textAlign='center' mb='4'>Create music album</Heading>
            <FormControl>
                <Box>
                    <FormLabel htmlFor='album-name'>Name</FormLabel>
                    <Input ref={AlbumNameRef} id='album-name' className='album__name' />
                </Box>
                <Box mt='4' mb='4'>
                    <FormLabel htmlFor='album-date'>Date release</FormLabel>
                    <DateTimePicker 
                        disableClock={true} 
                        clearIcon={null} 
                        onChange={onChange} 
                        value={AlbumDate} 
                        calendarIcon={<FaRegCalendarAlt/>} 
                        format='dd/MM/y'
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor='album-image-url'>Url image</FormLabel>
                    <InputGroup>
                        <Input ref={AlbumImageRef} id='album-image-url' className='album-image-url' />
                        <InputRightElement children={<AiOutlineLink />} />
                    </InputGroup>
                </Box>
                <ButtonGroup mt='5' size='md' isAttached variant='solid'>
                    <Button colorScheme='messenger' rightIcon={<MdAdd />} onClick={addAlbum}>Add to List</Button>
                </ButtonGroup>
            </FormControl>
        </Box>
    )
}

export default CreateAlbum;
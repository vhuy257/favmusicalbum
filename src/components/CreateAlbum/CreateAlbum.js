import React, { useRef, useState } from 'react';
import { 
    Heading, 
    Box,
    FormControl,
    FormLabel,
    Button,
    ButtonGroup,
    Input,
    Textarea,
    FormErrorMessage,
    useToast,
    useMediaQuery 
} from "@chakra-ui/react";
import DateTimePicker from 'react-datetime-picker';
import { MdAdd } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import shortid from 'shortid';
import { useTranslation } from "react-i18next";
import {
    createAlbum
} from '../../services/AlbumService';
import {
    createAlbumAction
} from '../../store/actions';
import './react-datetime-picker.css';

const CreateAlbum = ({dispatch}) => {
    const [AlbumDate, onChange] = useState(new Date());
    const InputNameRef = useRef(null);    
    const TextAreaRef  = useRef(null);
    const [isInvalid, setIsInvalid]      = useState(false);
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
    const toast = useToast();
    const [t] = useTranslation('common');

    const addAlbum = async () => {
        try {
            const album = {
                id: shortid(),
                name: InputNameRef.current.value,
                date: AlbumDate.toISOString(),
                shortDescription: TextAreaRef.current.value,
                marked: false,
            };
            
            console.log(AlbumDate.toISOString());

            if(InputNameRef.current.value === '') {
                setIsInvalid(true);
                return null;
            } 
    
            const resultAlbum = await createAlbum(album);
            dispatch(createAlbumAction(resultAlbum));
    
            if(resultAlbum) { // Clear form data after add new album
                InputNameRef.current.value = '';
                TextAreaRef.current.value  = '';
                setIsInvalid(false);
                toast({
                    title: 'Item created.',
                    description: "We've created your album item and added to list.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: 'Error!',
                description: `error . Please create again!!`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    return (
        <Box 
            pos={ isLargerThan1280 ? 'fixed' : 'relative' }
            maxW={ isLargerThan1280 ? '500px' : '100%' } 
            p='2rem'
            boxShadow='md' 
            rounded='md' 
            left={ isLargerThan1280 ? '40px' : '0px'} 
            top='25%' bgColor='white' 
            zIndex='99'>
            <Heading textAlign='center' mb='4'>{t('create.album')}</Heading>
                <Box>
                    <FormControl isInvalid={isInvalid}>
                    <FormLabel htmlFor='album-name'>{t('create.name')}</FormLabel>
                    <Input ref={InputNameRef} id='album-name' className='album__name' onKeyDown={(e) => {e.key === 'Enter' && addAlbum()}}/>
                    {
                        isInvalid && (
                            <FormErrorMessage>Album name is required.</FormErrorMessage>
                        )
                    }
                    </FormControl>
                </Box>
                <Box mt='4'>
                    <FormLabel htmlFor='album-description'>{t('create.description')}</FormLabel>
                    <Textarea ref={TextAreaRef} id='album-description' className='album__description' onKeyDown={(e) => {e.key === 'Enter' && addAlbum()}}/>
                </Box>
                <Box mt='4' mb='4'>
                    <FormLabel htmlFor='album-date'>{t('create.date')}</FormLabel>
                    <DateTimePicker 
                        disableClock={true} 
                        clearIcon={null} 
                        onChange={onChange} 
                        value={AlbumDate} 
                        calendarIcon={<FaRegCalendarAlt/>} 
                        format='dd/MM/y'
                    />
                </Box>
                <ButtonGroup mt='5' size='md' isAttached variant='solid'>
                    <Button colorScheme='messenger' rightIcon={<MdAdd />} onClick={addAlbum}>{t('create.addButton')}</Button>
                </ButtonGroup>
        </Box>
    )
}

export default CreateAlbum;
import React, { useState } from 'react';
import {
    Flex,
    Box,
    Heading,
    Text,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    Button,
    useDisclosure,
    Tooltip,
    useToast,
    useMediaQuery,
} from '@chakra-ui/react';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { TiDelete } from 'react-icons/ti';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Moment from 'react-moment';
import { useTranslation } from "react-i18next";
import {
    deleteItemAlbum,
    markAlbum
} from '../../services/AlbumService';
import {
    removeItemFromListAction,
    markAlbumAsBestAction
} from '../../store/actions';
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage';
import FilterAlbum from '../FilterAlbum/FilterAlbum';

const ListAlbum = ({listAlbum, dispatch, display}) => {    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ selectedId, setSelectedId ] = useState(null);
    const cancelRef = React.useRef();
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
    const toast = useToast();
    const [t] = useTranslation('common');

    const removeList = async(id) => {
        try {
            if(id) {
                await deleteItemAlbum(id);
                dispatch(removeItemFromListAction(id));
                onClose();
                toast({
                    title: 'Item removed!.',
                    description: "We've removed your album item.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Error!',
                description: `${error}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const markAlbumAsBest = async(id) => {
        try {
            await markAlbum(id);
            dispatch(markAlbumAsBestAction(id));
            toast({
                title: 'Item updated!.',
                description: "We've updated your album item.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error!',
                description: `${error}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const openDialog = (id) => {
        onOpen();
        setSelectedId(id);
    }

    return (
        <Box mt='10' maxW={ isLargerThan1280 ? 'calc(100% - 500px)' : '100%' } pl={isLargerThan1280 ? '600px' : '0'}>
            <ChangeLanguage/>
            <Heading textAlign={'center'}>
                {t('list.title')}
            </Heading>
            <FilterAlbum dispatch={dispatch} display={display}/>
            {
                !listAlbum.length && (
                    <Box textAlign='center' mt='10'><Text color="gray.600">{t('list.empty')}</Text></Box>
                )
            }
            <Flex color='black' flexWrap='wrap' mt='10'>
                {
                    listAlbum.map((album, key) => (
                        <Flex 
                            key={key} 
                            flexDirection={display === 'grid' ? 'column' : 'row'}
                            alignItems='center' 
                            w={(isLargerThan1280 && display === 'list') ? '100%' : (isLargerThan1280 && display === 'grid') ? 'calc(100%/3 - 16px)' : (!isLargerThan1280 && display === 'list') ? '100%' : 'calc(100%/2 - 16px)'} 
                            m='2' 
                            mb='10'
                            pos='relative'
                        >
                            <Flex 
                                borderRadius='5px' 
                                alignItems={'center'} 
                                background='gray.200' 
                                justify='center' 
                                pos='relative'
                                textAlign='center' 
                                w={display === 'grid' ? '100%' : '150px'}
                                minHeight='150px'>
                                <HiOutlineMusicNote size='3rem'/>
                                <Tooltip label="Best of the best" aria-label='A tooltip'>
                                    <Box pos='absolute' right='0' bottom='0' onClick={(e) => {markAlbumAsBest(album.id)}}>
                                        {album.marked === false && (
                                            <AiOutlineStar cursor={'pointer'} size='1.4rem'/>
                                        )}
                                        {album.marked !== false && (
                                            <AiFillStar color='green' cursor={'pointer'} size='1.4rem'/>
                                        )}
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Box
                                w={display === 'grid' ? '100%' : 'calc(100% - 200px)'}
                                ml={display === 'grid' ? '0' : '1rem'}
                            >
                                <Text fontWeight='bold' fontSize='xl' mt='4'>{album.name}</Text>
                                {
                                    display === 'list' && album.shortDescription && (
                                        <Text fontSize='lg' color='gray.700' noOfLines={3}>{album.shortDescription}</Text>
                                    )
                                }
                                <Text fontSize='sm' color='gray.500'>
                                    <Moment format='D/MM/y'>{album.date}</Moment>
                                </Text>
                            </Box>
                            <Box pos='absolute' left='-15px' top='-10px' onClick={(e) => {openDialog(album.id)}}>
                                <TiDelete color='tomato' cursor={'pointer'} size='2rem'/>
                            </Box>
                        </Flex>
                    ))
                }
            </Flex>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                blockScrollOnMount={false}
                onClose={onClose}
                isOpen={isOpen}
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                <AlertDialogHeader>{t('confirm.title')}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {t('confirm.content')}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                    {t('confirm.no')}
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={(e) => {removeList(selectedId)}}>
                    {t('confirm.yes')}
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    )
}

export default ListAlbum;
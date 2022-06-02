import React from 'react';
import {
    Flex,
    Box,
    Heading,
    Text,
    Image,
} from '@chakra-ui/react'
import Moment from 'react-moment';

const ListAlbum = ({listAlbum}) => {
    return (
        <Box mt='10'>
            <Heading textAlign={'center'}>
                List Album
            </Heading>
            <Flex color='black' flexWrap='wrap' mt='10'>
                {
                    listAlbum.map((album, key) => (
                        <Box key={key} w='calc(100%/3 - 16px)' m='2'>
                            <Image src={album.imageUrl} />
                            <Text fontWeight='bold' fontSize='xl'>{album.name}</Text>
                            <Text fontSize='sm' color='gray.500'>
                                <Moment format='D/MM/y'>{album.date}</Moment>
                            </Text>
                        </Box>
                    ))
                }
            </Flex>
        </Box>
    )
}

export default ListAlbum;
import React from 'react';
import {
    Flex,
    Box,
    Select,
    Tooltip,
} from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { MdOutlineList, MdOutlineGridView } from 'react-icons/md';
import {
    setDisplayAction,
    sortListAction,
} from '../../store/actions';

const FilterAlbum = ({dispatch, display}) => {
    const [t] = useTranslation('common');

    const sortList = (val) => {
        dispatch(sortListAction(val));
    }

    return (
        <Flex justify={'space-between'} mt='2rem' pt='2rem'>
            <Box w='6rem'>
                <Select placeholder={t('filter.filter')} onChange={(e) => {sortList(e.target.value)}}>
                    <option value='id'>Id</option>
                    <option value='name'>{t('filter.name')}</option>
                    <option value='date'>{t('filter.day')}</option>
                </Select>
            </Box>
            <Flex flexDirection='row'>
                <Tooltip label="List mode" aria-label='A tooltip'>
                    <Box
                        mr='1rem' 
                        color={display === 'list' ? 'blue' : ''}
                        cursor={'pointer'} 
                        onClick={(e) => {dispatch(setDisplayAction('list'))}}>
                                <MdOutlineList size='2rem'/>
                    </Box>
                </Tooltip>
                <Tooltip label="Grid mode" aria-label='A tooltip'>
                    <Box 
                        color={display === 'grid' ? 'blue' : ''}
                        cursor={'pointer'} 
                        onClick={(e) => {dispatch(setDisplayAction('grid'))}}
                    >
                        <MdOutlineGridView size='2rem' />
                    </Box>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default FilterAlbum;
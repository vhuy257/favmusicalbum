import React, { useState } from 'react';
import { 
    Menu,
    MenuButton,
    Button,
    Flex,
    MenuList, 
    MenuItem } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { BiChevronDown } from 'react-icons/bi';

const ChangeLanguage = () => {
    const [lang, setLang] = useState('en');
    const [ ,i18n] = useTranslation('common');

    return (
        <Flex justify='right'>
            <Menu>
                <MenuButton as={Button} rightIcon={<BiChevronDown />}>{lang === 'en' ? 'English' : 'Viet nam'}</MenuButton>
                <MenuList>
                    <MenuItem onClick={() => i18n.changeLanguage('en') && setLang('en')}>English</MenuItem>
                    <MenuItem onClick={() => i18n.changeLanguage('vie') && setLang('vie')}>Viet nam</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default ChangeLanguage;
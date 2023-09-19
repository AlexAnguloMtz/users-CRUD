import styles from './styles.module.css';
import React, { useState } from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import icon from '../../../../../public/glass.svg';
import Image from 'next/image';

interface SearchBarProps {
    onSearch: () => void;
    onChange: (value: string) => void,
    value: string,
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onChange,
    value
}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Paper className={styles.searchBar}>
            <InputBase
                className={styles.inputField}
                placeholder="Buscar usuarios"
                value={value}
                onChange={handleInputChange}
            />
            <IconButton
                className={styles.searchIcon}
                onClick={onSearch}>
                <Icon />
            </IconButton>
        </Paper>
    );
};

function Icon(): JSX.Element {
    return (
        <Image
            className={styles.icon}
            src={icon}
            alt='buscar' />
    );
}

export default SearchBar;

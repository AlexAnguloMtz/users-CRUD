import styles from './styles.module.css';
import React, { useState } from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import icon from '../../../../../public/glass.svg';
import Image from 'next/image';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Paper className={styles.searchBar}>
            <InputBase
                className={styles.inputField}
                placeholder="Buscar usuarios"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <IconButton className={styles.searchIcon} onClick={handleSearch}>
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

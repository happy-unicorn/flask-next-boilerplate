import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import NormalizeStyles from '../../styles/NormalizeStyles';
import GlobalStyles from '../../styles/GlobalStyles';
import { breakpoints, themes } from '../../styles/ThemesStyles';
import { getTheme } from '../../state/selectors';

const StyleProvider = (props) => {
    const themeType = useSelector(getTheme);
    const theme = {
        ...breakpoints,
        ...themes[themeType]
    };
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <NormalizeStyles/>
            {props.children}
        </ThemeProvider>
    );
};

export default StyleProvider;
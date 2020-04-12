export const breakpoints = {
    down: {
        small: 'min-width: 576px',
        medium: 'min-width: 768px',
        large: 'min-width: 992px',
        huge: 'min-width: 1200px',
    },
    up: {
        tiny: 'max-width: 575.98px',
        small: 'max-width: 767.98px',
        medium: 'max-width: 991.98px',
        large: 'max-width: 1199.98px',
    }
};

export const themes ={
    // Dark Theme
    dark: {
        background: {
            color: {
                main: '#2f343f'
            }
        },
        shadow: {
            direction: {
                negative: '-2px -2px 10px',
                straight: '0 0 10px',
                positive: '3px 3px 10px'
            },
            color: {
                light: '#404552',
                dark: '#1d2128',
                error: '#ff1c1c'
            }
        },
        indicator: {
            color: {
                standard: '#2f343f',
                active: '#9aab98'
            }
        },
        border: {
            radius: {
                standard: '20px'
            },
            color: {
                main: '#2f343f'
            }
        },
        text: {
            size: {
                smaller: '12px',
                small: '15px',
                medium: '20px',
                big: '25px'
            },
            font: {
                light: '"Nunito Light", sans-serif',
                regular: '"Nunito Regular", sans-serif',
                bold: '"Nunito Bold", sans-serif'
            },
            color: {
                main: '#c1c1c1',
                placeholder: '#969799',
                success: '#9aab98',
                error: '#733939'
            }
        }
    },
    // Light Theme
    light: {
        background: {
            color: {
                main: '#e0e5ec'
            }
        },
        shadow: {
            direction: {
                negative: '-2px -2px 10px',
                straight: '0 0 6px',
                positive: '3px 3px 10px'
            },
            color: {
                light: '#ffffff',
                dark: '#a3b1c6',
                error: '#fb0044'
            }
        },
        indicator: {
            color: {
                standard: '#e0e5ec',
                active: '#9aab98'
            }
        },
        border: {
            radius: {
                standard: '20px'
            },
            color: {
                main: '#e0e5ec'
            }
        },
        text: {
            size: {
                smaller: '12px',
                small: '15px',
                medium: '20px',
                big: '25px'
            },
            font: {
                light: '"Nunito Light", sans-serif',
                regular: '"Nunito Regular", sans-serif',
                bold: '"Nunito Bold", sans-serif'
            },
            color: {
                main: '#404552',
                placeholder: '#969799',
                success: '#9aab98',
                error: '#ab4646'
            }
        }
    }
};
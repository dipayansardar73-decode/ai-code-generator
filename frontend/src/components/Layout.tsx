import React from 'react';
import {
    makeStyles,
    tokens,
    Title1,
    Button,
    Avatar,
} from '@fluentui/react-components';
import {
    CodeRegular,
    LibraryRegular,
    HistoryRegular,
    SettingsRegular,
    WeatherMoonRegular
} from '@fluentui/react-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    layout: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: tokens.colorNeutralBackground1,
    },
    sidebar: {
        width: '250px',
        backgroundColor: tokens.colorNeutralBackground2,
        borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
    },
    navContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexGrow: 1,
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: tokens.borderRadiusMedium,
        cursor: 'pointer',
        color: tokens.colorNeutralForeground2,
        transition: 'background-color 0.2s, color 0.2s',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            color: tokens.colorNeutralForeground1Hover,
        },
    },
    navItemActive: {
        backgroundColor: tokens.colorBrandBackground2,
        color: tokens.colorBrandForeground2,
        fontWeight: tokens.fontWeightSemibold,
        '&:hover': {
            backgroundColor: tokens.colorBrandBackground2Hover,
        }
    },
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        height: '60px',
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 24px',
        gap: '16px',
    },
    contentArea: {
        flexGrow: 1,
        padding: '24px',
        overflowY: 'auto',
    },
});

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Generator', icon: <CodeRegular /> },
        { path: '/templates', label: 'Templates', icon: <LibraryRegular /> },
        { path: '/history', label: 'History', icon: <HistoryRegular /> },
        { path: '/settings', label: 'Settings', icon: <SettingsRegular /> },
    ];

    return (
        <div className={classes.layout}>
            {/* Sidebar Navigation */}
            <nav className={classes.sidebar}>
                <div className={classes.logoContainer}>
                    <div style={{ backgroundColor: tokens.colorBrandBackground, borderRadius: '8px', padding: '6px', color: 'white', display: 'flex' }}>
                        <CodeRegular fontSize={24} />
                    </div>
                    <Title1 style={{ fontSize: '20px', margin: 0 }}>CodeGen AI</Title1>
                </div>

                <div className={classes.navContainer}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <div
                                key={item.path}
                                className={`${classes.navItem} ${isActive ? classes.navItemActive : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content Area */}
            <div className={classes.mainContent}>
                <header className={classes.header}>
                    <Button icon={<WeatherMoonRegular />} appearance="subtle" aria-label="Toggle Theme" />
                    <Avatar name="AI Engineer" color="brand" />
                </header>
                <main className={classes.contentArea}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

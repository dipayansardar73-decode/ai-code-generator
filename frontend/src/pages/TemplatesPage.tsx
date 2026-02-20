import React, { useEffect, useState } from 'react';
import {
    makeStyles,
    tokens,
    Title1,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Button,
    Badge
} from '@fluentui/react-components';
import { EyeRegular } from '@fluentui/react-icons';
import axios from 'axios';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
    },
    tableContainer: {
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        padding: '16px',
        overflowY: 'auto'
    }
});

interface Template {
    id: number;
    name: string;
    description: string;
}

const TemplatesPage: React.FC = () => {
    const classes = useStyles();
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        // Mock fetching for UI demonstration
        setTemplates([
            { id: 1, name: "Class", description: "Standard modern C++ class with rule of 5." },
            { id: 2, name: "Singleton", description: "Thread-safe singleton pattern implementation." },
            { id: 3, name: "Factory", description: "Factory pattern for object creation." },
            { id: 4, name: "Observer", description: "Observer pattern implementation using std::function." }
        ]);
    }, []);

    return (
        <div className={classes.container}>
            <Title1>Templates Library</Title1>
            <p>Select a template context when generating code to strictly enforce specific design patterns.</p>

            <div className={classes.tableContainer}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates.map((template) => (
                            <TableRow key={template.id}>
                                <TableCell>{template.id}</TableCell>
                                <TableCell>
                                    <Badge appearance="filled" color="brand">{template.name}</Badge>
                                </TableCell>
                                <TableCell>{template.description}</TableCell>
                                <TableCell>
                                    <Button icon={<EyeRegular />} appearance="subtle">View Logic</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TemplatesPage;

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
import { ThumbLikeRegular, ThumbDislikeRegular, CodeRegular } from '@fluentui/react-icons';

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

interface HistoryItem {
    id: number;
    prompt: string;
    model: string;
    date: string;
    rating: number;
}

const HistoryPage: React.FC = () => {
    const classes = useStyles();
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        // Mock fetching for UI demonstration
        setHistory([
            { id: 101, prompt: "Create a thread-safe Queue class", model: "gpt-4", date: "2023-11-20 14:30", rating: 1 },
            { id: 102, prompt: "Quick sort array of strings", model: "gpt-3.5", date: "2023-11-19 09:15", rating: 0 },
            { id: 103, prompt: "OpenGL uniform buffer wrapper", model: "gpt-4", date: "2023-11-18 16:45", rating: -1 },
        ]);
    }, []);

    return (
        <div className={classes.container}>
            <Title1>Generation History</Title1>

            <div className={classes.tableContainer}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Prompt Concept</TableHeaderCell>
                            <TableHeaderCell>Model</TableHeaderCell>
                            <TableHeaderCell>Date</TableHeaderCell>
                            <TableHeaderCell>Feedback</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    <span style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '300px',
                                        display: 'inline-block'
                                    }}>
                                        {item.prompt}
                                    </span>
                                </TableCell>
                                <TableCell><Badge color="informative">{item.model}</Badge></TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <Button icon={<ThumbLikeRegular />} appearance={item.rating === 1 ? 'primary' : 'subtle'} />
                                        <Button icon={<ThumbDislikeRegular />} appearance={item.rating === -1 ? 'primary' : 'subtle'} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button icon={<CodeRegular />} appearance="secondary">View Code</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default HistoryPage;

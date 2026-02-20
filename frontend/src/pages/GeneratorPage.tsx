import React, { useState } from 'react';
import {
    makeStyles,
    tokens,
    Title1,
    Textarea,
    Button,
    Switch,
    Dropdown,
    Option,
    Spinner,
    Card,
    CardHeader
} from '@fluentui/react-components';
import { PlayRegular, CopyRegular, ArrowDownloadRegular } from '@fluentui/react-icons';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
    },
    splitView: {
        display: 'flex',
        gap: '24px',
        flexGrow: 1,
        minHeight: '0', // allows flex children to scroll
    },
    leftPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        paddingRight: '12px',
    },
    rightPanel: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        overflow: 'hidden',
    },
    editorToolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 16px',
        backgroundColor: tokens.colorNeutralBackground2,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    toolbarActions: {
        display: 'flex',
        gap: '8px',
    },
    optionsCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        backgroundColor: tokens.colorNeutralBackground1,
    },
    textarea: {
        minHeight: '200px',
    }
});

const GeneratorPage: React.FC = () => {
    const classes = useStyles();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('// Your generated C++ code will appear here\\n');

    // Options
    const [splitFiles, setSplitFiles] = useState(false);
    const [withComments, setWithComments] = useState(true);
    const [template, setTemplate] = useState('None');

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);

        try {
            // In a real scenario, this connects to the backend API we built
            // const response = await axios.post('http://localhost:8000/api/generate', {
            //   prompt,
            //   options: {
            //     split_files: splitFiles,
            //     with_comments: withComments,
            //     template_name: template !== 'None' ? template : null
            //   }
            // });

            // Mock delay for UI showcasing purposes before backend is hooked
            await new Promise(resolve => setTimeout(resolve, 2000));
            setGeneratedCode('// Simulated generation successful!\\n\\nclass MockClass {\\npublic:\\n    MockClass();\\n};');
        } catch (error) {
            console.error('Generation failed:', error);
            setGeneratedCode('// Error generating code. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
    };

    return (
        <div className={classes.container}>
            <Title1>Code Generator</Title1>

            <div className={classes.splitView}>
                {/* Left Panel: Inputs and Options */}
                <div className={classes.leftPanel}>
                    <Textarea
                        className={classes.textarea}
                        placeholder="Describe the C++ code you want to generate (e.g., 'Create a thread-safe singleton Logger class')..."
                        value={prompt}
                        onChange={(e, data) => setPrompt(data.value)}
                    />

                    <Card className={classes.optionsCard}>
                        <CardHeader header={<Title1 style={{ fontSize: '16px' }}>Generation Options</Title1>} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Switch
                                checked={splitFiles}
                                onChange={(e, data) => setSplitFiles(data.checked)}
                                label="Split Header / Implementation (.hpp / .cpp)"
                            />
                            <Switch
                                checked={withComments}
                                onChange={(e, data) => setWithComments(data.checked)}
                                label="Include Comments & Documentation"
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                                <label>Design Pattern / Template</label>
                                <Dropdown
                                    value={template}
                                    onOptionSelect={(e, data) => setTemplate(data.optionValue as str)}
                                >
                                    <Option value="None">None</Option>
                                    <Option value="Class">Standard Class</Option>
                                    <Option value="Singleton">Singleton</Option>
                                    <Option value="Factory">Factory</Option>
                                </Dropdown>
                            </div>
                        </div>
                    </Card>

                    <Button
                        appearance="primary"
                        size="large"
                        icon={isGenerating ? <Spinner size="tiny" /> : <PlayRegular />}
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                    >
                        {isGenerating ? 'Generating...' : 'Generate Code'}
                    </Button>
                </div>

                {/* Right Panel: Editor Preview */}
                <div className={classes.rightPanel}>
                    <div className={classes.editorToolbar}>
                        <span style={{ fontWeight: 600 }}>Preview</span>
                        <div className={classes.toolbarActions}>
                            <Button icon={<CopyRegular />} appearance="subtle" onClick={handleCopy} title="Copy to clipboard" />
                            <Button icon={<ArrowDownloadRegular />} appearance="subtle" title="Download Code" />
                        </div>
                    </div>

                    <Editor
                        height="100%"
                        defaultLanguage="cpp"
                        theme="vs-dark" // Fluent dark mode paired with vs-dark editor looks great
                        value={generatedCode}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
                            readOnly: true,
                            wordWrap: 'on'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GeneratorPage;

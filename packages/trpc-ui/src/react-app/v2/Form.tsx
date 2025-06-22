import { JsonForms } from "@jsonforms/react";
import type { Procedure } from "@src/parseV2/types";
import React from "react";

import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonViewer } from "@textea/json-viewer";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

// Icons
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import { useState } from "react";
import { sample } from "@stoplight/json-schema-sampler";
import prettyBytes from "pretty-bytes";
import prettyMs from "pretty-ms";
import { createProcedureFetcher } from "@src/parseV2/fetcher";
import { DocumentationSection } from "./DocumentationSection";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1.5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const fetcher = createProcedureFetcher({
  baseUrl: "http://localhost:3001/api/trpc",
});

export function Form({ procedure }: { procedure: Procedure }) {
  const [data, setData] = useState<object>({});
  const [tabValue, setTabValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    data?: any;
    error?: any;
    time?: number;
    size?: number;
  } | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleEditorChange = (value: string | undefined) => {
    try {
      const parsedData = JSON.parse(value ?? "{}");
      setData(parsedData);
    } catch (e) {
      // Handle parsing error silently
    }
  };

  const handleClear = () => {
    setData({});
    // Don't clear the response
  };

  const handleAutofill = () => {
    if (procedure.schema) {
      try {
        const sampleData = sample(procedure.schema);
        setData(sampleData || {});
      } catch (e) {
        console.error("Error generating sample data:", e);
      }
    }
  };

  const handleSend = async () => {
    if (!procedure) return;
    
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const result = await fetcher(procedure, {
        input: data,
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const responseSize = JSON.stringify(result).length;
      
      setResponse({
        data: result,
        time: responseTime,
        size: responseSize,
      });
    } catch (error) {
      setResponse({
        error,
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!procedure.schema) {
    return "No Schema";
  }

  return (
    <div className="m-2 bg-white">
      {/* Documentation Section */}
      <DocumentationSection 
        meta={procedure.meta} 
        schema={procedure.schema}
      />

      {/* Input Section */}
      <Paper elevation={2} sx={{ mb: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="editing mode tabs"
            >
              <Tab label="Form View" {...a11yProps(0)} />
              <Tab label="JSON View" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
              <JsonForms
                schema={procedure.schema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
              />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
              <Editor
                defaultLanguage="json"
                options={{
                  minimap: {
                    enabled: false,
                  },
                  formatOnType: true,
                }}
                height={"25vh"}
                value={JSON.stringify(data, null, 2)}
                onChange={handleEditorChange}
              />
          </CustomTabPanel>
          
          <Box sx={{ px: 2, pb: 1.5, pt: 0.5, display: 'flex', justifyContent: 'space-between' }}>
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={handleClear}
                startIcon={<ClearIcon />}
                size="small"
              >
                Clear
              </Button>
              <Button
                onClick={handleAutofill}
                startIcon={<AutoFixHighIcon />}
                size="small"
              >
                Autofill
              </Button>
            </ButtonGroup>
            
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSend}
              startIcon={loading ? <CircularProgress size={16} /> : <SendIcon />}
              disabled={loading}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Response Section */}
      {response && (
        <Paper elevation={2}>
          <Box 
            sx={{ 
              px: 2, 
              py: 1, 
              borderBottom: 1, 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography 
              variant="body2" 
              component="div" 
              sx={{ 
                fontWeight: 500, 
                color: response.error ? "error.main" : "text.secondary" 
              }}
            >
              {response.error 
                ? "Error" 
                : `Response ${response.size ? `(${prettyBytes(response.size)})` : ''} ${response.time ? `(${prettyMs(response.time)})` : ''}`}
            </Typography>
          </Box>
          
          {response.error ? (
            <Box sx={{ p: 1.5 }}>
              <Typography color="error.main" variant="body2">
                {response.error.message || "Unknown error occurred"}
              </Typography>
              {response.error.stack && (
                <Box 
                  sx={{ 
                    mt: 1.5, 
                    p: 1.5, 
                    bgcolor: 'rgba(0, 0, 0, 0.03)', 
                    borderRadius: 1, 
                    overflow: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem'
                  }}
                >
                  <pre>{response.error.stack}</pre>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ p: 1.5 }}>
              <JsonViewer 
                rootName={false} 
                value={response.data} 
                quotesOnKeys={false}
                displayDataTypes={false}
                displaySize={false}
              />
            </Box>
          )}
        </Paper>
      )}
    </div>
  );
}

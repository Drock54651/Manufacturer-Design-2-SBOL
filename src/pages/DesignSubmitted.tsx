// JobSubmitted.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_JOB_BY_ID } from '../gql/queries';
import { Workflow } from '../gql/graphql';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Box } from '@mui/material';
import ResearchDocumentationPDF from '../components/researchDocumentationPDF';

export default function ResearchSubmitted() {
  // get job id from navigation state
  const location = useLocation();
  const [jobId, setJobId] = useState(location.state.id);
  const [value, setValue] = useState(`https://damplab.sail.codes/client_view/${jobId}`);

  const [workflowName, setWorkflowName] = useState('');
  const [workflowState, setWorkflowState] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobState, setJobState] = useState('');
  const [jobTime, setJobTime] = useState('');
  const [jobUsername, setJobUsername] = useState('');
  const [jobInstitution, setJobInstitution] = useState('');
  const [jobEmail, setJobEmail] = useState('');
  const [jobNotes, setJobNotes] = useState('');
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const { loading, error, data } = useQuery(GET_JOB_BY_ID, {
    variables: { id: jobId },
    onCompleted: (data) => {
      console.log('job successfully loaded: ', data);
      setWorkflowName(data.jobById.workflows[0].name);
      setWorkflowState(data.jobById.workflows[0].state);
      setJobName(data.jobById.name);
      setJobState(data.jobById.state);
      setJobTime(data.jobById.submitted);
      setJobUsername(data.jobById.username);
      setJobInstitution(data.jobById.institute);
      setJobEmail(data.jobById.email);
      setJobNotes(data.jobById.notes);
      setWorkflows(data.jobById.workflows);
    },
    onError: (error: any) => {
      console.log(error.networkError?.result?.errors);
    }
  });

  useEffect(() => {
    console.log(workflows);
  }, [workflows]);

  return (
    <>
    <Box>
        {/*Add SBOL file here -- breadcrumb --*/}
        {/*workflow.nodes.map((service, ind) => (
          <View key={ind} style={styles.section}>
            <Text style={styles.service}>{service.label}</Text>
            {service.formData.map((parameter: any, i: number) => {
              if (parameter.type === 'boolean') {
                if (parameter.value === true) {
                  return(<Text key={i} style={styles.parameter}>{parameter.name}: true</Text>)
                } else {
                  return(<Text key={i} style={styles.parameter}>{parameter.name}: {parameter.resultParamValue}</Text>)
                }
              } else {
                return(<Text key={i} style={styles.parameter}>{parameter.name}: {parameter.value}</Text>)
              }
            })}
          </View>
        ))*/}
        <p>Placeholder for SBOL File</p>
    </Box>
    <Box>
      <h1>Design Submitted</h1>
      <p>Job ID: {jobId}</p>
      <p>This document serves as a reference for citation in figures within your papers, illustrating your manufacturing design process. Make sure to save the below document</p>
      <p>
        <PDFDownloadLink
          document={
            <ResearchDocumentationPDF
              jobId={jobId}
              jobName={jobName}
              jobUsername={jobUsername}
              jobEmail={jobEmail}
              jobInstitution={jobInstitution}
              jobNotes={jobNotes}
              jobTime={jobTime}
              workflows={workflows}
            />
          }
          fileName={`DAMP-Order-${jobId}.pdf`}
        >
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download a PDF summary for your records!')}
        </PDFDownloadLink>
      </p>
      <br />
      <PDFViewer width="75%" height="1000px">
        <ResearchDocumentationPDF
          jobId={jobId}
          jobName={jobName}
          jobUsername={jobUsername}
          jobEmail={jobEmail}
          jobInstitution={jobInstitution}
          jobNotes={jobNotes}
          jobTime={jobTime}
          workflows={workflows}
        />
      </PDFViewer>
    </Box>
    </>
  );
}
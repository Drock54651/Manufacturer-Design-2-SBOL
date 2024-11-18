// JobPDFDocument.tsx
import React from 'react';
import { Document, Page, Canvas, StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { Workflow } from '../gql/graphql';

// Register font
import { Font } from '@react-pdf/renderer';

Font.register({ family: 'Courier-New', fonts: [{ src: '/fonts/Courier-New.ttf' }] });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    position: 'relative'
  },
  section: {
    margin: 15,
    padding: 15,
    wrap: false
  },
  jobParam: {
    margin: 10,
    fontSize: 12,
  },
  workflow: {
    fontSize: 20,
    padding: 30,
    // paddingBottom: -20,
  },
  service: {
    marginBottom: 10,
    fontSize: 15,
  },
  parameter: {
    fontSize: 12,
    margin: 10,
  },
  canvas: {
    width: '100%',
    height: 20,
  },
  header: {
    margin: 15,
    padding: 15,
    flexDirection: 'column',
    fontSize: 10,
    fontFamily: 'Courier-New',
  },
  headerElement: {
    margin: 5,
  },
  footer: {
    position: 'absolute',
    left: '5%',
    bottom: '3%',
    fontSize: 10,
  },
  pageNumber: {
    position: 'absolute',
    right: '5%',
    bottom: '3%',
    fontSize: 10,
  },
});

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString(); // Formats date and time as per local conventions
};

interface JobPDFDocumentProps {
  jobId: string | undefined;
  jobName: string;
  jobUsername: string;
  jobEmail: string;
  jobInstitution: string;
  jobNotes: string;
  jobTime: string;
  workflows: Workflow[];
}

const researchDocumentationPDF: React.FC<JobPDFDocumentProps> = ({
  jobId,
  jobName,
  jobUsername,
  jobEmail,
  jobInstitution,
  jobNotes,
  jobTime,
  workflows,
}) => ( jobId ? 
  <Document>
    <Page>
      <Text style={{ marginTop: '5%', fontSize: 25, textAlign: 'center'}}>Manufacturing Design Report & Notes</Text>
      <View style={styles.header}>
        <Text style={styles.headerElement}>This report was created using DAMP (Design Automation Manufacturing Processes) Lab's Canvas which was modified by students attending Nona Works.</Text>
        <Text style={styles.headerElement}>This PDF was generated on: {getCurrentDateTime()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={{ margin: 10, fontSize: 16 }}>Design Details</Text>
        <Text style={styles.jobParam}>Design Name: {jobName}</Text>
        <Text style={styles.jobParam}>Design ID: {jobId}</Text>
        <Text style={styles.jobParam}>Submitter Name: {jobUsername}</Text>
        <Text style={styles.jobParam}>Submitter Email: {jobEmail}</Text>
        <Text style={styles.jobParam}>Submitter Institution: {jobInstitution}</Text>
        <Text style={styles.jobParam}>Submitter's Notes: {jobNotes}</Text>
        <Text style={styles.jobParam}>Submission Time: {jobTime}</Text>
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
    </Page>
    {workflows.map((workflow, index) => (
      <Page key={index}>
        <Text style={styles.workflow}>{workflow.name}</Text>
        {workflow.nodes.map((service, ind) => (
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
        ))}
        <Text key={index} style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
      </Page>
    ))}
  </Document>
  :
  <div>
    PDF Unavailable
  </div>
);

export default researchDocumentationPDF;

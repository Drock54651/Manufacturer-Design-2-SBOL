// JobSubmitted.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_JOB_BY_ID } from '../gql/queries';
import { Workflow } from '../gql/graphql';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Box } from '@mui/material';
import ResearchDocumentationPDF from '../components/researchDocumentationPDF';
import axios from 'axios';

export default function ResearchSubmitted() {
  // get job id from navigation state
  const location = useLocation();
  const [jobId, setJobId] = useState(location.state.id);
  const [value, setValue] = useState('');

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
  const [xmlFile, setXmlFile] = useState(new Blob());
  const [showXML, setShowXML] = useState(false);

  const navigate = useNavigate();

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

  /* -- breadcrumb -- This should be where the XML file gets retrieved*/
  const fetchXMLFile = async () => {
    try {
      const response = await axios.get('https://example.com/mockup-xml-file', {
        headers: {
          'Accept': 'application/xml',
        },
        responseType: 'blob',
      });

      setXmlFile(new Blob([response.data], { type: 'application/xml' }));
      const xmlUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/xml' }));
      setValue(xmlUrl);
      setShowXML(true);
    } catch (error) {
      console.error('Error fetching XML file:', error);
    }
  };
  //fetchXMLFile()
  const xmlFileContent = `<?xml version="1.0" encoding="utf-8"?>
<rdf:RDF
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:sbol="http://sbols.org/v3#"
>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature1/Range1">
    <sbol:displayId>Range1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/Constraint1">
    <sbol:displayId>Constraint1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Constraint"/>
    <sbol:restriction rdf:resource="http://sbols.org/v3#meets"/>
    <sbol:subject rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature1"/>
    <sbol:object rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/Modular_Cloning_assembly_plan">
    <sbol:displayId>Modular_Cloning_assembly_plan</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000241"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/Modular_Cloning_assembly_plan/ExternallyDefined1"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature2/Range1">
    <sbol:displayId>Range1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">5</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb">
    <sbol:displayId>part5_in_bb</sbol:displayId>
    <sbol:name>part5_in_bb</sbol:name>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
    <sbol:type rdf:resource="https://identifiers.org/SO:0000987"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000985"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000804"/>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb_seq"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature1"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature2"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3"/>
    <sbol:hasConstraint rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/Constraint1"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5">
    <sbol:displayId>part5</sbol:displayId>
    <sbol:name>part5</sbol:name>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5Sequence"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3/Range1">
    <sbol:displayId>Range1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb">
    <sbol:displayId>part9_in_bb</sbol:displayId>
    <sbol:name>part9_in_bb</sbol:name>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
    <sbol:type rdf:resource="https://identifiers.org/SO:0000987"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000985"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000804"/>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb_seq"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature1"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature2"/>
    <sbol:hasFeature rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3"/>
    <sbol:hasConstraint rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/Constraint1"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9">
    <sbol:displayId>part9</sbol:displayId>
    <sbol:name>part9</sbol:name>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9Sequence"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature2">
    <sbol:displayId>SequenceFeature2</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#SequenceFeature"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000366"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature2/Range1"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature2/Range2"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature2/Range2">
    <sbol:displayId>Range2</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb_seq">
    <sbol:displayId>part9_in_bb_seq</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:elements>tagc</sbol:elements>
    <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3/Range2">
    <sbol:displayId>Range2</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature1">
    <sbol:displayId>SequenceFeature1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#SequenceFeature"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000915"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature1/Range1"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3">
    <sbol:displayId>SequenceFeature3</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#SequenceFeature"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3/Range1"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3/Range2"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature2">
    <sbol:displayId>SequenceFeature2</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#SequenceFeature"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000366"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature2/Range1"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature2/Range2"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3">
    <sbol:displayId>SequenceFeature3</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#SequenceFeature"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3/Range1"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3/Range2"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature2/Range1">
    <sbol:displayId>Range1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9Sequence">
    <sbol:displayId>part9Sequence</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:elements>tagc</sbol:elements>
    <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb_seq">
    <sbol:displayId>part5_in_bb_seq</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:elements>gcta</sbol:elements>
    <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/vectorSequence">
    <sbol:displayId>vectorSequence</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:elements>atcg</sbol:elements>
    <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature1/Range1">
    <sbol:displayId>Range1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5_in_bb/SequenceFeature3/Range1">
    <sbol:displayId>Range1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part5_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature2/Range2">
    <sbol:displayId>Range2</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">0</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/Modular_Cloning_assembly_plan/ExternallyDefined1">
    <sbol:displayId>ExternallyDefined1</sbol:displayId>
    <sbol:name>SapI</sbol:name>
    <rdf:type rdf:resource="http://sbols.org/v3#ExternallyDefined"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000252"/>
    <sbol:definition rdf:resource="http://rebase.neb.com/rebase/enz/SapI.html"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3/Range2">
    <sbol:displayId>Range2</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Range"/>
    <sbol:order rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3</sbol:order>
    <sbol:hasSequence rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb_seq"/>
    <sbol:start rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">0</sbol:start>
    <sbol:end rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">4</sbol:end>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/Insert_Plasmid">
    <sbol:displayId>Insert_Plasmid</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:elements>gcta</sbol:elements>
    <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part5Sequence">
    <sbol:displayId>part5Sequence</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:elements>gcta</sbol:elements>
    <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/Insert">
    <sbol:displayId>Insert</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/Vector_Plasmid">
    <sbol:displayId>Vector_Plasmid</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
    <sbol:hasNamespace rdf:resource="http://sbolstandard.org/testfiles"/>
    <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature1">
    <sbol:displayId>SequenceFeature1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#SequenceFeature"/>
    <sbol:role rdf:resource="https://identifiers.org/SO:0000915"/>
    <sbol:hasLocation rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature1/Range1"/>
  </rdf:Description>
  <rdf:Description rdf:about="http://sbolstandard.org/testfiles/part9_in_bb/Constraint1">
    <sbol:displayId>Constraint1</sbol:displayId>
    <rdf:type rdf:resource="http://sbols.org/v3#Constraint"/>
    <sbol:restriction rdf:resource="http://sbols.org/v3#meets"/>
    <sbol:subject rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature1"/>
    <sbol:object rdf:resource="http://sbolstandard.org/testfiles/part9_in_bb/SequenceFeature3"/>
  </rdf:Description>
</rdf:RDF>`;
  const hardcodedXMLFile = new Blob([xmlFileContent], { type: 'application/xml' });
  useEffect(() => {
    setXmlFile(hardcodedXMLFile);
  }, []);



  const [username, setUsername] = useState('');
  const [instance, setInstance] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Handle login logic here
      console.log('Instance:', instance);
      console.log('Username:', username);
      console.log('Password:', password);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${instance}/login`,
        {email: username, password: password},
        {
          headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(response.data);
      await handleSubmitToSynBioHub(response.data);
      //handleSubmitToSynBioHub(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSubmitToSynBioHub = async (tokenString: string) => {
    try {
      const token = tokenString; // Replace with your actual token
      const id = 'job'+jobId; // Replace with your actual id
      const version = '1'; // Replace with your actual version
      const nameMatch = username ? username.match(/^[^@]+/) : "";
      const name = nameMatch ? nameMatch[0] : ''; // Extract name from email
      const description = 'Uploaded from DAMP Lab Canvas, Job ID: ' + jobId; // Replace with your actual description
      const citations = "14847410,14847410,14847410"; // Replace with your actual citations
      const overwrite_merge = '1'; // Replace with your actual overwrite_merge
      const filename = jobId; // Replace with your actual filename
      const synBioHubURL = instance; // Replace with your actual SynBioHub URL

      const formData = new FormData();
      formData.append('id', id);
      formData.append('version', version);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('citations', citations);
      formData.append('overwrite_merge', overwrite_merge);
      formData.append('file', hardcodedXMLFile);

      console.log('Submitting to SynBioHub:', synBioHubURL);
      const response = await axios.post(`${synBioHubURL}/submit`, formData, {
        headers: {
          'Accept': 'text/plain; charset=UTF-8',
          'X-authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);
      const sbolGraphUriResponse = await axios.get(`${synBioHubURL}/profile`, {
        headers: {
          'Accept': 'text/plain',
          'X-authorization': token,
        },
      });
      const sbolGraphUri = sbolGraphUriResponse.data.graphUri;
      const sbolCollectionUrl = `${sbolGraphUri}/${id}/${id}_collection`;
      console.log('Submission successful:', sbolCollectionUrl);
      window.open(sbolCollectionUrl, '_blank');
    } catch (error) {
      console.error('Error submitting to SynBioHub:', error);
    }
  };

  useEffect(() => {
    console.log(workflows);
  }, [workflows]);

  return (
    <>
    <Box>
      <h1>Design Submitted</h1>
      <p>Job ID: {jobId}</p>
      {showXML && (
        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(xmlFile);
            link.download = `DAMP-Order-${jobId}.xml`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          Download XML File
        </button>
      )}
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                  <label htmlFor="instance">Instance:</label>
                  <input
                type="text"
                id="instance"
                value={instance}
                onChange={(e) => setInstance(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
              </Box>
              <Box sx={{ mb: 2 }}>
                  <label htmlFor="username">Email:</label>
                  <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
              </Box>
              <Box sx={{ mb: 2 }}>
                  <label htmlFor="password">Password:</label>
                  <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
              </Box>
              <Box sx={{ mb: 2 }}>
                <button type="submit" onClick={() => handleLogin()} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                    Upload to SynBioHub
                </button>
              </Box>
            </form>
        </Box>
        <Box>
    </Box>
      <p>The following document serves as a reference for citation in figures within your papers, illustrating your manufacturing design process. Make sure to save the below document</p>
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
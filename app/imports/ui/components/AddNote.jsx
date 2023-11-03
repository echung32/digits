import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Notes } from '../../api/note/Notes';

const bridge = new SimpleSchema2Bridge(Notes.schema);

/* Renders the AddStuff page for adding a document. */
const AddNote = ({ owner, contactId }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { note, createdAt } = data;
    Notes.collection.insert(
      { note, contactId, createdAt, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (
    <Row className="justify-content-center">
      <Col className="text-center"><h2>Add Timestamped Note</h2></Col>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Card>
          <Card.Body>
            <TextField name="note" />
            <SubmitField value="Submit" />
            <ErrorsField />
            <HiddenField name="owner" value={owner} />
            <HiddenField name="contactId" value={contactId} />
            <HiddenField name="createdAt" value={new Date()} />
          </Card.Body>
        </Card>
      </AutoForm>
    </Row>
  );
};

AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
};

export default AddNote;

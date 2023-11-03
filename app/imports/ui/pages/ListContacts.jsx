import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const rdy = subscription.ready();
    const _contacts = Contacts.collection.find({}).fetch();
    return {
      contacts: _contacts,
      ready: rdy,
    };
  }, []);
  const { readyNotes, notes } = useTracker(() => {
    const subscription = Meteor.subscribe(Notes.userPublicationName);
    const rdy = subscription.ready();
    const _notes = Notes.collection.find({}).fetch();
    return {
      notes: _notes,
      readyNotes: rdy,
    };
  }, []);
  return (ready && readyNotes ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact) => (
              <Col key={contact._id}>
                <Contact contact={contact} notes={notes.filter(note => (note.contactId === contact._id))} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;

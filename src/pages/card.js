import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


function CollapsibleCard() {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Card Title 1
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            Content for Card 1
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Card Title 2
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            Content for Card 2
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      {/* Add more cards as needed */}
    </Accordion>
  );
}

export default CollapsibleCard;

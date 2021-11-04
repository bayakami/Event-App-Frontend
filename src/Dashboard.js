import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Add from "./Add";
import Button from 'react-bootstrap/Button';

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => refreshList());
  };

  const updateEvent = (event) => {
    cCurrent(event);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.name}</td>
          <td>{current.location}</td>
          <td>{current.description}</td>
          <td>{current.date}</td>
          <td>
            <Button onClick={() => removeEvent(current._id)} variant="danger">Remove</Button>
            
            <Button onClick={() => updateEvent(current)} type="button" variant="dark">Update</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      Dashboard
      <br />
      <Table className="mx-4" hover size="sm" variant="danger">
        <theevent>
          <tr>
            <th>Event</th>
            <th>Location</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </theevent>
        <tbody>{buildrows()}</tbody>
      </Table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
      />
    </>
  );
}

export default Dashboard;

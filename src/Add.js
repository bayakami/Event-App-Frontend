import React, { useState } from "react";

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEvent(
        props.currentEvent._id,
        e.target.eventName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.date.value
      );
    } else {
      result = props.client.addEvent(e.target.eventName.value, e.target.location.value, e.target.description.value, e.target.date.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentEvent ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Name: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.name}
          name="eventName"
          disabled={disabled}
        />
        <br />
        Location:
        <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.location}
          name="location"
          disabled={disabled}
        />
        <br />
        Description: <br />
        <textarea
          type="text" maxlength="100" rows="6"
          defaultValue={props.currentEvent?.description}
          name="description"
          disabled={disabled}
        />
        <br />
        Date and time: <br />
        <input
          type="datetime-local"
          defaultValue={props.currentEvent?.date}
          name="date"
          disabled={disabled}
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
        {/* <button type="reset" value="Reset">
          Reset
        </button> */}
      </form>
    </>
  );
}

export default Add;

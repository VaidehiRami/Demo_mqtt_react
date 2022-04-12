import React, { useContext, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { QosOption } from './HookMqtt';

const Publisher = ({ publish,connectStatus  }) => {
  const qosOptions = useContext(QosOption);
  const [values, setValues] = useState({
    topic: "testtopic/react",
    payload: "",
    qos: 0,
  });

  const onPublish = (values) => {
    publish(values);
  };

  return (
    <div style={{ width: '25rem',margin:'10px'}}>
      <span>Publisher</span>
      <Card style={{ width: '27rem',margin:'10px'}} >
         <Form style={{margin:'10px'}}> 
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTopic1">
                <Form.Label>Topic</Form.Label>
                <Form.Control type="text"  value={values.topic}
                   onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState, topic: e.target.value,})) }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPort1">
                <Form.Label>QoS</Form.Label>
                <Form.Select value={values.qos}
                      onChange={(e) =>
                        setValues((prevState) => ({
                          ...prevState, qos: e.target.value,}))} >
                         {qosOptions.map((qos) => (
                            <option key={qos.value} value={qos.value}>
                              {qos.label}
                            </option>
                          ))}
                          </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMessage">
                <FloatingLabel controlId="floatingTextarea" label="Message" >
                  <Form.Control as="textarea" placeholder="Leave a message here" value={values.payload} required
                      onChange={(e) =>
                        setValues((prevState) => ({
                          ...prevState, payload: e.target.value,}))}
                  />
                </FloatingLabel>
                  </Form.Group>
                  
            </Row>

            <Button variant="primary"  disabled={!(connectStatus === "Connected")}
              onClick={() => onPublish(values)}>
              Publish
            </Button>
          </Form>
      </Card>
      </div>
  )
}

export default Publisher
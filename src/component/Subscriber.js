import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { QosOption } from "./HookMqtt";

const Subscriber = ({
  sub,
  unSub,
  showUnsub,
  connectStatus,
  getsubscribedTopic,
}) => {
  const qosOptions = useContext(QosOption);
  const [values, setValues] = useState({
    topic: "testtopic/react",
    qos: 0,
  });

  const [subTopic, setSubTopic] = useState([]);

  useEffect(() => {
    getsubscribedTopic(subTopic);
  },[getsubscribedTopic, subTopic]);

  const onSubscribe = (values) => {
    sub(values);
    setSubTopic([...subTopic, values.topic]);
  };

  const handleUnsub = (values) => {
    const newArr = subTopic.filter((item) => item !== values);
    setSubTopic(newArr);
    // unSub(topic);
    unSub(values);
  };

  return (
    <div style={{ width: "27rem", margin: "10px" }}>
      <span>Subscribe</span>
      <Card style={{ width: "27rem", margin: "10px" }}>
        <Form style={{ margin: "10px" }}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTopic">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                value={values.topic}
                onChange={(e) =>
                  setValues((prevState) => ({
                    ...prevState,
                    topic: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridQos">
              <Form.Label>QoS</Form.Label>
              <Form.Select
                value={values.qos}
                onChange={(e) =>
                  setValues((prevState) => ({
                    ...prevState,
                    qos: e.target.value,
                  }))
                }
              >
                {qosOptions.map((qos) => (
                  <option key={qos.value} value={qos.value}>
                    {qos.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button
            variant="primary"
            style={{ margin: "5px" }}
            disabled={!(connectStatus === "Connected")}
            onClick={() => onSubscribe(values)}
          >
            Subscriber
          </Button>
          {/* {showUnsub ? (
               <Button variant="danger"   onClick={() => handleUnsub(values)}>
               Unsubscriber
             </Button>) : null}<br/>           */}
        </Form>
      </Card>
      <div style={{ width: "27rem" }}>
        <Col style={{ width: "27rem", margin: "10px" }}>
          <span>Subscribe Topic </span>
          <br />
          {subTopic.length && subTopic.length > 0
            ? subTopic.map((topic, index) => (
                <Card key={index} style={{ width: "20rem", margin: "10px" }}>
                  <div>
                      <div style={{float:'left', margin: "8px"}}>
                          <p>{topic}</p>
                      </div>                  
                      <div style={{float:'right', margin: "8px"}}>
                      <i
                        className="bi bi-x"
                        role="button"
                        onClick={() => handleUnsub(topic)}
                        ></i>

                      </div>

                  </div>
                  
                  
                </Card>
              ))
            : null}
        </Col>
      </div>
    </div>
  );
};

export default Subscriber;

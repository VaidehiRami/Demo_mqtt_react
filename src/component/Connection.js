import React,{useState} from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';


const Connection = ({ connect, disconnect, connectBtn }) => {
    const [values, setValues] = useState({
      host: "broker.emqx.io",
      port: 8083,
      clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
      username: "",
      password: "",
    });
    
    const onConnect = (values) => {
      const { host, clientId, port, username, password } = values;
      const url = `ws://${host}:${port}/mqtt`;
      const options = {
        keepalive: 30,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
        rejectUnauthorized: false,
      };
      options.clientId = clientId;
      options.username = username;
      options.password = password;
      connect(url, options);
    };
    

    const handleDisconnect = () => {
      disconnect();
      console.log('click disconnect',values);
    };



  return (
    <div style={{ width: '25rem',margin:'10px'}}>
       <span>Connection</span>
       <Card style={{ width: '25rem',margin:'10px'}} >
         <Form style={{margin:'10px'}}> 
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridHost">
                <Form.Label>Host</Form.Label>
                <Form.Control type="text"   value={values.host}
                  onChange={(e) =>
                    setValues((prevState) => ({ ...prevState, host: e.target.value }))}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPort">
                <Form.Label>Port</Form.Label>
                <Form.Control type="text"  value={values.port}
                  onChange={(e) =>
                    setValues((prevState) => ({ ...prevState, port: e.target.value }))}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridClientid">
              <Form.Label>ClientId</Form.Label>
              <Form.Control  type="text"  value={values.clientId}
                onChange={(e) =>
                  setValues((prevState) => ({ ...prevState, clientId: e.target.value }))} 
              />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUserName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text"  placeholder="User Name" value={values.username}
                       onChange={(e) =>
                        setValues((prevState) => ({ ...prevState, username: e.target.value }))}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"   placeholder="Password" value={values.password}
                       onChange={(e) =>
                        setValues((prevState) => ({ ...prevState, password: e.target.value }))}
                    />
                  </Form.Group>   
            </Row>
            <Button variant="primary"  style={{margin:'5px'}} onClick={() => onConnect(values)}>
              {connectBtn}
            </Button>
            <Button variant="danger"  onClick={handleDisconnect}>
              Disconnect
            </Button>
          </Form>
      </Card>
    </div>
  )
}

export default Connection
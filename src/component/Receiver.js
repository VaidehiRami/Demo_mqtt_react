import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';

const Receiver = ({ payload }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }
  }, [payload]);

  return (
    <div >
    <Col>
      <span>Receiver</span>
      {messages.map((m, index) => (
        <Card key={index} style={{ width: '27rem',margin:'10px'}} >
          <div><p style={{textAlign:'center'}}>Topic : {m.topic}</p></div> 
          <div><p style={{textAlign:'center'}}>{m.message}</p></div> 
        </Card>
      ))}
    </Col>
    </div>
    
  );
};

export default Receiver;
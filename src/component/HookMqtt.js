import React, { createContext, useEffect, useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
import Connection from './Connection';
import Publisher from './Publisher';
import Receiver from './Receiver';
import Subscriber from './Subscriber';
import mqtt from "mqtt/dist/mqtt";
import "bootstrap/dist/css/bootstrap.min.css";

export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const HookMqtt = () => {
    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState("Connect");
    const [subTopic, setSubTopic] = useState([]);

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus("Connecting");
        setClient(mqtt.connect(host, mqttOption));
        console.log('clicking');
    };

    useEffect(() => {
        if (client) {
        client.on("connect", () => {
            setConnectStatus("Connected");
        });
        client.on("error", (err) => {
            console.error("Connection error: ", err);
            client.end();
        });
        client.on("reconnect", () => {
            setConnectStatus("Reconnecting");
        });
        client.on("message", (topic, message) => {
            const payload = { topic, message: message.toString() };
            setPayload(payload);
        });
        }
    }, [client]);

    const mqttDisconnect = () => {
        if (client) {
        client.end(() => {
            setConnectStatus("Connect");
        });
        }
    };

    const mqttPublish = (context) => {
        if (client) {
        const { topic, qos, payload } = context;
        client.publish(topic, payload, { qos }, (error) => {
            if (error) {
            console.log("Publish error: ", error);
            }
        });
        }
    };

    const mqttSub = (subscription) => {
        if (client) {
        const { topic, qos } = subscription;
        client.subscribe(topic, { qos }, (error) => {
            if (error) {
            console.log("Subscribe to topics error", error);
            return;
            }
            setIsSub(true);
        });
        }
    };
    const getsubscribedTopic = (topic) => {
        setSubTopic(topic);
      };

      const mqttUnSub = (subscription) => {
        if (client) {
          client.unsubscribe(subscription, (error) => {
            if (error) {
              console.log("Unsubscribe error", error);
              return;
            }
          });
        }
      };

  return (
    <>
      <div className="d-flex justify-content-around">
        <div> <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
        /></div>
        <div >
            <QosOption.Provider value={qosOption}> 
              <Subscriber sub={mqttSub} unSub={mqttUnSub} 
                                  showUnsub={isSubed}  
                                  connectStatus={connectStatus}
                                  getsubscribedTopic={getsubscribedTopic}/>
           </QosOption.Provider>
            
        </div>
          <div> 
              <QosOption.Provider value={qosOption}>
                  <Publisher  publish={mqttPublish} connectStatus={connectStatus}/>
                    <Receiver payload={payload} subTopic={subTopic}/>
              </QosOption.Provider>
                          
          </div>
      </div>
        {/* <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
        />
      <Container style={{marginLeft:'10px'}}>
          
                <QosOption.Provider value={qosOption}>
                <div className="p-2 flex-grow-1 bd-highlight">
                <Col sm><Subscriber sub={mqttSub} unSub={mqttUnSub} 
                            showUnsub={isSubed}  
                            connectStatus={connectStatus}
                            getsubscribedTopic={getsubscribedTopic}/>
                </Col>
                        <Col sm>
                                <Publisher  publish={mqttPublish}   connectStatus={connectStatus}/>
                                <Receiver payload={payload}
                                    subTopic={subTopic}/>
                        </Col>
                </div>
                </QosOption.Provider>
      
      </Container> */}
    </>
  )
}

export default HookMqtt;
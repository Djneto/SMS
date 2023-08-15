import { Text, TextInput } from "react-native"
import styled from 'styled-components/native';
import { useState } from "react";
import SendSMS, { AndroidSuccessTypes } from 'react-native-sms'
import Communications from 'react-native-communications';

export const Interface: React.FC = () => {
  const [ message, setMessage ] = useState<string>('');
  const [newTarget, setNewTarget ] = useState<string>('');
  const [ targets, setTargets ] = useState<Array<string>>([]);
  const [status, setStatus] = useState<string | null>(null);

  const successTypes: AndroidSuccessTypes[] = ["all", "inbox", "sent", "draft", "outbox", "failed", "queued"];
  const sendMessage = async () => {
    SendSMS.send({
      body: message,
      recipients: targets,
      successTypes: successTypes,
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
  
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + ' error: ' + error);
  
    });
  }
  
  return (
    <Container>
      <Title>SMS</Title>
        <BoxTarget>
          <SetTargetButton onPress={() => setTargets([])}><A>X</A></SetTargetButton>
          <SetTarget keyboardType="numeric" placeholder="Target" value={newTarget} onChangeText={text => setNewTarget(text)}/>
          <SetTargetButton onPress={() => setTargets([...targets, newTarget])}><A>»</A></SetTargetButton>
        </BoxTarget>
        {targets.length == 0 
          ? 
          []
          :
          <List>
          {targets.map((item, index) => 
            <T key={index}>    {item},    </T>
          )}
        </List>
        }
      <TextArea 
        multiline={true} 
        placeholder="Message..." 
        onChangeText={text => setMessage(text)}>
      </TextArea>
      <Button onPress={() => sendMessage()}>
        <Label>SEND</Label>
      </Button>
      {status && 
        <BoxStatus>
          <Status>
            <StatusText>{status}</StatusText>
          </Status>
          <StatusText2>18:30</StatusText2>
        </BoxStatus>
      } 
    </Container>
  )
}

const T = styled.Text`
  color: black;
  font-size: 14px;
`;

const List = styled.View`
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  margin-top: 20px;

  border-bottom-width: 1px;
  border-bottom-color: black;
  border-left-width: 1px;
  border-left-color: black;

  border-top-width: 1px;
  border-top-color: black;
  border-right-width: 1px;
  border-right-color: black;
`;

const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  background: white;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: black;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const BoxTarget = styled.View`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px;
`;

const SetTarget = styled.TextInput`
  align-items: center;
  font-size: 14px;
  flex: 1;
  height: 40px;
  text-align: center;
`;

const SetTargetButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: black;
  border: 1px;
  align-items: center;
  justify-content: center;
`;

const A = styled.Text`
  color: white;
`;

const TextArea = styled.TextInput`
  font-size: 14px;
	text-align-vertical: top;
  width: 90%;
  height: 128px;
  margin: 20px 0 ;

  border-bottom-width: 1px;
  border-bottom-color: black;
  border-left-width: 1px;
  border-left-color: black;

  border-top-width: 1px;
  border-top-color: black;
  border-right-width: 1px;
  border-right-color: black;
  
  color: black;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 52px;

  elevation: 3;
  background-color: black;
`;

const BoxStatus = styled.View`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const Status = styled.View`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  background-color: black;
  width: 128px;
  height: 25px;
`;

const StatusText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const StatusText2 = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;


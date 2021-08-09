import React, { useState, useContext, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Entypo';
import Close from 'react-native-vector-icons/EvilIcons';
import { getMyPenalty } from '../firebase';
import { Header, PageTitle } from './MypageStyle';
import { UserContext, ProgressContext } from '../contexts';
import { Background, Card } from '../notice/NoticeStyle';

import {
  CloseWrapper,
  BackgroundWrapper,
  Body,
  Check,
  CheckWrapper,
  Guidance,
  GuidanceWrapper,
  RowWrapper,
  PasswordCheck,
  Password,
  ButtonWrapper,
} from './MyPenaltyStyle';

const MyPenalty = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { myPenalty } = useContext(UserContext);
  const [dataArr, setDataArr] = useState([]);
  const tableHeader = ['날짜', '벌점 부여 사유', '벌점'];

  useEffect(() => {
    let dataObj = [];
    const makeArray = async (obj) => {
      const arr = [];
      await obj.forEach((item, index) => {
        dataObj = [];
        dataObj.push(item.date);
        dataObj.push(item.reason);
        dataObj.push(item.points);
        arr.push(dataObj);
      });

      return arr;
    };
    const unsubscribe = navigation.addListener('focus', async () => {
      spinner.start();
      const dataArr = await makeArray(myPenalty);

      setDataArr(dataArr);

      spinner.stop();
    });

    return unsubscribe;
  }, [navigation, myPenalty, spinner]);

  return (
    <UserContext.Consumer>
      {({ profileInfo }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BackgroundWrapper>
            <Header>
              <RowWrapper>
                <PageTitle marginTop={0} marginLeft={0}>
                  벌점 내역
                </PageTitle>
                <CloseWrapper onPress={() => navigation.navigate('Mypage')}>
                  <Close name="close" size={20} color="#707070" />
                </CloseWrapper>
              </RowWrapper>
            </Header>
            <Body>
              <Card>
                <View style={styles.container}>
                  <ScrollView style={styles.dataWrapper}>
                    <Table
                      borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}
                    >
                      <Row
                        data={tableHeader}
                        style={styles.head}
                        textStyle={styles.text}
                      />
                      <Rows data={dataArr} textStyle={styles.text} />
                    </Table>
                  </ScrollView>
                  <RowWrapper>
                    <PageTitle marginTop={0} marginLeft={0}>
                      누적 벌점 총 {profileInfo.myPenaltySum} 점
                    </PageTitle>
                  </RowWrapper>
                </View>
              </Card>
            </Body>
          </BackgroundWrapper>
        </TouchableWithoutFeedback>
      )}
    </UserContext.Consumer>
  );
};
const styles = StyleSheet.create({
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#ffffff',
  },
  bottomShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#d4d2cf',
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
});
export default MyPenalty;

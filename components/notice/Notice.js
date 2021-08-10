import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { StyleSheet, View, ScrollView } from 'react-native';

import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

import { UserContext, ProgressContext, UserProvider } from '../contexts';

import {
  Background,
  Card,
  Header,
  PageTitle,
  ProfileWrapper,
  ProfileContainer,
  ProfileImageContainer,
  ProfileTextContainer,
  CustomText,
  ButtonWrapper,
  RowWrapper,
} from './NoticeStyle';

const Notice = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { notice } = useContext(UserContext);

  //  title: '', 제목
  // content: '', 내용
  // date: '', 날짜(2021.02.11) 문자열
  // afterDue: '', 오늘 기준으로 due가 지났는지 숫자(지났으면 0, 안지났으면 1, 미설정이면 2==평생 안지남)
  // due: '', 날짜(2021.02.11) 문자열 - afterDue를 사용하면 사용할 필요는 없을 듯.
  // highlight: '', 강조 여부 숫자(0 강조, 1 강조x)

  // const { notice, noticeAfterDue } = await getNoticeArray();
  // notice: afterDue 안지난 것(afterDue == 1 or 2)
  // noticeAfterDue: due 지난것(afterDue == 0)
  // 각 배열에서 이미 orderBy로 hightlight desc(true가 먼저), date desc 처리 되었습니다!
  // 그래서 notice(highlight == 0 인 것 색깔 강조 - 이미 순서 핀 처리는 되어있음.) => noticeAfterDue(희끄무리하게 표현?) 하면 될 것 같습니다!

  const [dataArr, setDataArr] = useState([]);
  const [dataArrAfterDue, setDataArrAfterDue] = useState([]);

  useEffect(() => {
    let dataObj = [];
    const makeArray = async (obj) => {
      const arr = [];
      await obj.forEach((item, index) => {
        dataObj = [];
        dataObj.push(index + 1);
        dataObj.push(item.title);
        dataObj.push(item.content);
        dataObj.push(item.date);
        dataObj.push(item.highlight);
        dataObj.push(item.due);
        dataObj.push(item.afterDue);
        arr.push(dataObj);
      });

      return arr;
    };
    const unsubscribe = navigation.addListener('focus', async () => {
      spinner.start();
      const dataArr = await makeArray(notice.noticeBeforeDue);
      const dataArrAfterDue = await makeArray(notice.noticeAfterDue);

      setDataArr(dataArr);
      setDataArrAfterDue(dataArrAfterDue);

      spinner.stop();
    });

    return unsubscribe;
  }, [navigation, notice, spinner]);

  return (
    <Background>
      <Card value={0.2}>
        <Header>
          <RowWrapper>
            <PageTitle>공지사항</PageTitle>
          </RowWrapper>
        </Header>
      </Card>
      <Card>
        <View style={styles.container}>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Rows data={dataArr} textStyle={styles.text} />
            </Table>
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: 'grey',
              }}
            >
              <Rows data={dataArrAfterDue} textStyle={styles.text} />
            </Table>
          </ScrollView>
        </View>
      </Card>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
});

export default Notice;

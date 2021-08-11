import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';

import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

import { UserContext, ProgressContext } from '../contexts';

import {
  Background,
  Card,
  Header,
  PageTitle,
  ContentWrapper,
  RowWrapper,
  CustomText,
  TitleWrapper,
  IconWrapper,
  DateWrapper,
  Content,
} from './NoticeStyle';
import { NoticeIcon } from '../../assets/Svgs';

const Notice = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { notice } = useContext(UserContext);
  const { setNotice } = useContext(UserContext);

  React.useEffect(
    () =>
      navigation.addListener('blur', () => {
        notice.noticeBeforeDue.map((content) => exitHandler(content.id));
        // notice.noticeAfterDue.map((content) => exitHandler(content.id));
      }),
    []
  );
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
        if (item.isChecked) {
          dataObj.push(1);
        } else {
          dataObj.push(0);
        }

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

    const changeChecked = async (index) => {
      notice.noticeBeforeDue[index].isChecked = true;
    };

    const unsubscribe = navigation.addListener('focus', async () => {
      spinner.start();
      const newNotice = notice;
      await changeChecked(0);
      console.log('notice', notice.noticeBeforeDue[0].isChecked);
      const dataArr = await makeArray(notice.noticeBeforeDue);
      const dataArrAfterDue = await makeArray(notice.noticeAfterDue);

      setDataArr(dataArr);
      setDataArrAfterDue(dataArrAfterDue);

      console.log(newNotice.noticeBeforeDue[0].isChecked);

      spinner.stop();
    });

    return unsubscribe;
  }, [navigation, notice, spinner]);

  const checkBeforeHandler = (index, isChecked) => {
    const content = { ...notice.noticeBeforeDue[index], isChecked: !isChecked };

    setNotice({
      ...notice,
      noticeBeforeDue: [
        ...notice.noticeBeforeDue.slice(0, index),
        content,
        ...notice.noticeBeforeDue.slice(index + 1),
      ],
    });
  };

  const checkAfterHandler = (index, isChecked) => {
    const content = { ...notice.noticeAfterDue[index], isChecked: !isChecked };
    setNotice({
      ...notice,
      noticeAfterDue: [
        ...notice.noticeAfterDue.slice(0, index),
        content,
        ...notice.noticeAfterDue.slice(index + 1),
      ],
    });
  };

  const exitHandler = (index) => {
    const content = { ...notice.noticeBeforeDue[index], isChecked: false };
    setNotice({
      ...notice,
      noticeBeforeDue: [
        ...notice.noticeBeforeDue.slice(0, index),
        content,
        ...notice.noticeBeforeDue.slice(index + 1),
      ],
    });
  };
  return (
    <Background>
      <Card value={1}>
        <Header>
          <RowWrapper>
            <PageTitle>공지사항</PageTitle>
          </RowWrapper>
        </Header>
      </Card>
      <Card value={6}>
        <ScrollView>
          {notice.noticeBeforeDue.map((content) => (
            <View key={content.id} value={content}>
              <ContentWrapper
                onPress={() => {
                  checkBeforeHandler(content.id, content.isChecked);
                }}
              >
                <TitleWrapper>
                  <IconWrapper>
                    <NoticeIcon />
                  </IconWrapper>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.61)}
                    color="#1D1D1D"
                  >
                    {content.title}
                  </CustomText>
                </TitleWrapper>
                <DateWrapper>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.2)}
                    color="#ADADAD"
                  >
                    {content.date}
                  </CustomText>
                </DateWrapper>
              </ContentWrapper>
              <ScrollView>
                <Content visible={content.isChecked}>
                  <CustomText font="Medium" size="12" color="#1D1D1D">
                    {content.content}
                  </CustomText>
                </Content>
              </ScrollView>
            </View>
          ))}
          {notice.noticeAfterDue.map((content) => (
            <View key={content.id} value={content}>
              <ContentWrapper
                onPress={() => {
                  checkAfterHandler(content.id, content.isChecked);
                }}
              >
                <TitleWrapper>
                  <IconWrapper>
                    <NoticeIcon />
                  </IconWrapper>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.61)}
                    color="#1D1D1D"
                  >
                    {content.title}
                  </CustomText>
                </TitleWrapper>
                <DateWrapper>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.2)}
                    color="#ADADAD"
                  >
                    {content.date}
                  </CustomText>
                </DateWrapper>
              </ContentWrapper>
              <ScrollView>
                <Content visible={content.isChecked}>
                  <CustomText font="Medium" size="12" color="#1D1D1D">
                    {content.content}
                  </CustomText>
                </Content>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </Card>
    </Background>
  );
};

export default Notice;

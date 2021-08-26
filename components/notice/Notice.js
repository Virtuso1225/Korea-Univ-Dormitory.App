import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { UserContext, ProgressContext } from '../contexts';
import {
  Background,
  Card,
  Header,
  PageTitle,
  ContentWrapper,
  RowWrapper,
  TitleWrapper,
  IconWrapper,
  DateWrapper,
  Content,
  Body,
} from './NoticeStyle';
import { NoticeIcon } from '../../assets/Svgs';
import CustomText from '../theme/CustomTextStyle';

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
      <Body>
        <Card value={1}>
          <ScrollView>
            {notice.noticeBeforeDue.map((content) => (
              <View key={content.id} value={content}>
                <ContentWrapper
                  color="#F9F7F4"
                  opacity="1"
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
                      color={content.highlight ? '#850000' : '#1D1D1D'}
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
                  color="#F0EDE9"
                  opacity="0.5"
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
      </Body>
    </Background>
  );
};

export default Notice;

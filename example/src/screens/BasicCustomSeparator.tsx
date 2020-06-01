import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import StickyItemFlatList from '@gorhom/sticky-item';
import DummyItem from '../components/dummy-item';
import BasicSticky from '../components/basic-sticky';

const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

export const STORY_WIDTH = 200;
export const STORY_HEIGHT = 100;
const SEPARATOR_SIZE = 10;
const BORDER_RADIUS = 0;

const BasicCustomSeparator = () => {
  const { params } = useRoute();
  // @ts-ignore
  const { title } = params;

  // styles
  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 2,
    backgroundColor: 'white',
  };

  // methods
  const handleStickyItemPress = () => Alert.alert('Sticky Item Pressed');

  // render
  const renderItem = ({ index }: ListRenderItemInfo<{}>) => (
    <TouchableOpacity onPress={() => Alert.alert(`Item ${index} Pressed`)}>
      <DummyItem
        index={index}
        borderRadius={BORDER_RADIUS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
        backgroundColor={'#dfdfdf'}
      />
    </TouchableOpacity>
  );

  const renderSeparator = ({ size }: { size: number }) => {
    return (
      <View style={{ width: size }}>
        <View style={styles.separatorLine} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>{title}</Text>
      <View style={containerStyle}>
        <StickyItemFlatList
          itemWidth={STORY_WIDTH}
          itemHeight={STORY_HEIGHT}
          separatorSize={SEPARATOR_SIZE}
          borderRadius={BORDER_RADIUS}
          stickyItemWidth={36}
          stickyItemHeight={36}
          stickyItemBackgroundColors={['#F8F8FA', '#2d88ff']}
          stickyItemContent={BasicSticky}
          onStickyItemPress={handleStickyItemPress}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#CACACD',
  },
  text: {
    marginHorizontal: SEPARATOR_SIZE * 2,
    marginBottom: SEPARATOR_SIZE,
    fontSize: 43,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    textTransform: 'uppercase',
    color: '#2d88ff',
  },
  buttons: {
    marginTop: SEPARATOR_SIZE,
    marginHorizontal: SEPARATOR_SIZE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  separatorLine: {
    position: 'absolute',
    left: '50%',
    top: '25%',
    height: '50%',
    width: 1,
    opacity: 0.5,
    backgroundColor: '#CACACD',
  },
});

export default BasicCustomSeparator;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Dash from 'react-native-dash';

const DIVIDER_BORDER_COLOR = '#4d5963';
const DEFAULT_DIVIDER_SIZE = 'large';
const DEFAULT_DIVIDER_ALIGNMENT = 'center';
const DEFAULT_ACCESSIBILITY_LABEL = 'someAccessibilityLabel';

type DividerSize = 'small' | 'medium' | 'large';
type DividerAlignment = 'left' | 'center' | 'right';
type DividerType = string;

interface DividerViewerProps {
    data: { //required data
      config: {
          size: DividerSize;
          alignment: DividerAlignment;
          textWrap?: string;
      }
      type: DividerType;
    }
    containerStyle?: any; //override container styles
    dividerStyle?: any; //override size styles
    accessibilityLabel?: string; // override? accessibilityLabel
};

const DividerViewer: React.FC<DividerViewerProps> = (props) => {
    const {data: {config, type}, containerStyle, dividerStyle, accessibilityLabel} = props;
    const {size, alignment} = config;

    const renderDivider = () => {
        switch (type) {
        case 'single':
            return <View style={style.horizontalLine} testID={testIDs.DIVIDER_SINGLE}/>;
        case 'double':
            return [
            <View key="top" style={[style.horizontalLine, style.topLine]} testID={testIDs.DIVIDER_DOUBLE_TOP}/>,
            <View key="bottom" style={style.horizontalLine} testID={testIDs.DIVIDER_DOUBLE_BOTTOM}/>,
            ];
        case 'dashed':
            return <Dash dashGap={4} dashThickness={1} testID={testIDs.DIVIDER_DASHED}/>;
        case 'dotted':
            return <Dash dashGap={4} dashLength={1} dashThickness={1} testID={testIDs.DIVIDER_DOTTED}/>;
        default:
            return null;
        }
    };

    return (
        <View style={[style.root, style[alignment], containerStyle]}>
        <View style={[style[size], dividerStyle]}
            accessibilityLabel={accessibilityLabel ?? DEFAULT_ACCESSIBILITY_LABEL} 
            accessible 
            testID={testIDs.DIVIDER_IN_VIEWER}> 
            {/* this testID should be able to be overriden */}
          {renderDivider()}
        </View>
      </View>
    )
};

export default DividerViewer;

const style = StyleSheet.create({
    root: {
      marginTop: 18,
      marginBottom: 18,
      marginLeft: 15,
      marginRight: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    horizontalLine: {
      width: '100%',
      borderColor: DIVIDER_BORDER_COLOR,
      borderTopWidth: 1,
    },
    topLine: {
      marginBottom: 6,
    },
    large: {
      width: '100%',
    },
    medium: {
      width: '50%',
    },
    small: {
      width: '25%',
    },
    left: {
      justifyContent: 'flex-start',
    },
    right: {
      justifyContent: 'flex-end',
    },
    center: {
      justifyContent: 'center',
    },
  });
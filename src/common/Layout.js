/**
 * Created by asus on 2018/12/14.
 */
import React, {Component} from 'react';
import { View, Text, ScrollView } from 'react-native';


export class Layout extends Component<Props> {

  render() {
    const { children, style, textStyle, ...props} = this.props;
    return (
      <View style={[{ flex: 1}, style]} {...props}>
        {
          typeof children === 'string' ? (
            <Text style={textStyle}>{children}</Text>
          ) : (
            children
          )
        }
      </View>
    )
  }
}

export class Row extends Component<Props> {
  render() {
    const { children, style, textStyle, ...props} = this.props;
    return (
      <View style={[{ flexDirection: 'row'}, style]} {...props}>
        {
          typeof children === 'string' ? (
            <Text style={textStyle}>{children}</Text>
          ) : (
            children
          )
        }
      </View>
    )
  }
}

export class Left extends Component<Props> {
  render() {
    const { children, style, textStyle, ...props} = this.props;
    return (
      <View style={[{ flexDirection: 'row'}, style]} {...props}>
        {
          typeof children === 'string' ? (
            <Text style={textStyle}>{children}</Text>
          ) : (
            children
          )
        }
      </View>
    )
  }
}

export class Right extends Component<Props> {
  render() {
    const { children, style, textStyle, ...props} = this.props;
    return (
      <View style={[{ justifyContent: 'flex-end', flexDirection: 'row'}, style]} {...props}>
        {
          typeof children === 'string' ? (
            <Text style={textStyle}>{children}</Text>
          ) : (
            children
          )
        }
      </View>
    )
  }
}

export class Body extends Component<Props> {
  render() {
    const { children, style, textStyle, ...props} = this.props;
    return (
      <View style={[{ justifyContent: 'center', alignItems: 'center'}, style]} {...props}>
        {
          typeof children === 'string' ? (
            <Text style={textStyle}>{children}</Text>
          ) : (
            children
          )
        }
      </View>
    )
  }
}

export class Content extends Component<Props> {
  render() {
    const { children, style, ...props} = this.props;
    return (
      <ScrollView {...props}>
        {
          children
        }
      </ScrollView>
    )
  }
}

Layout.Row = Row;
Layout.Left = Left;
Layout.Right = Right;
Layout.Body = Body;
Layout.Content = Content;

export default Layout;


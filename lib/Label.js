import React, { Component } from 'react'
import { Text, Animated } from 'react-native'
import PropTypes from 'prop-types'

export default class extends Component {
  static propTypes = {
    label: PropTypes.string,
    labelDuration: PropTypes.number,
    labelColor: PropTypes.string,
    labelActiveColor: PropTypes.string,
    labelActiveScale: PropTypes.number,
    labelActiveTop: PropTypes.number
  }

  static defaultProps = {
    labelDuration: 200,
    labelColor: 'gray',
    labelActiveColor: '#3f51b5',
    labelActiveScale: 0.8,
    labelActiveTop: -18
  }

  constructor(props) {
    super(props)

    let { hasValue, focused, labelActiveScale, labelActiveTop } = props

    this.state = {
      animatedScale: new Animated.Value(hasValue || focused ? labelActiveScale : 1),
      animatedTranslate: new Animated.Value(hasValue || focused ? labelActiveTop : 0)
    }
  }

  componentWillReceiveProps = nextProps => {
    let { animatedScale, animatedTranslate } = this.state
    let { labelDuration, labelActiveScale, labelActiveTop, hasValue, focused } = nextProps

    if (this.props.hasValue !== hasValue || this.props.focused !== focused) {
      Animated.timing(animatedScale, {
        toValue: hasValue || focused ? labelActiveScale : 1,
        duration: labelDuration,
        useNativeDriver: true
      }).start()

      Animated.timing(animatedTranslate, {
        toValue: hasValue || focused ? labelActiveTop : 0,
        duration: labelDuration,
        useNativeDriver: true
      }).start()
    }
  }

  render() {
    let {
      hasValue,
      focused,
      paddingTop,
      paddingRight,
      paddingLeft,
      activeColor,
      fontSize,
      fontFamily,
      fontWeight,
      label,
      labelColor,
      labelActiveColor,
      error,
      errorColor
    } = this.props
    let { animatedScale, animatedTranslate } = this.state

    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: (hasValue || focused) && 10 || paddingTop,
          transform: [{ translateY: animatedTranslate }]
        }}
        numberOfLines={1}>
        <Text
        numberOfLines={1}
          style={{
            top: 0,
            paddingRight,
            paddingLeft,
            color: error ? errorColor : focused ? activeColor || labelActiveColor : labelColor,
            fontFamily,
            fontSize: 13,
            fontWeight: "400",
            // fontSize,
            // fontWeight
          }}>
          {label}
        </Text>
      </Animated.View>
    )
  }
}

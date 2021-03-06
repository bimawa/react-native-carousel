'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  ScrollView,
} = React;

var Carousel = React.createClass({

  getDefaultProps() {
    return {
      hideIndicators: false,
      indicatorColor: '#000000',
      inactiveIndicatorColor: '#999999',
      indicatorAtBottom: true,
      width: 375
    };
  },

  getInitialState() {
    return {
      activePage: 0
    };
  },

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView ref="scrollview"
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={this.onAnimationEnd}
        >
          {this.props.children}
        </ScrollView>
        {this.renderPageIndicator()}
      </View>
    );
  },
  indicatorPressed(ind){
    this.setState({
      activePage:ind
    });

    this.refs.scrollview.scrollTo(0,ind*this.props.width);
  },

  renderPageIndicator() {
    if (this.props.hideIndicators === true) {
      return null;
    }

    var indicators = [],
        indicatorStyle = this.props.indicatorAtBottom ? styles.pageIndicatorBottom : styles.pageIndicatorTop,
        style, position;

    position = {
      width: this.props.children.length * 15,
    };
    position.left = (this.props.width - position.width) / 2;

    for (var i=0; i< this.props.children.length; i++) {
      style = i === this.state.activePage ? { color: this.props.indicatorColor } : { color: this.props.inactiveIndicatorColor };
      indicators.push(<Text style={style} key={i} onPress={this.indicatorPressed.bind(this,i)}>&bull;</Text>);
    }

    return (
      <View style={[styles.pageIndicator, position, indicatorStyle]}>
        {indicators}
      </View>
    );
  },

  onAnimationEnd(e) {
    var activePage = e.nativeEvent.contentOffset.x / this.props.width;
    this.setState({
      activePage: activePage
    });
    if (this.props.onPageChange) {
      this.props.onPageChange(activePage);
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pageIndicator: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  pageIndicatorTop: {
    top: 20
  },
  pageIndicatorBottom: {
    bottom:20
  }
});

module.exports = Carousel;

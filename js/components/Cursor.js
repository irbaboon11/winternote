/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    ViewStore = require('../stores/ViewStore'),
    NoteConstants = require('../constants/NoteConstants'),
    _ = require('lodash');

module.exports = React.createClass({
  timeoutId: null,
  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    ViewStore.addChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
    this.setTimer();
  },

  componentWillUnmount: function() {
    ViewStore.removeChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
    clearTimeout(this.timeoutId);
  },

  setTimer: function() {
    this.timeoutId = setTimeout(function() {
      var current = this.getDOMNode().style.display;
      if (current === 'none')
        this.getDOMNode().style.display = 'block';
      else
        this.getDOMNode().style.display = 'none';
      this.setTimer();
    }.bind(this), 500);
  },

  render: function () {
    var point = this.state.cursor;
    // TODO refactor editingArea rect
    var editingArea = document.getElementsByClassName('note-editing-area')[0];
    var rect = editingArea && editingArea.getBoundingClientRect();

    var style;
    if (this.state.cursor) {
      style = {
        display: 'block',
        left: this.state.cursor.left - rect.left - 2,
        top: this.state.cursor.top - rect.top
      };
    } else {
      style = {
        display: 'none'
      };
    }

    // TODO addClass note-cursor-blink after 500ms for blink cursor
    return <div className='note-cursor' style={style}></div>;
  },

  _onChange: function () {
    this.setState(this._getState());
  },

  _getState: function () {
    var data = ViewStore.getData();

    return {
      cursor: data.cursor
    };
  }
});

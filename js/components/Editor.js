/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    NoteAction = require('../actions/NoteAction'),
    dom = require('../utils/dom'),
    _ = require('lodash'),
    Document = require('./Document'),
    Cursor = require('./Cursor'),
    InputEditor = require('./InputEditor');

module.exports = React.createClass({
  _offsetFromBoundaryPoint: function (boundaryPoint) {
    // TODO find document offset
    //  - node -> react component -> state object -> document offset
    console.log(boundaryPoint.container, boundaryPoint.offset);
    return 1;
  },

  handleMouseDown: function (e) {
    var self = this;
    var inputEditor = this.refs.inputEditor;

    NoteAction.selectStart(
      self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
    );

    var moveHandler = function (e) {
      NoteAction.selectEnd(
        self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
      );
    };

    var upHandler = function (e) {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);

      NoteAction.selectEnd(
        self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
      );

      inputEditor.focus();
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  },

  render: function () {
    return <div className='note-editor' onMouseDown={this.handleMouseDown}>
      <Cursor/>
      <Document document={this.props.document}/>
      <InputEditor ref='inputEditor'/>
    </div>;
  }
});

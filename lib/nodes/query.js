
/*!
 * Stylus - Query
 * Copyright (c) Automattic <developer.wordpress.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

module.exports = class Query extends Node {
  /**
   * Initialize a new `Query`.
   *
   * @api public
   */

  constructor() {
    super();
    this.nodes = [];
    this.type = '';
    this.predicate = '';
  }

  /**
   * Return a clone of this node.
   * 
   * @return {Node}
   * @api public
   */

  clone(parent) {
    var clone = new Query;
    clone.predicate = this.predicate;
    clone.type = this.type;
    for (var i = 0, len = this.nodes.length; i < len; ++i) {
      clone.push(this.nodes[i].clone(parent, clone));
    }
    clone.lineno = this.lineno;
    clone.column = this.column;
    clone.filename = this.filename;
    return clone;
  };

  /**
   * Push the given `feature`.
   *
   * @param {Feature} feature
   * @api public
   */

  push(feature) {
    this.nodes.push(feature);
  };

  /**
   * Return resolved type of this query.
   *
   * @return {String}
   * @api private
   */

  get resolvedType() {
    if (this.type) {
      return this.type.nodeName
        ? this.type.string
        : this.type;
    }
  };

  /**
   * Return resolved predicate of this query.
   *
   * @return {String}
   * @api private
   */

  get resolvedPredicate() {
    if (this.predicate) {
      return this.predicate.nodeName
        ? this.predicate.string
        : this.predicate;
    }
  };

  /**
   * Merges this query with the `other`.
   *
   * @param {Query} other
   * @return {Query}
   * @api private
   */

  merge(other) {
    var query = new Query
      , p1 = this.resolvedPredicate
      , p2 = other.resolvedPredicate
      , t1 = this.resolvedType
      , t2 = other.resolvedType
      , type, pred;

    // Stolen from Sass :D
    t1 = t1 || t2;
    t2 = t2 || t1;
    if (('not' == p1) ^ ('not' == p2)) {
      if (t1 == t2) return;
      type = ('not' == p1) ? t2 : t1;
      pred = ('not' == p1) ? p2 : p1;
    } else if (('not' == p1) && ('not' == p2)) {
      if (t1 != t2) return;
      type = t1;
      pred = 'not';
    } else if (t1 != t2) {
      return;
    } else {
      type = t1;
      pred = p1 || p2;
    }
    query.predicate = pred;
    query.type = type;
    query.nodes = this.nodes.concat(other.nodes);
    return query;
  };

  /**
   * Return "<a> and <b> and <c>"
   *
   * @return {String}
   * @api public
   */

  toString() {
    var pred = this.predicate ? this.predicate + ' ' : ''
      , type = this.type || ''
      , len = this.nodes.length
      , str = pred + type;
    if (len) {
      str += (type && ' and ') + this.nodes.map(function (expr) {
        return expr.toString();
      }).join(' and ');
    }
    return str;
  };

  /**
   * Return a JSON representation of this node.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return {
      __type: 'Query',
      predicate: this.predicate,
      type: this.type,
      nodes: this.nodes,
      lineno: this.lineno,
      column: this.column,
      filename: this.filename
    };
  };
};

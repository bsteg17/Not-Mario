"use strict";

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position, socket) {
  this.position = {x: position.x, y: position.y, direction: 'none'};
  this.socket = socket;
}

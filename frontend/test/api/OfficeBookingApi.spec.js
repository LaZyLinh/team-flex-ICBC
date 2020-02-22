/**
 * Flex Work
 * This is the REST API Documentation for ICBC Flex Work, by Team Flex
 *
 * The version of the OpenAPI document: 0.0.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.FlexWork);
  }
}(this, function(expect, FlexWork) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new FlexWork.OfficeBookingApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('OfficeBookingApi', function() {
    describe('cancelBooking', function() {
      it('should call cancelBooking successfully', function(done) {
        //uncomment below and update the code to test cancelBooking
        //instance.cancelBooking(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('createBooking', function() {
      it('should call createBooking successfully', function(done) {
        //uncomment below and update the code to test createBooking
        //instance.createBooking(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getAvailabilities', function() {
      it('should call getAvailabilities successfully', function(done) {
        //uncomment below and update the code to test getAvailabilities
        //instance.getAvailabilities(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getBookingsByUserID', function() {
      it('should call getBookingsByUserID successfully', function(done) {
        //uncomment below and update the code to test getBookingsByUserID
        //instance.getBookingsByUserID(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getLocations', function() {
      it('should call getLocations successfully', function(done) {
        //uncomment below and update the code to test getLocations
        //instance.getLocations(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getTopAvailabilities', function() {
      it('should call getTopAvailabilities successfully', function(done) {
        //uncomment below and update the code to test getTopAvailabilities
        //instance.getTopAvailabilities(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('lockBooking', function() {
      it('should call lockBooking successfully', function(done) {
        //uncomment below and update the code to test lockBooking
        //instance.lockBooking(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('unlockBooking', function() {
      it('should call unlockBooking successfully', function(done) {
        //uncomment below and update the code to test unlockBooking
        //instance.unlockBooking(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));

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
    instance = new FlexWork.Workspace();
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

  describe('Workspace', function() {
    it('should create an instance of Workspace', function() {
      // uncomment below and update the code to test Workspace
      //var instane = new FlexWork.Workspace();
      //expect(instance).to.be.a(FlexWork.Workspace);
    });

    it('should have the property workspaceId (base name: "workspaceId")', function() {
      // uncomment below and update the code to test the property workspaceId
      //var instane = new FlexWork.Workspace();
      //expect(instance).to.be();
    });

    it('should have the property staff (base name: "staff")', function() {
      // uncomment below and update the code to test the property staff
      //var instane = new FlexWork.Workspace();
      //expect(instance).to.be();
    });

    it('should have the property floor (base name: "floor")', function() {
      // uncomment below and update the code to test the property floor
      //var instane = new FlexWork.Workspace();
      //expect(instance).to.be();
    });

    it('should have the property features (base name: "features")', function() {
      // uncomment below and update the code to test the property features
      //var instane = new FlexWork.Workspace();
      //expect(instance).to.be();
    });

  });

}));

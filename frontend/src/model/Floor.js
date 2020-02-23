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

import ApiClient from '../ApiClient';

/**
 * The Floor model module.
 * @module model/Floor
 * @version 0.0.3
 */
class Floor {
    /**
     * Constructs a new <code>Floor</code>.
     * @alias module:model/Floor
     */
    constructor() { 
        
        Floor.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Floor</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Floor} obj Optional instance to populate.
     * @return {module:model/Floor} The populated <code>Floor</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Floor();

            if (data.hasOwnProperty('floorId')) {
                obj['floorId'] = ApiClient.convertToType(data['floorId'], 'Number');
            }
            if (data.hasOwnProperty('floorName')) {
                obj['floorName'] = ApiClient.convertToType(data['floorName'], 'String');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('city')) {
                obj['city'] = ApiClient.convertToType(data['city'], 'String');
            }
            if (data.hasOwnProperty('building')) {
                obj['building'] = ApiClient.convertToType(data['building'], 'String');
            }
            if (data.hasOwnProperty('floorPlanUri')) {
                obj['floorPlanUri'] = ApiClient.convertToType(data['floorPlanUri'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} floorId
 */
Floor.prototype['floorId'] = undefined;

/**
 * @member {String} floorName
 */
Floor.prototype['floorName'] = undefined;

/**
 * @member {String} location
 */
Floor.prototype['location'] = undefined;

/**
 * @member {String} city
 */
Floor.prototype['city'] = undefined;

/**
 * @member {String} building
 */
Floor.prototype['building'] = undefined;

/**
 * @member {String} floorPlanUri
 */
Floor.prototype['floorPlanUri'] = undefined;






export default Floor;


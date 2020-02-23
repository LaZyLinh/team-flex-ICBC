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
 * The Body1 model module.
 * @module model/Body1
 * @version 0.0.3
 */
class Body1 {
    /**
     * Constructs a new <code>Body1</code>.
     * @alias module:model/Body1
     * @param availabilityId {Number} 
     * @param staffId {Number} 
     * @param startDate {Date} 
     * @param endDate {Date} 
     */
    constructor(availabilityId, staffId, startDate, endDate) { 
        
        Body1.initialize(this, availabilityId, staffId, startDate, endDate);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, availabilityId, staffId, startDate, endDate) { 
        obj['availabilityId'] = availabilityId;
        obj['staffId'] = staffId;
        obj['startDate'] = startDate;
        obj['endDate'] = endDate;
    }

    /**
     * Constructs a <code>Body1</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Body1} obj Optional instance to populate.
     * @return {module:model/Body1} The populated <code>Body1</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Body1();

            if (data.hasOwnProperty('availabilityId')) {
                obj['availabilityId'] = ApiClient.convertToType(data['availabilityId'], 'Number');
            }
            if (data.hasOwnProperty('staffId')) {
                obj['staffId'] = ApiClient.convertToType(data['staffId'], 'Number');
            }
            if (data.hasOwnProperty('startDate')) {
                obj['startDate'] = ApiClient.convertToType(data['startDate'], 'Date');
            }
            if (data.hasOwnProperty('endDate')) {
                obj['endDate'] = ApiClient.convertToType(data['endDate'], 'Date');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} availabilityId
 */
Body1.prototype['availabilityId'] = undefined;

/**
 * @member {Number} staffId
 */
Body1.prototype['staffId'] = undefined;

/**
 * @member {Date} startDate
 */
Body1.prototype['startDate'] = undefined;

/**
 * @member {Date} endDate
 */
Body1.prototype['endDate'] = undefined;






export default Body1;


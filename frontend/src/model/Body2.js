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
 * The Body2 model module.
 * @module model/Body2
 * @version 0.0.3
 */
class Body2 {
    /**
     * Constructs a new <code>Body2</code>.
     * @alias module:model/Body2
     * @param bookingId {Number} 
     */
    constructor(bookingId) { 
        
        Body2.initialize(this, bookingId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, bookingId) { 
        obj['bookingId'] = bookingId;
    }

    /**
     * Constructs a <code>Body2</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Body2} obj Optional instance to populate.
     * @return {module:model/Body2} The populated <code>Body2</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Body2();

            if (data.hasOwnProperty('bookingId')) {
                obj['bookingId'] = ApiClient.convertToType(data['bookingId'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} bookingId
 */
Body2.prototype['bookingId'] = undefined;






export default Body2;


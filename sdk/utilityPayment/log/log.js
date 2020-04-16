const rest = require('../../utils/rest.js');


class Log {
    /**
     *
     * UtilityPayment Log object
     *
     * Every time a UtilityPayment entity is modified, a corresponding UtilityPayment Log
     * is generated for the entity. This log is never generated by the user, but it can
     * be retrieved to check additional information on the UtilityPayment.
     *
     * Attributes:
     * id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * payment [UtilityPayment]: UtilityPayment entity to which the log refers to.
     * errors [list of strings]: list of errors linked to this BoletoPayment event.
     * type [string]: type of the UtilityPayment event which triggered the log creation. ex: 'registered' or 'paid'
     * created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor(created, type, errors, payment, id = null) {
        this.created = created;
        this.type = type;
        this.errors = errors;
        this.payment = payment;
        this.id = id;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'UtilityPaymentLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment Log
     *
     * Receive a single UtilityPayment Log object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * UtilityPayment Log object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, types, paymentIds, after, before, user} = {}) {
    /**
     *
     * Retrieve UtilityPayment Logs
     *
     * Receive a generator of UtilityPayment Log objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default None]: maximum number of objects to be retrieved. Unlimited if None. ex: 35
     * paymentIds [list of strings, default None]: list of UtilityPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * types [list of strings, default None]: filter retrieved objects by event types. ex: 'paid' or 'registered'
     * after [string, default None] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default None] date filter for objects only before specified date. ex: '2020-03-10'
     * user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of UtilityPayment Log objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        types: types,
        paymentIds: paymentIds,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};

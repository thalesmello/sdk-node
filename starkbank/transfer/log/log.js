const rest = require('../../utils/rest.js');

class TransferLog {
    /**
     *
     * TransferLog object
     *
     * Every time a Transfer entity is modified, a corresponding TransferLog
     * is generated for the entity. This log is never generated by the
     * user.
     *
     * Attributes:
     * id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * transfer [Transfer]: Transfer entity to which the log refers to.
     * errors [list of strings]: list of errors linked to this BoletoPayment event.
     * type [string]: type of the Transfer event which triggered the log creation. ex: 'processing' or 'success'
     * created [string]: creation datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({created, type, errors, transfer, id = null}) {
        this.created = created;
        this.type = type;
        this.errors = errors;
        this.transfer = transfer;
        this.id = id;
    }
}

exports.TransferLog = TransferLog;
let resource = exports.TransferLog;


exports.get = async function (id, user = null) {
    /**
     *
     * Retrieve a specific TransferLog
     *
     * Receive a single TransferLog object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * TransferLog object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit = null, status = null, tags = null, ids = null, after = null, before = null}, user = null) {
    /**
     *
     * Retrieve TransferLogs
     *
     * Receive a generator of TransferLog objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default None]: maximum number of objects to be retrieved. Unlimited if None. ex: 35
     * transfer_ids [list of strings, default None]: list of Transfer ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * types [list of strings, default None]: filter retrieved objects by types. ex: 'success' or 'failed'
     * after [string, default None] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default None] date filter for objects only before specified date. ex: '2020-03-10'
     * user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of TransferLog objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        status: status,
        tags: tags,
        ids: ids,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};

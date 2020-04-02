const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');

class UtilityPayment {
    constructor({
                    description, scheduled = null, line = null, barCode = null,
                    tags = null, amount = null, status = null, created = null,
                    fee = null, id = null,
                }) {
        this.barCode = barCode;
        this.line = line;
        this.description = description;
        this.scheduled = check.date(scheduled);
        this.tags = tags;
        this.amount = amount;
        this.status = status;
        this.created = created;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
        this.id = id;
    }
}

exports.UtilityPayment = UtilityPayment;
let resource = exports.UtilityPayment;


exports.create = async function (payments, user = null) {
    return rest.post(resource, payments, user);
};

exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, user = null) {
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({limit = null, status = null, tags = null, ids = null, after = null, before = null}, user = null) {
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

exports.delete = async function (id, user = null) {
    return rest.deleteId(resource, id, user);
};
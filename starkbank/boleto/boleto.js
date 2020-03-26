const rest = require('../utils/rest.js');

class Boleto {
    constructor(amount, name, taxId, streetLine1, streetLine2, district, city, stateCode, zipCode,
                due = null, fine = null, interest = null, overdueLimit = null, tags = null, descriptions = null, id = null,
                fee = null, line = null, barCode = null, status = null, created = null) {
        this.amount = amount;
        this.name = name;
        this.fee = fee;
        this.taxId = taxId;
        this.streetLine1 = streetLine1;
        this.streetLine2 = streetLine2;
        this.district = district;
        this.city = city;
        this.stateCode = stateCode;
        this.zipCode = zipCode;
        this.due = due;
        this.fine = fine;
        this.interest = interest;
        this.overdueLimit = overdueLimit;
        this.tags = tags;
        this.descriptions = descriptions;
        this.line = line;
        this.barCode = barCode;
        this.status = status;
        this.created = created;
    }
}

exports.Boleto = Boleto;

exports.create = function (boletos, user = null) {
    return rest.post('boleto', boletos, user);
};

exports.get = function (id, user = null) {
    return rest.getId('boleto', id, user);
};

exports.getPdf = function (id, user = null) {
    return rest.getPdf('boleto', id, user);
};

exports.query = function (limit = null, status = null, tags = null, ids = null, after = null, before = null, user = null) {
    return rest.getList('boleto', user);
};

exports.delete = function (id, user = null) {
    return new Boleto(rest.delete('boleto', id, user));
};
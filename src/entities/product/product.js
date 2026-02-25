const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeProduct({ Id }) {
    return function makeProduct({
        id = Id.makeId(),
        name,
        brand,
        info,
        count,
        price,
        type,
        category,
        photo
    } = {}) {

        if (!name) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli name bo'lishi shart."
            );
        }

        if (!brand) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli brand bo'lishi shart."
            );
        }

        if (!count) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli count bo'lishi shart."
            );
        }

        if (!["device", "edibles"].includes(category)) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli category bo'lishi kk"
            );
        }

        if (!info) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli info bo'lishi shart."
            );
        }

        if (!id) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli id bo'lishi shart."
            );
        }

        if (!price) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli price bo'lishi shart."
            );
        }

        if (!type) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli type bo'lishi shart."
            );
        }

        if (!photo) {
            throw new InvalidPropertyError(
                "Mahsulotda yaroqli rasm bo'lishi shart."
            );
        }


        return Object.freeze({
            getId: () => id,
            getCategory: () => category,
            getName: () => name,
            getInfo: () => info,
            getPrice: () => price,
            getBrand: () => brand,
            getType: () => type,
            getCount: () => count,
            getPhoto: () => photo
        });
        
    };
};

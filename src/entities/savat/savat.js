const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeSavat({ Id }) {
    return function makeSavat({
        id = Id.makeId(),
        user_id,
        product_id,
        quantity = 1,
        total_price
    } = {}) {
        if (!user_id) {
            throw new InvalidPropertyError(
                "Savatda yaroqli user_id bo'lishi shart."
            );
        }

        if (!product_id) {
            throw new InvalidPropertyError(
                "Savatda yaroqli product_id bo'lishi shart."
            );
        }

        if (!quantity) {
            throw new InvalidPropertyError(
                "Savatda yaroqli quantity bo'lishi shart."
            );
        }

        if (!id) {
            throw new InvalidPropertyError(
                "Savatda yaroqli id bo'lishi shart."
            );
        }


        return Object.freeze({
            getId: () => id,
            getQuantity: () => quantity,
            getUserId: () => user_id,
            getProductId: () => product_id,
            getTotalPrice: () => total_price,
            incrementQuantity,
        });

        function incrementQuantity() {
            quantity = quantity + 1
        }

    };
};

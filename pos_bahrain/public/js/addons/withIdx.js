// This is for easy reference of the .selected row (hacks)
export default function withIdx(Pos) {
    return class PosExtended extends Pos {
        show_items_in_item_cart() {
            super.show_items_in_item_cart();
            this._set_pos_bill_item_idx();
            $(this.wrapper).find('.pos-bill-item').removeClass('active');
            if (this.cart_idx) {
                $(this.wrapper)
                    .find(`.pos-bill-item[data-idx="${this.cart_idx}"]`)
                    .addClass('active');
            }
        }
        _set_pos_bill_item_idx() {
            const $items = $('div.items').children();
            $.each($items || [], function(i, item) {
               $(item).attr('data-idx', i);
            });
        }
        make_new_cart() {
            this.cart_idx = null;
            super.make_new_cart();
        }
        bind_events() {
            super.bind_events();
            $(this.wrapper).on('click', '.pos-item-wrapper', e => {
                this.cart_idx = null;
            })
        }
        bind_items_event() {
            super.bind_items_event();
            $(this.wrapper).on('click', '.pos-bill-item', e => {
                this.cart_idx = $(e.currentTarget).attr("data-idx");
            })
        }
    };
}
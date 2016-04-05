# -*- coding: utf-8 -*-
# © 2016-TODAY LasLabs Inc.
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from openerp.tests.common import TransactionCase


class TestAccountInvoice(TransactionCase):

    def setUp(self, *args, **kwargs):
        super(TestAccountInvoice, self).setUp(*args, **kwargs)
        self.cc_partner_id = self.env['res.partner'].create({
            'name': 'Test Partner',
        })
        self.partner_id = self.env['res.partner'].create({
            'name': 'Test Partner',
            'invoice_cc_ids': [(4, self.cc_partner_id.id, 0)],
        })
        self.product_id = self.env['product.product'].create({
            'name': 'Test Product',
            'list_price': 12.00,
        })
        self.account_type_id = self.env['account.account.type'].create({
            'name': 'Test Account Type',
            'type': 'other',
        })
        self.account_id = self.env['account.account'].create({
            'name': 'Test Account',
            'code': 'TESTSTS',
            'user_type_id': self.account_type_id.id,
        })
        self.invoice_id = self.env['account.invoice'].create({
            'partner_id': self.partner_id.id,
            'company_id': self.env.user.company_id.id,
            'account_id': self.account_id.id,
            'invoice_line_ids': [(0, 0, {
                'product_id': self.product_id.id,
                'account_id': self.account_id.id,
                'name': 'Test Line',
                'price_unit': 11.00,
                'quantity': 2,
            })],
        })

    def test_followers_added_during_validate(self):
        self.invoice_id.invoice_validate()
        self.assertTrue(
            self.env['mail.followers'].search([
                ('partner_id', '=', self.cc_partner_id.id),
                ('res_id', '=', self.invoice_id.id),
                ('res_model', '=', 'account.invoice'),
            ])
        )

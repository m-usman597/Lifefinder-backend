session:  {
  id: 'cs_test_a1nTHlyslVj6kvLLKLlLepigppKgPRIwcxw7lJFva5UACycJ0gVhnfSpvA',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 2000,
  amount_total: 2000,
  automatic_tax: { enabled: false, liability: null, status: null },        
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/payment/cancel',
  client_reference_id: null,
  client_secret: null,
  consent: null,
  consent_collection: null,
  created: 1719781659,
  currency: 'usd',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: null,
  customer_creation: 'if_required',
  customer_details: null,
  customer_email: null,
  expires_at: 1719868059,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      issuer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: {
    amount: '20',
    hospital_id: '667eeb796a5be9c44be9967b',
    selected_date: '2024-07-02',
    selected_description: 'i wanna meet you to discuss my health related concerns with you.',
    selected_time: '00:01',
    service_id: '667eeb796a5be9c44be9967c',
    user_email: 'umarcreator2@gmail.com'
  },
  mode: 'payment',
  payment_intent: null,
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: null,
  payment_method_options: { card: { request_three_d_secure: 'automatic' } },
  payment_method_types: [ 'card' ],
  payment_status: 'unpaid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  saved_payment_method_options: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_details: null,
  shipping_options: [],
  status: 'open',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/payment/success?service=667eeb796a5be9c44be9967c&hospital=667eeb796a5be9c44be9967b',       
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: 'https://checkout.stripe.com/c/pay/cs_test_a1nTHlyslVj6kvLLKLlLepigppKgPRIwcxw7lJFva5UACycJ0gVhnfSpvA#fidkdWxOYHwnPyd1blpxYHZxWjA0VUB8N3NVN1IzbUoxQkpPN1N3VG9ofEZ1MnVBYEs3N0xdZF90T2Zza25JQDxRcW03YkRRanZwbkhCf0NkSXw8UEtMdmlSbGhSbmhjXFBydHBLMj1JYGNkNTVjMkJgVmp0dCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
}


event.type:  charge.succeeded
Charge was successful! {
  id: 'ch_3PXUytP2W6hO4GOJ1NJxQlD8',
  object: 'charge',
  amount: 2000,//this+
  amount_captured: 2000,
  amount_refunded: 0,
  application: null,
  application_fee: null,
  application_fee_amount: null,
  balance_transaction: null,
  billing_details: {
    address: {
      city: null,
      country: 'PK',
      line1: null,
      line2: null,
      postal_code: null,
      state: null
    },
    email: 'umarcreator2@gmail.com',//this+
    name: 'umar',
    phone: null
  },
  calculated_statement_descriptor: 'Stripe',
  captured: true,
  created: 1719781699,//this
  currency: 'usd',
  customer: null,
  description: null,
  destination: null,
  dispute: null,
  disputed: false,
  failure_balance_transaction: null,
  failure_code: null,
  failure_message: null,
  fraud_details: {},
  invoice: null,
  livemode: false,
  metadata: {},
  on_behalf_of: null,
  order: null,
  outcome: {
    network_status: 'approved_by_network',
    reason: null,
    risk_level: 'normal',
    risk_score: 28,
    seller_message: 'Payment complete.',
    type: 'authorized'
  },
  paid: true,
  payment_intent: 'pi_3PXUytP2W6hO4GOJ18AqGP44',//this+
  payment_method: 'pm_1PXUysP2W6hO4GOJ8vsKKf0h',//this
  payment_method_details: {
    card: {
      amount_authorized: 2000,
      brand: 'visa',
      checks: [Object],
      country: 'US',
      exp_month: 12,
      exp_year: 2024,
      extended_authorization: [Object],
      fingerprint: '9YI9QjNHMljfJT3C',
      funding: 'credit',
      incremental_authorization: [Object],
      installments: null,
      last4: '4242',
      mandate: null,
      multicapture: [Object],
      network: 'visa',
      network_token: [Object],
      overcapture: [Object],
      three_d_secure: null,
      wallet: null
    },
    type: 'card'
  },
  radar_options: {},
  receipt_email: null,
  receipt_number: null,
  receipt_url: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xUEV5MnZQMlc2aE80R09KKMSSh7QGMgaU5SWeC706LBZFg9MrCq-cAnmLH5ThP63Y670gfk6GJ0ke9wVHGRhpYBXaryDHzofpj2_y',
  refunded: false,
  review: null,
  shipping: null,
  source: null,
  source_transfer: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}
Unhandled event type charge.succeeded
event.type:  checkout.session.completed




Checkout Session was successful! {
  id: 'cs_test_a1nTHlyslVj6kvLLKLlLepigppKgPRIwcxw7lJFva5UACycJ0gVhnfSpvA',//this
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 2000,
  amount_total: 2000,//this+
  automatic_tax: { enabled: false, liability: null, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/payment/cancel',
  client_reference_id: null,
  client_secret: null,
  consent: null,
  consent_collection: null,
  created: 1719781659,
  currency: 'usd',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: null,
  customer_creation: 'if_required',
  customer_details: {
    address: {
      city: null,
      country: 'PK',
      line1: null,
      line2: null,
      postal_code: null,
      state: null
    },
    email: 'umarcreator2@gmail.com',//this+
    name: 'umar',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  expires_at: 1719868059,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      issuer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: {//this
    selected_description: 'i wanna meet you to discuss my health related concerns with you.',
    user_email: 'umarcreator2@gmail.com',
    hospital_id: '667eeb796a5be9c44be9967b',
    selected_time: '00:01',
    service_id: '667eeb796a5be9c44be9967c',
    amount: '20',
    selected_date: '2024-07-02'
  },
  mode: 'payment',
  payment_intent: 'pi_3PXUytP2W6hO4GOJ18AqGP44',//this+
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: null,
  payment_method_options: { card: { request_three_d_secure: 'automatic' } },
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  saved_payment_method_options: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_details: null,
  shipping_options: [],
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/payment/success?service=667eeb796a5be9c44be9967c&hospital=667eeb796a5be9c44be9967b',       
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: null
}
















event.type:  payment_intent.succeeded
Payment was successful! {
  id: 'pi_3PXUytP2W6hO4GOJ18AqGP44',
  object: 'payment_intent',
  amount: 2000,
  amount_capturable: 0,
  amount_details: { tip: {} },
  amount_received: 2000,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic_async',
  client_secret: 'pi_3PXUytP2W6hO4GOJ18AqGP44_secret_oerP9dbspiscVc7aUMXOhSLRv',
  confirmation_method: 'automatic',
  created: 1719781699,
  currency: 'usd',
  customer: null,
  description: null,
  invoice: null,
  last_payment_error: null,
  latest_charge: 'ch_3PXUytP2W6hO4GOJ1NJxQlD8',
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: 'pm_1PXUysP2W6hO4GOJ8vsKKf0h',
  payment_method_configuration_details: null,
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: 'automatic'
    }
  },
  payment_method_types: [ 'card' ],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}
Unhandled event type payment_intent.succeeded
event.type:  payment_intent.created
Unhandled event type payment_intent.created
event.type:  charge.updated
Unhandled event type charge.updated

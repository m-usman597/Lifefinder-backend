const stripe = require("stripe")(process.env.STRIPE_KEY);
const PaymentLink = require("../model/paymentLink");
const Payment = require("../model/payment");
const { updateTempFile } = require("../modules/tempFile");
const path = require("path");
const SubscriptionLink = require("../model/subscriptionLink");
const Subscription = require("../model/subscription");
const IHospitals = require("../model/hospital/auth");
const { PORT } = require("../config");
const axios = require("axios");

function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const makePayment = async (req, res) => {
  const fields = [
    "hospital_id",
    "hospital_name",
    "service_id",
    "service_name",
    "selected_date",
    "selected_time",
    "selected_description",
    "user_email",
    "amount",
  ];
  const id = generateRandomId(16);
  try {
    let checkFields = true;
    fields.forEach((i) => {
      if (req.body[i] === undefined || req.body[i] === null) {
        checkFields = false;
      }
    });
    if (checkFields) {
      const email = req.body.user_email;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${req.body.hospital_name} - ${req.body.service_name}`,
              },
              unit_amount: req.body.amount * 100, // Stripe expects the amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/payment/success?userId=${encodeURIComponent(
          email
        )}&paymentLink=${encodeURIComponent(id)}&data=${encodeURIComponent(
          JSON.stringify(req.body)
        )}`,
        cancel_url: `http://localhost:3000/payment/cancel`,
        metadata: {
          hospital_id: req.body.hospital_id,
          service_id: req.body.service_id,
          selected_date: req.body.selected_date,
          selected_time: req.body.selected_time,
          service_name: req.body.service_name,
          selected_description: req.body.selected_description,
          user_email: req.body.user_email,
          amount: req.body.amount,
          payment_link: id,
        },
      });
      console.log("session: ", session);
      const payment = new PaymentLink({
        paymentLink: id,
        email: req.body.user_email,
        paymentLinkId: session.id,
        amount: req.body.amount || Math.floor(session.amount_total / 100),
        paymentInitiatedTime: new Date(session.created * 1000) || new Date(),
        date: new Date(),
        paymentCompleted: false,
        hospital: req.body.hospital_id,
        service: {
          serviceName: req.body.service_name,
          serviceDate: req.body.selected_date,
          serviceDescription: req.body.selected_description,
          serviceTiming: req.body.selected_time,
        },
      });
      await payment.save();
      res.status(200).json({
        url: session.url,
        paymentLink: session.id,
        paymentLinkId: payment._id,
      });
    } else {
      res.status(400).json({ message: "Some fields are missing!" });
    }
  } catch (e) {
    console.log("make-payment api error:", e);
    res.status(500).json({ message: e.message });
  }
};

const savePayment = async (req, res) => {
  try {
    if (
      req.body.paymentLink &&
      req.body.data?.user_email &&
      req.body.data?.hospital_id
    ) {
      const payment = await PaymentLink.findOne({
        paymentLink: req.body.paymentLink,
        email: req.body.data?.user_email,
        hospital: req.body.data?.hospital_id,
      });
      if (payment) {
        payment.paymentCompleted = true;
        payment.paymentSuccessTime = payment.paymentSuccessTime || new Date();
        const result = await payment.save();
        res.json(result);
        // This will add the payments not listed in Payment DB to the payment_issues.json file
        const temp = await Payment.findOne({
          paymentLink: payment._id,
          email: req.body.data?.user_email,
          hospital: req.body.data?.hospital_id,
        });

        const dateTimeString = `${payment.service.serviceDate}T${payment.service.serviceTiming}`;
        const dateObject = new Date(dateTimeString);
        console.log("data for create meeting: ", {
          //comment
          user_id: payment.email || req.body.data?.user_email,
          hospital_id: req.body.data?.hospital_id || payment.hospital,
          scheduled_time: dateObject,
          payment_id: temp._id,
          payment_link: payment._id,
        });
        axios
          .post(`http://localhost:${PORT}/create/meeting`, {
            user_id: payment.email || req.body.data?.user_email,
            hospital_id: req.body.data?.hospital_id || payment.hospital,
            scheduled_time: dateObject,
            payment_id: temp._id,
            payment_link: payment._id,
          })
          .then((res) => {
            console.log("meeting saved: ", res?.data || res);
          })
          .catch((e) => {
            console.log(
              "error in saving meeting inside save-payment: ",
              e?.response?.data || e?.data || e
            );
          });
        if (!temp) {
          const filePath = path.join(process.cwd(), "payment_issues.json");
          await updateTempFile(
            {
              paymentLinkId: payment._id,
              paymentLink: req.body.paymentLink,
              email: req.body.data?.user_email,
              data: req.body?.data,
              type: "Payment",
            },
            filePath
          );
        }
      } else {
        res.status(404).json("paymentLink is not found in DB!");
      }
    } else {
      res.status(400).json({ message: "Some fields are not present!" });
    }
  } catch (e) {
    console.log("save-payment api error: ", e?.message, e);
  }
};

const makeSubscription = async (req, res) => {
  const price = {
    "Basic Plan": "price_1PaNqWP2W6hO4GOJAxQPvpz0",
    "Standard Plan": "price_1PaNqWP2W6hO4GOJAxQPvpz0",
    "Pro Plan": "price_1PaNqWP2W6hO4GOJAxQPvpz0",
    test: "price_1PLE1FP2W6hO4GOJI4oEZSsS",
  };
  // const priceValue = { basic: 79, standard: 349, pro: 599, test: 3 };
  const types = ["Basic Plan", "Standard Plan", "Pro Plan", "test"];
  const randomId = generateRandomId(20);
  try {
    if (req.body.userId && types.includes(req.body.type)) {
      // const jsDate = new Date();
      const paymentInitiatedTime = new Date();
      const userId = req.body.userId;

      // const paymentLink = await stripe.paymentLinks.create({
      // line_items: [
      //     {
      //     price: price[req.body.type],
      //     quantity: 1,
      //     },
      // ],
      // metadata: {
      // userId: userId,
      // type: req.body.type,
      // paymentInitiatedTime: paymentInitiatedTime,
      // paymentLinkIdDb: randomId,
      // // hospitalId: req.body.hospitalId,
      // },
      // after_completion: {
      //     type: 'redirect',
      //     redirect: {
      //     url: `http://localhost:3000/payment/success?user=${userId}&paymentLink=${randomId}&data=${JSON.stringify(req.body)}`,
      //     },
      // },
      // });

      const paymentLink = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: price[req.body.type],
            // price: price['test'],
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `http://localhost:3000/login?userId=${encodeURIComponent(
          userId
        )}&paymentLink=${encodeURIComponent(
          randomId
        )}&data=${encodeURIComponent(JSON.stringify(req.body))}`,
        cancel_url: `http://localhost:3000/payment/cancel`,
        metadata: {
          userId: userId,
          type: req.body.type,
          paymentInitiatedTime: paymentInitiatedTime,
          paymentLinkIdDb: randomId,
        },
      });

      console.log("subscriptionLink: ", paymentLink);
      // const query = `INSERT INTO payment_links(userId,paymentId,paymentLink,price,paymentInitiatedTime,type,paymentLinkId) VALUES('${userId}','${paymentLink.id}','${paymentLink.url}','${priceValue[req.body.type]}','${paymentInitiatedTime}','${req.body.type}','${randomId}')`;
      // await queryAsync(query);

      const subscription = new SubscriptionLink({
        email: req.body.userId,
        paymentLink: randomId,
        paymentLinkId: paymentLink.id,
        amount: Math.floor(paymentLink.amount_total / 100) || req.body.amount,
        paymentInitiatedTime: paymentLink.created
          ? new Date(paymentLink.created * 1000)
          : new Date(),
        date: new Date(),
        subscriptionType: req.body.type,
        // subscriptionType: 'test',
        paymentCompleted: false,
        // hospital: req.body.hospital_id
      });
      await subscription.save();

      res.status(200).json({ link: paymentLink.url, id: paymentLink.id });
    } else {
      res.status(400).json({ message: "Some fields are missing!" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const saveSubscription = async (req, res) => {
  try {
    // const { userId, type, paymentInitiatedTime } = req.body;
    // const jsDate = new Date();
    // const paymentTime = jsDate.toISOString().slice(0, 19).replace('T', ' ');
    // const querySelect = `SELECT * FROM payment_links WHERE userId=? && type=? && paymentInitiatedTime=?`;
    // const queryDuplicate = `SELECT * FROM payment WHERE userId=? && type=? && paymentInitiatedTime=?`;
    // const promise = await Promise.all([queryAsync(querySelect, [userId, type, paymentInitiatedTime]), queryAsync(queryDuplicate, [userId, type, paymentInitiatedTime])]);
    // const result = promise[0];
    // const resultDuplicate = promise[1];
    // if(resultDuplicate.length > 0) {
    //     return res.status(400).json({ message: 'Payment is already present' });
    // }
    // const query = `INSERT INTO payment(userId,paymentId,paymentLink,price,paymentInitiatedTime,type,paymentSuccessTime,paymentCompleted) VALUES('${userId}','${result[0].paymentId}','${result[0].paymentLink}','${result[0].price}','${paymentInitiatedTime}','${type}','${paymentTime}',1)`;
    // const queryUpdate = `UPDATE payment_links SET paymentSuccessTime=?, paymentCompleted=1 WHERE userId=? && type=? && paymentInitiatedTime=?`;
    // await Promise.all([queryAsync(queryUpdate, [paymentTime, userId, type, paymentInitiatedTime]), queryAsync(query)]);
    // res.json({ message: 'Payment saved successfully!' });
    if (req.body.paymentLink && req.body.user_email) {
      const payment = await SubscriptionLink.findOne({
        paymentLink: req.body.paymentLink,
        email: req.body.data?.user_email,
      });
      if (payment) {
        payment.paymentCompleted = true;
        payment.paymentSuccessTime = payment.paymentSuccessTime || new Date();
        const result = await payment.save();
        res.json(result);
        // This will add the payments not listed in Payment DB to the payment_issues.json file

        const hospital = await IHospitals.findOne({
          email: req.body.data?.user_email,
        });
        const temp = await Subscription.findOne({
          paymentLink: payment._id,
          email: req.body.data?.user_email,
          hospital: req.body.data?.hospital_id,
        });
        if (hospital) {
          hospital.subscribed = true;
          hospital.subscriptionLinkId = payment._id;
          if (temp && temp._id) {
            hospital.subscriptonId = temp._id;
          }
          await hospital.save();
        }
        if (!temp) {
          const filePath = path.join(process.cwd(), "payment_issues.json");
          await updateTempFile(
            {
              paymentLinkId: payment._id,
              paymentLink: req.body.paymentLink,
              email: req.body.data?.user_email,
              data: req.body?.data,
              type: "Subscription",
            },
            filePath
          );
        }
      } else {
        res.status(404).json("subscriptionLink is not found in DB!");
      }
    } else {
      res.status(400).json("some fields are missing!");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const checkExpiry = async (req, res) => {
  const { userId } = req.body;
  try {
    if (userId) {
      const querySelect = `SELECT * FROM payment_stripe WHERE userId = '${userId}' ORDER BY paymentSuccessTime DESC LIMIT 1`;
      const result = await queryAsync(querySelect);
      const currentTime = new Date();
      const expiryTime = new Date(result[0].subscriptionExpiry);
      // console.log('checkExpiry querySelect: ', result, currentTime, expiryTime);
      if (result[0].subscriptionExpiry && currentTime < expiryTime) {
        return res.status(200).json({
          message: "Your subscription is still valid",
          subscription: true,
        });
      } else {
        return res.status(200).json({
          message: "Your subscription is expired",
          subscription: false,
        });
      }
    } else {
      return res.status(400).json({ message: "Some fields are missing!" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  makePayment,
  savePayment,
  makeSubscription,
  saveSubscription,
  checkExpiry,
};

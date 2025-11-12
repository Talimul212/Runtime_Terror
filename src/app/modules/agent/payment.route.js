import express from 'express';
import { SslCommerzPayment } from 'sslcommerz';
import { ObjectId } from 'mongodb';
import { Agent, Payment } from './agent.model.js';
const router = express.Router();
const app = express();
// Payment request route
router.post('/payment', async (req, res) => {
  const transaction_Id = new ObjectId().toString(); // MongoDB ObjectId as a unique string
  // Generate a unique transaction ID

  try {
    const result = await Agent.findOne({ _id: req.body._id });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Agent not found' });
    }

    const { name, email, address, phoneNumber } = req.body;

    const generateRandomRef = () => {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let ref = '';
      for (let i = 0; i < 6; i++) {
        ref += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return ref;
    };

    const data = {
      total_amount: 599,
      currency: 'BDT',
      tran_id: transaction_Id,
      success_url: `${process.env.StoreRoute}/ap1/v1/agent/payment/success/${transaction_Id}`,
      fail_url: `${process.env.StoreRoute}/payment/fail/${transaction_Id}`,
      cancel_url: `${process.env.StoreRoute}/payment/cancel/${transaction_Id}`,
      cus_name: name,
      cus_email: email,
      cus_add1: address,
      shipping_method: 'No',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_country: 'Bangladesh',
      cus_phone: phoneNumber,
      multi_card_name: 'mastercard',
      value_a: generateRandomRef(),
      value_b: generateRandomRef(),
      value_c: generateRandomRef(),
      value_d: generateRandomRef(),
    };

    const sslcommer = new SslCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASS,
      false // false for sandbox, true for live
    );

    sslcommer
      .init(data)
      .then(apiResponse => {
        const order = new Payment(data);

        order.save();

        res
          .status(200)
          .json({ success: true, redirect: apiResponse.GatewayPageURL });
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          error: err.message || 'Payment initialization failed',
        });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Payment success route

router.post(
  '/ap1/v1/agent/payment/success/:transaction_Id',
  async (req, res) => {
    const { transaction_Id } = req.params;

    try {
      // Step 1: Find the payment by transaction_Id
      const payment = await Payment.findOne({ tran_id: transaction_Id });
      if (!payment) {
        return res
          .status(404)
          .json({ success: false, message: 'Payment not found' });
      }

      // Step 2: Find the agent by the details in the payment
      const agent = await Agent.findOne({
        name: payment.cus_name,
        email: payment.cus_email,
      });

      if (!agent) {
        return res.status(404).json({
          success: false,
          message: 'Agent not found or details do not match',
        });
      }

      // Step 3: Update the agent's payment status to 'Paid'
      const updatedAgent = await Agent.findOneAndUpdate(
        { _id: agent._id },
        { $set: { paymentStatus: 'Paid' } },
        { new: true } // return the updated document
      );

      // Step 4: If agent is updated successfully, redirect to success URL
      res.redirect(
        `${process.env.DOMAINURL}/payment/success/${transaction_Id}`
      );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);
router.get('/allPayment', async (req, res) => {
  // const { limit } = req.query;
  // console.log(limit);
  // const booking = await Payment.find({}).limit(limit).sort({ createdAt: -1 });
  const booking = await Payment.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json({
      status: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data can't fetch",
      error,
    });
  }
});
router.get('/individual/:id', async (req, res) => {
  const booking = await Payment.findOne({
    tran_id: req.params.id,
  });
  try {
    res.status(200).json({
      status: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data can't fetch",
      error,
    });
  }
});

// Payment failure route
router.post('/payment/fail/:transaction_Id', async (req, res) => {
  const { transaction_Id } = req.params;
  console.log(transaction_Id);
  try {
    const updatedAgent = await Payment.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { paymentStatus: 'Pending' } },
      { new: true }
    );

    if (!updatedAgent) {
      return res
        .status(404)
        .json({ success: false, message: 'Agent not found' });
    }

    res.redirect(`${process.env.DOMAINURL}/payment/fail/${transaction_Id}`);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Payment cancel route
router.post('/payment/cancel/:transaction_Id', async (req, res) => {
  const { transaction_Id } = req.params;
  console.log(transaction_Id);
  try {
    const updatedAgent = await Agent.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { paymentStatus: 'Pending' } },
      { new: true }
    );

    if (!updatedAgent) {
      return res
        .status(404)
        .json({ success: false, message: 'Agent not found' });
    }

    res.redirect(`${process.env.DOMAINURL}/payment/cancel/${transaction_Id}`);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export const PaymentRoutes = router;

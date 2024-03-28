import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js/types/components/buttons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { PAYPAL_CLIENTid } from '../../../config/paypal.config';
import {
  useBookingCart,
  useTotalBill,
} from '../../Booking/store/booking.store';
import { useAddOrder } from '../apis/checkout.api';

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalBill = useTotalBill();
  const bookingCart = useBookingCart();
  const [orderID, setOrderID] = useState<string>('');

  const { mutate: addOrder } = useAddOrder();

  // creates a paypal order
  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Sunflower',
            amount: {
              currency_code: 'USD',
              value: String(totalBill * 0.000041),
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    return actions.order?.capture().then(function (details) {
      const { payer } = details;
      addOrder(
        {
          renters: bookingCart,
          method: 'banking',
          ...state.submitValue,
          service: state.submitValue.service.value,
          servicePack: state.submitValue.servicePack.value,
          paypalId: orderID,
        },
        {
          onSuccess(data) {
            if (data.isSuccess) {
              toast.success('Cảm ơn bạn đã thanh toán!');
              navigate('/', { replace: true });
            } else {
              toast.error(data.msg || 'Thanh toán thất bại!');
            }
          },
        },
      );
    });
  };

  useEffect(() => {
    if (!totalBill) {
      navigate('/booking');
    }
  }, []);

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: PAYPAL_CLIENTid,
          currency: 'USD',
          intent: 'capture',
        }}
      >
        <div>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove as unknown as any}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default Checkout;

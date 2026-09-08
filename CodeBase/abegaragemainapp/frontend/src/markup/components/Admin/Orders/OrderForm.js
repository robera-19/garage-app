import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Step1CustomerSearch from './Step1CustomerSearch';
import Step2SelectVehicle from './Step2SelectVehicle';
import Step3SelectServices from './Step3SelectServices';
import Step4ReviewSubmit from './Step4ReviewSubmit';

const OrderForm = ({ initialData, onSubmit, loading, title }) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [orderData, setOrderData] = useState({
    customer: null,
    vehicle: null,
    services: [],
    additionalRequests: '',
    notes: '',
    priority: 'normal',
    estimatedCompletion: null,
    ...initialData,
  });

  const updateOrderData = (data) => {
    setOrderData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    onSubmit(orderData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1CustomerSearch
            selectedCustomer={orderData.customer}
            onSelectCustomer={(customer) => updateOrderData({ customer })}
            onNext={handleNext}
          />
        );

      case 2:
        return (
          <Step2SelectVehicle
            customerId={orderData.customer?.customer_id}
            selectedVehicle={orderData.vehicle}
            onSelectVehicle={(vehicle) => updateOrderData({ vehicle })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );

      case 3:
        return (
          <Step3SelectServices
            selectedServices={orderData.services}
            additionalRequests={orderData.additionalRequests}
            onSelectServices={(services) => updateOrderData({ services })}
            onAdditionalRequests={(requests) =>
              updateOrderData({
                additionalRequests: requests,
              })
            }
            onAddService={() => navigate('/admin/services')}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );

      case 4:
        return (
          <Step4ReviewSubmit
            orderData={orderData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            loading={loading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="new-order-page">
      <div className="container">
        <div className="order-header">
          <h1>{title}</h1>

          <button
            className="back-btn"
            onClick={() => navigate('/admin/orders')}
          >
            ← Back to Orders
          </button>
        </div>

        <div className="progress-steps">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`step ${currentStep >= step ? 'active' : ''}`}
              onClick={() => {
                if (currentStep > step) {
                  setCurrentStep(step);
                }
              }}
            >
              <div className="step-number">{step}</div>

              <div className="step-label">
                {step === 1 && 'Customer'}
                {step === 2 && 'Vehicle'}
                {step === 3 && 'Services'}
                {step === 4 && 'Review'}
              </div>
            </div>
          ))}
        </div>

        <div className="step-content">{renderStep()}</div>
      </div>
    </div>
  );
};

export default OrderForm;

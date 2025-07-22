const ServiceModel = require('../models/serviceModel');

const  service={

async getUpcomingPayments  (days)  {
  const serviceCount = await ServiceModel.getUpcomingServiceCount(days);
console.log("serviceCount",serviceCount)
  if (serviceCount === 0) {
    return { serviceCount: 0, services: [] };
  }

  const services = await ServiceModel.getUpcomingServiceDetails(days);
  return { serviceCount, services };
}

}

module.exports = service ;
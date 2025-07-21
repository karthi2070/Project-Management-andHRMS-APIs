const ServiceModel = require('../models/serviceModel');

const  service={

async getUpcomingPayments  (days)  {
  const clientCount = await ServiceModel.getUpcomingClientCount(days);

  if (clientCount === 0) {
    return { clientCount: 0, clients: [] };
  }

  const clients = await ServiceModel.getUpcomingClientDetails(days);
  return { clientCount, clients };
}

}

module.exports = service ;
'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//exercice 1
function shippingsPrice () {
  deliveries.forEach(function (element) {
    var trucker = findTruckers(element.truckerId);

    element.price = element.distance * trucker.pricePerKm + element.volume * trucker.pricePerVolume * (1 - discountHighVolumes(element)) + deductibleOption(element);
  });
}

function findTruckers (idTruck) {
  for (var i = 0; i < truckers.length; i++) {
    if (truckers[i].id === idTruck) {
      return truckers[i];
    }
  }
}

//exercice 2
function discountHighVolumes (delivery) {
  var discount = 0;

  switch (true) {
  case delivery.volume > 5 && delivery.volume <= 10:
    discount = 0.1;
    break;
  case delivery.volume > 10 && delivery.volume <= 25:
    discount = 0.3;
    break;
  case delivery.volume > 25:
    discount = 0.5;
    break;
  default:
  }
  return discount;
}
shippingsPrice();

//exercice 3
function makeCommission () {
  deliveries.forEach(function (delivery) {
    var commission = delivery.price * 0.3;

    delivery.commission.insurance = commission * 0.5;
    delivery.commission.treasury = Math.trunc(delivery.distance / 500) + 1;
    delivery.commission.convargo = commission - delivery.commission.insurance - delivery.commission.treasury;
  });
}
makeCommission();

//exercice 4
function deductibleOption (delivery) {
  if (delivery.options.deductibleReduction) {
    return delivery.volume;
  }
  return 0;
}

//exercice 5
function payActors () {
  deliveries.forEach(function (delivery) {
    actors.find(function (actor) {
      if (actor.deliveryId === delivery.id) {
        //shipper
        actor.payment[0].amount = delivery.price;

        //owner
        actor.payment[1].amount = delivery.price * 0.7;

        //insurance
        actor.payment[2].amount = delivery.commission.insurance;

        //treasury
        actor.payment[3].amount = delivery.commission.treasury;

        //convargo
        actor.payment[4].amount = delivery.commission.convargo + deductibleOption(delivery);
      }
    });
  });
}
payActors();

console.log(truckers);
console.log(deliveries);
console.log(actors);

console.clear();
//configuring mongoose
require('dotenv').load();
const mongoose = require('mongoose');

const driver = process.env.MONGO_DRIVER;
mongoose.connect(driver);
mongoose.connection.on('connected', () => {
    console.log('connected to mongod');
    console.log('-------------------------------');

    const Organisation = require('./models/Organisation');
    // const siteData = {id:1}

    //seeding 5 organisations
    for (let index = 1; index <= 5; index++) {

        const dateValue = new Date('August 19, 1975 23:15:30');
        const stringValue = `Text entry ${index}` // adding the index to the strings.
        const booleanValue = false;

        const siteData = {
            id: index,
            Name: stringValue,
            Accessibility: stringValue,
            LocationDetails: stringValue,
            ParkingInfo: stringValue,
            PublicTransportInfo: stringValue,
            IsMobile: booleanValue,
            EmailAddress: stringValue,
            EmailIsConfidential: stringValue,
            Website: stringValue,
            PostalAddress: stringValue,
            PostalAddressState: stringValue,
            PostalAddressSuburb: stringValue,
            PostalAddressPostcode: stringValue,
            PostalAddressIsConfidential: booleanValue,
            PhoneNumber: stringValue,
            PhoneKind: stringValue,
            PhoneIsConfidential: booleanValue,
            OpeningHours: [{day:"Monday",
                openTime:"8:30",
                closeTime:"15:30",
                openingHoursNote: "closes early"}],
            AddressBuilding: stringValue,
            AddressLevel: stringValue,
            AddressFlatUnit: stringValue,
            AddressStreetNumber: stringValue,
            AddressStreetName: stringValue,
            AddressStreetType: stringValue,
            AddressStreetSuffix: stringValue,
            AddressSuburb: stringValue,
            AddressState: stringValue,
            AddressPostcode: stringValue,
            AddressIsConfidential: booleanValue,
            servicesInSite: [],
        }


        const organisationData = {
            id: index, // note we add the index as id
            Name: stringValue,
            Description: stringValue,
            CreationTime: dateValue,
            LastModified: dateValue,
            LastUpdated: dateValue,
            Website: stringValue,
            ABN: stringValue,
            ProviderType: stringValue,
            AlsoKnownAs: stringValue,
            EmailAddress: stringValue,
            EmailIsConfidential: booleanValue,
            PostalAddress: stringValue,
            PostalAddressState: stringValue,
            PostalAddressSuburb: stringValue,
            PostalAddressPostcode: stringValue,
            PostalAddressIsConfidential: booleanValue,
            PhoneNumber: stringValue,
            PhoneKind: stringValue,
            PhoneIsConfidential: booleanValue,
            CEO: stringValue,
            sitesInOrganisation: [siteData],
        }

        Organisation.create(organisationData)
            .then(() => {
                console.log(`organisation ${index} seeded`);
            });
    }

});
mongoose.connection.on('error', () => {
    console.log('failed to connect to mongod');
});
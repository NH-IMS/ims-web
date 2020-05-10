const fetch = require('node-fetch');
const config = require('../config/config.js');
const _ = require('lodash');

const productApiConfig = {
    getAllReligionsEndPoint: config.endpoints.allReligions,
    getAllCategoriesEndPoint: config.endpoints.allCategories,
};

const ManageAdmissionController = {
    async fetchReligions() {
        const url = `${productApiConfig.getAllReligionsEndPoint}`;
        const OPTIONS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let finalReligionsResult = 'error';

        async function getDummyReligions() {
            return [
                {
                    "id": 1,
                    "categoryName": "Hindu"
                },
                {
                    "id": 2,
                    "categoryName": "Muslim"
                },
                {
                    "id": 3,
                    "categoryName": "Sikh"
                },
                {
                    "id": 4,
                    "categoryName": "Cristian"
                },
                {
                    "id": 999,
                    "categoryName": "Others"
                }
            ]
        }

        try {
            // const allReligionsResult = await fetch(url, OPTIONS);
            const allReligionsResult = await getDummyReligions();
            finalReligionsResult = await allReligionsResult.json();
            let allReligions = [];

            for (let tempReligion of finalReligionsResult) {
                let religion = {};
                religion.id = tempReligion.id;
                religion.religionName = tempReligion.religionName;
                allReligions.push(religion);
            }
            return allReligions;
        } catch (error) {
            console.log('error in fetching all Religions: ' + error);
        }
        return '[]';
    },

    async fetchAllCategories() {
        const url = `${productApiConfig.getAllCategoriesEndPoint}`;
        const OPTIONS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let finalAllCategoriesResult = 'error';

        async function getDummyCat() {
            return [
                {
                    "id": 1,
                    "categoryName": "General"
                },
                {
                    "id": 2,
                    "categoryName": "BC-A"
                },
                {
                    "id": 3,
                    "categoryName": "BC-B"
                },
                {
                    "id": 4,
                    "categoryName": "SC"
                },
                {
                    "id": 5,
                    "categoryName": "ST"
                },
                {
                    "id": 999,
                    "categoryName": "Others"
                }
            ]
        }

        try {
            // const allCategoriesResult = await fetch(url, OPTIONS);
            const allCategoriesResult = await getDummyCat();
            finalAllCategoriesResult = await allCategoriesResult.json();
            let allCategories = [];

            for (let tempCategory of finalAllCategoriesResult) {
                let category = {};
                category.id = tempCategory.id;
                category.categoryName = tempCategory.categoryName;
                allCategories.push(category);
            }
            return allCategories;
        } catch (error) {
            console.log('error in fetching all Religions: ' + error);
        }
        return '[]';
    },

};

module.exports = ManageAdmissionController;

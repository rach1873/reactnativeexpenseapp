import axios from "axios";
import { useContext } from "react";
import { ZipContext } from '../App';

const { zipCode, setZipCode } = useContext(ZipContext);

const options = {
    method: 'GET',
    url: 'https://retrieveustaxrate.p.rapidapi.com/GetTaxRateByZip',
    params: { zip: zipCode },
    headers: {
        Authorization: 'Basic Ym9sZGNoYXQ6TGZYfm0zY2d1QzkuKz9SLw==',
        'X-RapidAPI-Key': 'fc253d3d50msh904d92d7fca9a2cp10a84cjsnf485d1c60b91',
        'X-RapidAPI-Host': 'retrieveustaxrate.p.rapidapi.com'
    }
};

export const getZipCode = async () => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
};
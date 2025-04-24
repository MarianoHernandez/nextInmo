import { BASE_URL } from "@/constants/constants";
import { Home } from "@/types/home";
import { Property } from "@/types/property";
import axios from 'axios';

export async function GetPropertyById(id: number): Promise<any> {
    const url = `${BASE_URL}/properties/findOne`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': '*/*',
            },
            params: {
                id
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
}

export async function GetAllProperties(): Promise<Property[]> {
    const url = `${BASE_URL}/properties/findAll`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': '*/*',
            },
        });
        const properties = response.data;
        localStorage.setItem('AllProperties', JSON.stringify(properties))
        return properties;
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
}

export async function GetHomeProperties(): Promise<Home> {
    const url = `${BASE_URL}/properties/home`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': '*/*',
            },
        });
        const home = response.data;
        localStorage.setItem('Home', JSON.stringify(home))
        return home;
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
}
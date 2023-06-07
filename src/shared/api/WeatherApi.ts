import axios from "axios"


export interface IWeatherApi {
    main: {
        temp: number
    }
    weather: [{
        main: string
        description: string
        icon: string
    }]
}

export const WeaterApi = async () => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=arzamas&appid=70e1ed322b02acbc57d443dd91065f3e')
    return response.data
}
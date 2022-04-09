import requests


api = "http://api.weatherapi.com/v1/current.json?key=17cf5aec904548008a3101835222402&q=London&aqi=no"

api_data = requests.get(api)

a = api_data.json()

print(a["location"]["name"])

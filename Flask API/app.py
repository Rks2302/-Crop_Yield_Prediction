from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib
import pickle
import requests
import json

app = Flask(__name__)
CORS(app)
df = pd.read_csv("final_dataset.csv")
df = df.dropna()
seasons = df.Season.unique()
rain = pd.read_csv("2021_Rainfall.csv")

@app.route('/analysis', methods=['POST', 'GET'])
def getAnalysis():
    preds = []
    df2 = df[df["District_Name"] == "PUNE"][df["Crop"] == "Maize"][df["Season"] == "Kharif"]
    preds.append(df2["Area"].tolist())
    preds.append(df2["Production"].tolist())
    return {"prediction": preds}

@app.route('/cropwise', methods=['POST', 'GET'])
def getCropWise():
    data = json.loads(request.get_data())
    print(data)
    area_input = data['area_input']
    season_input = data['season_input']
    district_input = data['district_input']
    state = list(df[df["District_Name"] == district_input.upper()]["State_Name"][:1])[0]
    rainfall_input = rain[rain["District_Name"] == district_input.upper()].values.tolist()[0][1]

    api = "http://api.weatherapi.com/v1/forecast.json?key=17cf5aec904548008a3101835222402&q=" + district_input + "&days=1&aqi=no&alerts=no"
    api_data = requests.get(api).json()

    temp_input = api_data["forecast"]["forecastday"][0]["day"]["avgtemp_c"]
    with open('/' + state + '.ob', 'rb') as fp:
        c_n = pickle.load(fp)
    df1 = df[df["District_Name"] == district_input.upper()]
    df1 = df1[df1["Season"] == season_input]
    crops = df1.Crop.unique()
    preds = []
    for crop_input in crops:
        temp = df[(df["Season"] == season_input.title())][df["District_Name"] == district_input.upper()]
        if crop_input in temp.Crop.unique():
            res = []
            for i in c_n:
                temp = i.split("_")
                if (len(temp) == 1):
                    if (i == "Area"):
                        res.append([area_input])
                    elif (i == "AnnualRainfall"):
                        res.append([rainfall_input])
                    elif (i == "AvgTemp"):
                        res.append([temp_input])
                elif (len(temp) == 2):
                    if (temp[0] == "Season"):
                        if (temp[1] == season_input.title()):
                            res.append([1])
                        else:
                            res.append([0])
                    elif (temp[0] == "Crop"):
                        t_crop = crop_input.replace(" ", "")
                        t_crop = t_crop.upper()
                        m = temp[1].replace(" ", "")
                        m = m.upper()
                        if (t_crop == m):
                            res.append([1])
                        else:
                            res.append([0])
                else:
                    if (temp[2] == district_input.upper()):
                        res.append([1])
                    else:
                        res.append([0])

            inp_df = pd.DataFrame(list(zip(*res)), columns=c_n)

            loaded_model = joblib.load('D:/Bhavesh/Projects/BE/Flask API/Models/' + state + '.sav')
            preds.append({crop_input: loaded_model.predict(inp_df)[0]})
    print(preds)
    return {"prediction": preds}


@app.route('/seasonwise', methods=['POST', 'GET'])
def getYield():
    data = json.loads(request.get_data())
    print(data)
    crop_input = data['crop_input']
    area_input = data['area_input']
    district_input = data['district_input']
    state = list(df[df["District_Name"] == district_input.upper()]["State_Name"][:1])[0]
    rainfall_input = rain[rain["District_Name"] == district_input.upper()].values.tolist()[0][1]

    api = "http://api.weatherapi.com/v1/forecast.json?key=17cf5aec904548008a3101835222402&q=" + district_input + "&days=1&aqi=no&alerts=no"
    api_data = requests.get(api).json()

    temp_input = api_data["forecast"]["forecastday"][0]["day"]["avgtemp_c"]

    with open('/' + state + '.ob', 'rb') as fp:
        c_n = pickle.load(fp)
    preds = []
    for season_input in seasons:
        temp = df[(df["Season"] == season_input.title())][df["District_Name"] == district_input.upper()]
        if crop_input in temp.Crop.unique():
            res = []
            for i in c_n:
                temp = i.split("_")
                if (len(temp) == 1):
                    if (i == "Area"):
                        res.append([area_input])
                    elif (i == "AnnualRainfall"):
                        res.append([rainfall_input])
                    elif (i == "AvgTemp"):
                        res.append([temp_input])
                elif (len(temp) == 2):
                    if (temp[0] == "Season"):
                        if (temp[1] == season_input.title()):
                            res.append([1])
                        else:
                            res.append([0])
                    elif (temp[0] == "Crop"):
                        t_crop = crop_input.replace(" ", "")
                        t_crop = t_crop.upper()
                        m = temp[1].replace(" ", "")
                        m = m.upper()
                        if (t_crop == m):
                            res.append([1])
                        else:
                            res.append([0])
                else:
                    if (temp[2] == district_input.upper()):
                        res.append([1])
                    else:
                        res.append([0])

            inp_df = pd.DataFrame(list(zip(*res)), columns=c_n)

            loaded_model = joblib.load('D:/Bhavesh/Projects/BE/Flask API/Models/' + state + '.sav')
            preds.append({season_input: loaded_model.predict(inp_df)[0]})

    print(preds)
    return {"prediction": preds}


if __name__ == '__main__':
    app.run(debug=True)
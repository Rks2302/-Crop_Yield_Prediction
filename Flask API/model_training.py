import pandas as pd
import seaborn
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import  train_test_split
import matplotlib.pyplot as plt
import seaborn as sb
import joblib
import pickle
import requests


df = pd.read_csv("final_dataset.csv")
df = df.dropna()
states = ['ANDAMAN AND NICOBAR ISLANDS', 'ANDHRA PRADESH',
       'ARUNACHAL PRADESH', 'ASSAM', 'BIHAR', 'CHANDIGARH',
       'CHHATTISGARH', 'GOA', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH',
       'JAMMU AND KASHMIR', 'JHARKHAND', 'KARNATAKA', 'KERALA',
       'MADHYA PRADESH', 'MAHARASHTRA', 'MANIPUR', 'MEGHALAYA', 'MIZORAM',
       'NAGALAND', 'ODISHA', 'PUDUCHERRY', 'PUNJAB', 'RAJASTHAN',
       'UTTAR PRADESH', 'SIKKIM', 'TAMIL NADU', 'TRIPURA', 'UTTARAKHAND',
       'WEST BENGAL']

for state in states:

    data_cu = df[df["State_Name"] == state]

    data1 = data_cu.drop(["State_Name", "Year", "Production"], axis=1)
    data_dum = pd.get_dummies(data1)


    X = data_dum.drop("Yield", axis=1)
    Y = data_dum["Yield"]

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)

    model = RandomForestRegressor()
    model.fit(X_train, y_train)

    filename = '' + state + '.sav'
    joblib.dump(model, filename)
    c_n = list(data_dum.columns)
    del c_n[1]

    with open('/' + state + '.ob', 'wb') as fp:
        pickle.dump(c_n, fp)






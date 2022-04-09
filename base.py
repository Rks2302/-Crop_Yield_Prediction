import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import  train_test_split
import matplotlib.pyplot as plt

df = pd.read_csv("Only_Crops.csv")

df = df.dropna()

dis = input("Enter the District Name: ")
state = list(df[df["District_Name"] == dis.upper()]["State_Name"][:1])[0]
# season = input("Enter the Season: ")

data_cu = df[df["State_Name"] == state]
# data_cu = data_cu[data_cu["Season"] == season.title()]

data1 = data_cu.drop(["State_Name", "Year"], axis=1)
data_dum = pd.get_dummies(data1)

X = data_dum.drop("Production", axis=1)
Y = data_dum["Production"]

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)

model = RandomForestRegressor()
model.fit(X_train,y_train)

predicted = model.predict(X_test)
#
# for x in predicted :
#     print("{:.2f}".format(float(x)))
#
# # print(predicted[0],predicted[1])
# print(y_test)
plt.scatter(X_test["Area"], y_test)
plt.scatter(X_test["Area"], predicted)
plt.show()

print(model.score(X_test, y_test))

# print(data_dum.head())



# print("{:.2f}".format(float("8.99284722486562e-02")))


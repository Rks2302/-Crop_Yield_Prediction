import pandas as pd
import seaborn
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import  train_test_split
import matplotlib.pyplot as plt
import seaborn as sb

df = pd.read_csv("final_dataset.csv")
df = df.dropna()


# C_mat = df.corr()
# fig = plt.figure(figsize=(15,15))
# sb.heatmap(C_mat, vmax = .8, square = True)
# plt.show()
#
dis = input("Enter the District Name: ")
state = list(df[df["District_Name"] == dis.upper()]["State_Name"][:1])[0]
# season = input("Enter the Season: ")

data_cu = df[df["State_Name"] == state]

data1 = data_cu.drop(["State_Name", "Year"], axis=1)
data_dum = pd.get_dummies(data1)

print(data_dum.columns.tolist())

# t = (data_dum[data_dum["Crop_Jowar"] == 1])
# print(t)

X = data_dum.drop("Yield", axis=1)
Y = data_dum["Yield"]

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)

model = RandomForestRegressor()
model.fit(X_train, y_train)

predicted = model.predict(X_test)

print(predicted)
print(y_test)
#
plt.scatter(X_test["Area"], y_test)
plt.scatter(X_test["Area"], predicted)
#
plt.show()

print(model.score(X_test, y_test))


import pandas as pd
import matplotlib.pyplot as plt


df = pd.read_csv("final_dataset.csv")

df = df[df["District_Name"] == "PUNE"][df["Crop"] == "Maize"][df["Season"] == "Kharif"]

# print(df)
figure, axis = plt.subplots(1, 2)



axis[0, 0].scatter(df["Year"], df["Yield"])
# plt.show()
axis[0, 1].scatter(df["Year"], df["AnnualRainfall"])

plt.show()
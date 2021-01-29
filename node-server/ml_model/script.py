import joblib
import sys
import numpy as np

x_test = []
model = joblib.load('ml_model/mlp_model.pkl')

for i in range(1, len(sys.argv)):
    x_test.append(int(sys.argv[i]))

x_test = np.array(x_test).reshape(1, -1)
y_pred = model.predict(x_test)
print(y_pred[0], end="")
sys.stdout.flush()
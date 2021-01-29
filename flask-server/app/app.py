import joblib
import sys
import numpy as np
from flask import Flask, request, json

model = joblib.load('./model/mlp_model.pkl')
fillNaNValues = [7, 2, 3, 3, 2, 4, 4, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 3, 2, 2, 4, 4, 2, 2, 2, 3, 2, 4, 5, 2, 2, 2, 2, 2, 3]
bodyName = ['date', 'plant-stand', 'precip', 'temp', 'hail', 'crop-hist',
  'area-damaged', 'severity', 'seed-tmt', 'germination', 'plant-growth', 'leaves',
  'leafspots-halo', 'leafspots-marg', 'leafspot-size', 'leaf-shread', 'leaf-malf',
  'leaf-mild', 'stem', 'lodging', 'stem-cankers', 'canker-lesion', 'fruiting-bodies',
  'external-decay', 'mycelium', 'int-discolor', 'sclerotina', 'fruit-pods', 'fruit-spots',
  'seed', 'mold-growth', 'seed-discolor', 'seed-size', 'shriveling', 'roots'];

app = Flask(__name__)

@app.route('/', methods=['POST'])
def predict():
    inputData = request.json
    features = []
    for field in bodyName:
        features.append(inputData[field])
    
    for i, v in enumerate(features):
        if v == '?':
            features[i] = fillNaNValues[i]
    features = list(map(int, features))

    final_features = [np.array(features)]
    prediction = model.predict(final_features)
    print(prediction)

    response = app.response_class(
        response=json.dumps({'result': str(prediction[0])}),
        status=200,
        mimetype='application/json'
    )
    return response
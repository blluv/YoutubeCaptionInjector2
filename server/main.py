from flask import Flask, jsonify, abort
from flask_cors import CORS
from os.path import isdir, isfile, join
from os import listdir

app = Flask(__name__)
CORS(app, resources={
     r'*': {'origins': 'https://www.youtube.com', "supports_credentials": True}})

langMap = {
    "ko": "한국어"
}


@app.route("/api/captions/<id>")
def captions(id):
    captions_path = join("server", "captions", id)
    if(isdir(captions_path)):
        return jsonify([*map(lambda wa: {
            "baseUrl": f"http://127.0.0.1:5050/api/caption/{id}/{wa}",
            "name": {
                "simpleText": f"{langMap.get(wa.split('_')[0], wa.split('_')[0])} {''.join(wa.split('_')[1:])}"
            },
            "vssId": "."+wa.split('_')[0],
            "languageCode": wa.split('_')[0],
            "isTranslatable": True
        }, listdir(captions_path))])
    else:
        return jsonify([])


@app.route("/api/caption/<id>/<capId>")
def caption(id, capId):
    capPath = join("server", "captions", id, capId)
    if isfile(capPath):
        return open(capPath, "r").read()
    else:
        abort(404)


app.run(port=5050)

from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/sensor", methods=['POST'])
def respuestaSensor():
    
    n = request.json["Nombre"]
    v = request.json["Valor"]

    print (f"El sensor es {n} y el valor que devuelve es {v}")
    return "ok"
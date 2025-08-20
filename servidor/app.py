import sqlite3
from flask import Flask, request, g, jsonify

app = Flask(__name__)

def dict_factory(cursor, row):
 """Arma un diccionario con los valores de la fila."""
 fields = [column[0] for column in cursor.description]
 return {key: value for key, value in zip(fields, row)}

def abrirConexion():
  if 'db' not in g:
     g.db = sqlite3.connect("valores.sqlite")
     g.db.row_factory = dict_factory
  return g.db

def cerrarConexion(e=None):
   db = g.pop('db', None)
   if db is not None:
       db.close()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/sensor", methods=['POST'])
def respuestaSensor(): 
    nombre = request.json["Nombre"]
    valor = request.json["Valor"]
    db = abrirConexion()
    db.execute("INSERT INTO valores(nombre, valor) VALUES (?, ?)", (nombre, valor))
    db.commit()

    print (f"Nombre del sensor: {nombre}, valor: {valor}")
    cerrarConexion()
    res = {"resultado": "ok"}
    return jsonify(res)
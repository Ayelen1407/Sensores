import sqlite3
from flask import Flask, request, g

app = Flask(__name__)

def dict_factory(cursor, row):
 """Arma un diccionario con los valores de la fila."""
 fields = [column[0] for column in cursor.description]
 return {key: value for key, value in zip(fields, row)}

def abrirConexion():
  if 'db' not in g:
     g.db = sqlite3.connect("api.sqlite")
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
    abrirConexion()
    n = request.json["Nombre"]
    v = request.json["Valor"]

    print (f"Nombre del sensor: {n}, valor: {v}")
    cerrarConexion()
    return "ok"